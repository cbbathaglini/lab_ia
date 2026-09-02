import { s as SEED_DOCS } from "./data-CeF3osJN.js";
import { createContext, useContext, useMemo, useState } from "react";
import { jsx } from "react/jsx-runtime";
//#region src/lib/lab/engine.ts
var CONTEXT_WINDOW = 128e3;
/** Rough token approximation: ~1 token every 4 characters (pt-BR heuristic). */
function countTokens(text) {
	return Math.max(1, Math.ceil(text.trim().length / 4));
}
function countWords(text) {
	return text.trim().split(/\s+/).filter(Boolean).length;
}
function hash(str, seed = 0) {
	let h = 2166136261 ^ seed;
	for (let i = 0; i < str.length; i++) {
		h ^= str.charCodeAt(i);
		h = Math.imul(h, 16777619);
	}
	return (h >>> 0) / 4294967295;
}
var STOP = /* @__PURE__ */ new Set([
	"a",
	"o",
	"as",
	"os",
	"de",
	"da",
	"do",
	"das",
	"dos",
	"em",
	"no",
	"na",
	"um",
	"uma",
	"para",
	"por",
	"com",
	"que",
	"e",
	"ou",
	"se",
	"ao",
	"aos",
	"à",
	"às",
	"the",
	"of",
	"to",
	"é",
	"são",
	"ser",
	"pode",
	"podem"
]);
function tokenizeWords(text) {
	return text.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/home\s*-?\s*office/g, "trabalho_remoto").replace(/trabalho\s+remoto/g, "trabalho_remoto").split(/[^a-z0-9]+/).map((w) => w === "remoto" ? "trabalho_remoto" : w).filter((w) => w.length > 2 && !STOP.has(w));
}
/**
* Simulated embedding: a deterministic bag-of-words projection into a small
* pseudo-vector space. Semantically similar phrases share words / word stems,
* so cosine similarity behaves in an intuitive, teachable way.
*/
function fakeEmbedding(text, dims = 16) {
	const words = tokenizeWords(text);
	const vec = new Array(dims).fill(0);
	for (const w of words) {
		const stem = w.slice(0, 5);
		for (let d = 0; d < dims; d++) vec[d] = (vec[d] ?? 0) + Math.sin(hash(stem, d + 1) * Math.PI * 2) + .15 * Math.cos(hash(w, d + 7));
	}
	const norm = Math.hypot(...vec) || 1;
	return vec.map((v) => Number((v / norm).toFixed(3)));
}
function cosine(a, b) {
	let dot = 0;
	let na = 0;
	let nb = 0;
	for (let i = 0; i < Math.min(a.length, b.length); i++) {
		const av = a[i] ?? 0;
		const bv = b[i] ?? 0;
		dot += av * bv;
		na += av * av;
		nb += bv * bv;
	}
	if (!na || !nb) return 0;
	return dot / (Math.sqrt(na) * Math.sqrt(nb));
}
/** Lexical overlap boost so the demo ranks obviously-related chunks first. */
function lexicalScore(query, text) {
	const q = new Set(tokenizeWords(query));
	const t = tokenizeWords(text);
	if (!q.size || !t.length) return 0;
	let hits = 0;
	for (const w of new Set(t)) for (const qw of q) if (w.startsWith(qw.slice(0, 4)) || qw.startsWith(w.slice(0, 4))) {
		hits++;
		break;
	}
	return hits / q.size;
}
function similarity(query, chunk) {
	const cos = cosine(fakeEmbedding(query), chunk.embedding);
	const lex = lexicalScore(query, chunk.text);
	const raw = .35 * ((cos + 1) / 2) + .65 * lex;
	return Number(Math.min(.99, .18 + raw * .85).toFixed(3));
}
/** Token-aware chunking with overlap. */
function chunkDocument(doc, chunkSize, overlap) {
	const words = doc.text.split(/\s+/).filter(Boolean);
	const tokensPerWord = 1.6;
	const wordsPerChunk = Math.max(4, Math.round(chunkSize / tokensPerWord));
	const wordsOverlap = Math.min(wordsPerChunk - 1, Math.max(0, Math.round(overlap / tokensPerWord)));
	const step = Math.max(1, wordsPerChunk - wordsOverlap);
	const chunks = [];
	for (let start = 0, i = 0; start < words.length; start += step, i++) {
		const slice = words.slice(start, start + wordsPerChunk);
		if (!slice.length) break;
		const text = slice.join(" ");
		chunks.push({
			id: `${doc.id}#c${String(i + 1).padStart(3, "0")}`,
			docId: doc.id,
			docName: doc.name,
			index: i,
			text,
			tokens: countTokens(text),
			overlapTokens: start === 0 ? 0 : overlap,
			metadata: {
				...doc.metadata,
				pagina: doc.metadata.pagina + i
			},
			embedding: fakeEmbedding(text)
		});
		if (start + wordsPerChunk >= words.length) break;
	}
	return chunks;
}
function chunkAll(docs, chunkSize, overlap) {
	return docs.flatMap((d) => chunkDocument(d, chunkSize, overlap));
}
function search(query, chunks, topK) {
	return chunks.map((c) => ({
		...c,
		score: similarity(query, c)
	})).sort((a, b) => b.score - a.score).slice(0, topK).map((c, i) => ({
		...c,
		previousRank: i + 1
	}));
}
/**
* Simulated cross-encoder reranker: re-scores candidates using a
* question-aware signal (word coverage + position penalty) instead of
* pure vector distance, so the ordering visibly changes.
*/
function rerank(query, candidates, topN) {
	return candidates.map((c) => {
		const lex = lexicalScore(query, c.text);
		const numeric = /\d/.test(c.text) && /\d|quant|dias|prazo|limite/i.test(query) ? .08 : 0;
		const lengthPenalty = c.tokens > 260 ? .05 : 0;
		const rerankScore = Number(Math.min(.99, .25 + lex * .7 + numeric + c.score * .15 - lengthPenalty).toFixed(3));
		return {
			...c,
			rerankScore
		};
	}).sort((a, b) => (b.rerankScore ?? 0) - (a.rerankScore ?? 0)).slice(0, topN);
}
function buildContext(question, chunks) {
	return {
		system: "Você é um assistente corporativo. Use SOMENTE as informações disponíveis no CONTEXT. Se a resposta não estiver no contexto, diga que não encontrou a informação. Cite o documento de origem.",
		context: chunks.map((c) => `[Documento: ${c.docName} | página ${c.metadata.pagina} | ${c.metadata.departamento}]\n${c.text}`).join("\n\n"),
		question
	};
}
/** Simulated answer: extractive, built from the retrieved chunks. Not a real LLM. */
function simulateAnswer(question, chunks) {
	if (!chunks.length) return "Não encontrei informação suficiente nos documentos fornecidos para responder a essa pergunta.";
	const top = chunks[0];
	const sentence = top.text.split(/(?<=\.)\s/).find((s) => lexicalScore(question, s) > 0) ?? top.text;
	const sources = [...new Set(chunks.map((c) => c.docName))].join(", ");
	return `Segundo os documentos recuperados: ${sentence.trim()}\n\nFontes: ${sources}.`;
}
function simulatedLatency(seed) {
	const r = (k, min, max) => Math.round(min + hash(seed + k) * (max - min));
	const embedding = r("emb", 8, 24);
	const retrieval = r("ret", 22, 68);
	const reranking = r("rr", 55, 140);
	const llm = r("llm", 900, 2100);
	return {
		embedding,
		retrieval,
		reranking,
		llm,
		total: embedding + retrieval + reranking + llm
	};
}
var SCALE = {
	documents: 5e4,
	pagesPerDoc: 10,
	chunksPerDoc: 20,
	get chunks() {
		return this.documents * this.chunksPerDoc;
	}
};
function formatNumber(n) {
	return n.toLocaleString("pt-BR");
}
//#endregion
//#region src/lib/lab/store.tsx
var LabContext = createContext(null);
var DEFAULT_QUESTION = "Quantos dias de férias um funcionário possui?";
function LabProvider({ children }) {
	const [docs, setDocs] = useState(SEED_DOCS);
	const [chunkSize, setChunkSize] = useState(300);
	const [overlap, setOverlap] = useState(50);
	const [question, setQuestion] = useState(DEFAULT_QUESTION);
	const [topK, setTopK] = useState(5);
	const [filters, setFilters] = useState({
		departamento: "todos",
		ano: "todos",
		tipo: "todos"
	});
	const [devMode, setDevMode] = useState(false);
	const [scaleMode, setScaleMode] = useState(false);
	const chunks = useMemo(() => chunkAll(docs, chunkSize, overlap), [
		docs,
		chunkSize,
		overlap
	]);
	const value = {
		docs,
		setDocs,
		resetDocs: () => setDocs(SEED_DOCS),
		chunkSize,
		setChunkSize,
		overlap,
		setOverlap,
		question,
		setQuestion,
		topK,
		setTopK,
		filters,
		setFilters,
		devMode,
		setDevMode,
		scaleMode,
		setScaleMode,
		chunks,
		filteredChunks: useMemo(() => chunks.filter((c) => (filters.departamento === "todos" || c.metadata.departamento === filters.departamento) && (filters.ano === "todos" || String(c.metadata.ano) === filters.ano) && (filters.tipo === "todos" || c.metadata.tipo === filters.tipo)), [chunks, filters])
	};
	return /* @__PURE__ */ jsx(LabContext.Provider, {
		value,
		children
	});
}
function useLab() {
	const ctx = useContext(LabContext);
	if (!ctx) throw new Error("useLab must be used inside <LabProvider>");
	return ctx;
}
//#endregion
export { buildContext as a, cosine as c, fakeEmbedding as d, formatNumber as f, simulatedLatency as g, simulateAnswer as h, SCALE as i, countTokens as l, search as m, useLab as n, chunkAll as o, rerank as p, CONTEXT_WINDOW as r, chunkDocument as s, LabProvider as t, countWords as u };
