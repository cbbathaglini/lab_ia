import { g as simulatedLatency, h as simulateAnswer, l as countTokens, m as search, n as useLab, o as chunkAll, p as rerank } from "./store-oMQJaQSS.js";
import { a as SectionTitle, c as AppShell, o as SimNote, r as Panel, s as Stat } from "./primitives-DFOvT6Pn.js";
import { i as PipelineNode, n as PipelineEdge } from "./Pipeline-DL_3P7-a.js";
import { t as Button } from "./button-Cq5Yh-24.js";
import { t as Switch } from "./switch-Cx31VwYw.js";
import { t as Input } from "./input-D5z8RfPB.js";
import { i as ChunkCard, n as ContextViewer, r as SimilarityResult, t as Textarea } from "./textarea-Dn4UMVsc.js";
import { useMemo, useState } from "react";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
import { Database, Layers, Play, Plus, Search, Sparkles, Trash2 } from "lucide-react";
//#region src/routes/playground.tsx?tsr-split=component
function Playground() {
	const { devMode, setDevMode } = useLab();
	const [docs, setDocs] = useState([
		{
			id: "p1",
			name: "documento-1.txt",
			text: "Nosso time de suporte atende de segunda a sexta, das 9h às 18h, pelo chat interno."
		},
		{
			id: "p2",
			name: "documento-2.txt",
			text: "Chamados críticos possuem SLA de resposta de 2 horas e devem ser abertos com prioridade P1."
		},
		{
			id: "p3",
			name: "documento-3.txt",
			text: "O time de plantão cobre finais de semana apenas para incidentes de produção."
		}
	]);
	const [phase, setPhase] = useState(0);
	const [chunkSize, setChunkSize] = useState(120);
	const [question, setQuestion] = useState("Qual o SLA para chamados críticos?");
	const labDocs = useMemo(() => docs.map((d, i) => ({
		id: d.id,
		name: d.name,
		format: "TXT",
		text: d.text,
		metadata: {
			departamento: "TI",
			ano: 2026,
			tipo: "manual",
			pagina: i + 1
		}
	})), [docs]);
	const chunks = useMemo(() => chunkAll(labDocs, chunkSize, 20), [labDocs, chunkSize]);
	const results = useMemo(() => phase >= 4 ? rerank(question, search(question, chunks, 10), 4) : [], [
		phase,
		question,
		chunks
	]);
	const lat = simulatedLatency(question);
	return /* @__PURE__ */ jsxs(AppShell, { children: [/* @__PURE__ */ jsxs("div", {
		className: "mb-6 flex flex-wrap items-end justify-between gap-4",
		children: [/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("p", {
			className: "label-mono mb-1",
			children: "playground livre"
		}), /* @__PURE__ */ jsx("h1", {
			className: "text-2xl font-semibold sm:text-3xl",
			children: "Seu conteúdo, seu pipeline"
		})] }), /* @__PURE__ */ jsxs("label", {
			className: "flex items-center gap-2 rounded-md border border-border px-3 py-2",
			children: [/* @__PURE__ */ jsx(Switch, {
				checked: devMode,
				onCheckedChange: setDevMode
			}), /* @__PURE__ */ jsx("span", {
				className: "font-mono text-[11px] tracking-wide uppercase",
				children: "Developer mode"
			})]
		})]
	}), /* @__PURE__ */ jsxs("div", {
		className: "grid gap-5 lg:grid-cols-[260px_1fr]",
		children: [/* @__PURE__ */ jsxs(Panel, {
			className: "h-fit lg:sticky lg:top-24",
			children: [
				/* @__PURE__ */ jsx("p", {
					className: "label-mono mb-3",
					children: "pipeline"
				}),
				/* @__PURE__ */ jsx(PipelineNode, {
					label: "Documentos",
					value: `${docs.length} arquivos`,
					icon: Layers,
					done: phase >= 0,
					active: phase === 0
				}),
				/* @__PURE__ */ jsx(PipelineEdge, { active: phase >= 1 }),
				/* @__PURE__ */ jsx(PipelineNode, {
					label: "Chunks",
					value: phase >= 1 ? `${chunks.length} chunks` : "—",
					icon: Layers,
					done: phase >= 1,
					active: phase === 1
				}),
				/* @__PURE__ */ jsx(PipelineEdge, { active: phase >= 2 }),
				/* @__PURE__ */ jsx(PipelineNode, {
					label: "Embeddings",
					value: phase >= 2 ? `${chunks.length} vetores` : "—",
					icon: Sparkles,
					done: phase >= 2,
					active: phase === 2
				}),
				/* @__PURE__ */ jsx(PipelineEdge, { active: phase >= 3 }),
				/* @__PURE__ */ jsx(PipelineNode, {
					label: "Index",
					value: phase >= 3 ? "in-memory VDB" : "—",
					icon: Database,
					done: phase >= 3,
					active: phase === 3
				}),
				/* @__PURE__ */ jsx(PipelineEdge, { active: phase >= 4 }),
				/* @__PURE__ */ jsx(PipelineNode, {
					label: "Query",
					value: phase >= 4 ? `${results.length} resultados` : "—",
					icon: Search,
					done: phase >= 4,
					active: phase === 4
				})
			]
		}), /* @__PURE__ */ jsxs("div", {
			className: "space-y-5",
			children: [
				/* @__PURE__ */ jsxs(Panel, { children: [
					/* @__PURE__ */ jsx(SectionTitle, {
						kicker: "passo 1",
						title: "Documentos",
						right: /* @__PURE__ */ jsxs(Button, {
							variant: "outline",
							size: "sm",
							onClick: () => setDocs([...docs, {
								id: `p${Date.now()}`,
								name: `documento-${docs.length + 1}.txt`,
								text: ""
							}]),
							children: [/* @__PURE__ */ jsx(Plus, { className: "size-3.5" }), " Novo documento"]
						})
					}),
					/* @__PURE__ */ jsx("div", {
						className: "space-y-3",
						children: docs.map((d) => /* @__PURE__ */ jsxs("div", {
							className: "rounded-md border border-border bg-[var(--surface)]/60 p-3",
							children: [/* @__PURE__ */ jsxs("div", {
								className: "mb-2 flex items-center gap-2",
								children: [
									/* @__PURE__ */ jsx(Input, {
										value: d.name,
										onChange: (e) => setDocs(docs.map((x) => x.id === d.id ? {
											...x,
											name: e.target.value
										} : x)),
										className: "h-8 max-w-[240px] font-mono text-xs"
									}),
									/* @__PURE__ */ jsxs("span", {
										className: "font-mono text-[10px] text-muted-foreground",
										children: [countTokens(d.text), " tokens"]
									}),
									/* @__PURE__ */ jsx(Button, {
										variant: "ghost",
										size: "icon",
										className: "ml-auto size-8",
										onClick: () => setDocs(docs.filter((x) => x.id !== d.id)),
										"aria-label": "Excluir documento",
										children: /* @__PURE__ */ jsx(Trash2, { className: "size-3.5" })
									})
								]
							}), /* @__PURE__ */ jsx(Textarea, {
								value: d.text,
								onChange: (e) => setDocs(docs.map((x) => x.id === d.id ? {
									...x,
									text: e.target.value
								} : x)),
								className: "min-h-20 text-[13px]"
							})]
						}, d.id))
					}),
					/* @__PURE__ */ jsxs("div", {
						className: "mt-4 flex flex-wrap items-center gap-3",
						children: [
							/* @__PURE__ */ jsx("span", {
								className: "label-mono",
								children: "chunk size"
							}),
							[
								80,
								120,
								200,
								400
							].map((v) => /* @__PURE__ */ jsx("button", {
								onClick: () => setChunkSize(v),
								className: "rounded-md border px-2.5 py-1 font-mono text-xs transition-colors " + (chunkSize === v ? "border-[var(--rag)] bg-[var(--rag)]/12 text-[var(--rag)]" : "border-border text-muted-foreground"),
								children: v
							}, v)),
							/* @__PURE__ */ jsxs(Button, {
								className: "ml-auto",
								onClick: () => setPhase(1),
								children: [/* @__PURE__ */ jsx(Play, { className: "size-4" }), " Gerar chunks"]
							})
						]
					})
				] }),
				phase >= 1 ? /* @__PURE__ */ jsxs(Panel, { children: [/* @__PURE__ */ jsx(SectionTitle, {
					kicker: "passo 2",
					title: `${chunks.length} chunks gerados`,
					right: /* @__PURE__ */ jsxs(Button, {
						onClick: () => setPhase(2),
						disabled: phase >= 2,
						variant: "outline",
						children: [/* @__PURE__ */ jsx(Sparkles, { className: "size-4" }), " Gerar embeddings simulados"]
					})
				}), /* @__PURE__ */ jsx("div", {
					className: "grid gap-3 lg:grid-cols-2",
					children: chunks.map((c, i) => /* @__PURE__ */ jsx(ChunkCard, {
						chunk: c,
						index: i,
						dev: devMode
					}, c.id))
				})] }) : null,
				phase >= 2 ? /* @__PURE__ */ jsxs(Panel, { children: [
					/* @__PURE__ */ jsx(SectionTitle, {
						kicker: "passo 3",
						title: "Embeddings e indexação",
						right: /* @__PURE__ */ jsxs(Button, {
							onClick: () => setPhase(3),
							disabled: phase >= 3,
							variant: "outline",
							children: [/* @__PURE__ */ jsx(Database, { className: "size-4" }), " Indexar"]
						})
					}),
					/* @__PURE__ */ jsxs("div", {
						className: "grid gap-3 sm:grid-cols-3",
						children: [
							/* @__PURE__ */ jsx(Stat, {
								label: "Vetores",
								value: chunks.length,
								tone: "rag"
							}),
							/* @__PURE__ */ jsx(Stat, {
								label: "Dimensões",
								value: "1536"
							}),
							/* @__PURE__ */ jsx(Stat, {
								label: "Métrica",
								value: "cosine"
							})
						]
					}),
					/* @__PURE__ */ jsx(SimNote, { children: "Embeddings gerados por função local determinística." })
				] }) : null,
				phase >= 3 ? /* @__PURE__ */ jsxs(Panel, { children: [/* @__PURE__ */ jsx(SectionTitle, {
					kicker: "passo 4",
					title: "Pergunte à sua base"
				}), /* @__PURE__ */ jsxs("div", {
					className: "flex flex-col gap-3 sm:flex-row",
					children: [/* @__PURE__ */ jsx(Textarea, {
						value: question,
						onChange: (e) => setQuestion(e.target.value),
						className: "min-h-16 flex-1"
					}), /* @__PURE__ */ jsxs(Button, {
						onClick: () => setPhase(4),
						className: "sm:self-stretch",
						children: [/* @__PURE__ */ jsx(Search, { className: "size-4" }), " Executar busca"]
					})]
				})] }) : null,
				phase >= 4 && results.length ? /* @__PURE__ */ jsxs(Fragment, { children: [
					/* @__PURE__ */ jsxs(Panel, { children: [/* @__PURE__ */ jsx("p", {
						className: "label-mono mb-3",
						children: "chunks recuperados e reordenados"
					}), /* @__PURE__ */ jsx("div", {
						className: "grid gap-3 lg:grid-cols-2",
						children: results.map((r, i) => /* @__PURE__ */ jsx(SimilarityResult, {
							chunk: r,
							rank: i + 1,
							dev: devMode,
							showRerank: true
						}, r.id))
					})] }),
					/* @__PURE__ */ jsxs(Panel, { children: [/* @__PURE__ */ jsx("p", {
						className: "label-mono mb-3",
						children: "contexto enviado ao llm"
					}), /* @__PURE__ */ jsx(ContextViewer, {
						question,
						chunks: results
					})] }),
					/* @__PURE__ */ jsxs(Panel, {
						className: "border-[var(--signal)]/40",
						children: [
							/* @__PURE__ */ jsx("p", {
								className: "label-mono mb-2",
								children: "resposta simulada"
							}),
							/* @__PURE__ */ jsx("p", {
								className: "text-sm leading-relaxed whitespace-pre-line",
								children: simulateAnswer(question, results)
							}),
							devMode ? /* @__PURE__ */ jsxs("div", {
								className: "mt-4 grid gap-3 sm:grid-cols-4",
								children: [
									/* @__PURE__ */ jsx(Stat, {
										label: "Retrieval",
										value: `${lat.retrieval} ms`
									}),
									/* @__PURE__ */ jsx(Stat, {
										label: "Reranking",
										value: `${lat.reranking} ms`
									}),
									/* @__PURE__ */ jsx(Stat, {
										label: "LLM",
										value: `${(lat.llm / 1e3).toFixed(2)} s`
									}),
									/* @__PURE__ */ jsx(Stat, {
										label: "Total",
										value: `${(lat.total / 1e3).toFixed(2)} s`,
										tone: "signal"
									})
								]
							}) : null,
							/* @__PURE__ */ jsx(SimNote, { children: "A resposta é extrativa, montada a partir dos chunks recuperados. Nenhum modelo é chamado." })
						]
					})
				] }) : null
			]
		})]
	})] });
}
//#endregion
export { Playground as component };
