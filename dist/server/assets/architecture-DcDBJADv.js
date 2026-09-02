import { a as PARSERS, c as VECTOR_DBS } from "./data-CeF3osJN.js";
import { a as SectionTitle, c as AppShell, o as SimNote, r as Panel } from "./primitives-DFOvT6Pn.js";
import { i as PipelineNode, n as PipelineEdge } from "./Pipeline-DL_3P7-a.js";
import { a as TableHeader, i as TableHead, n as TableBody, o as TableRow, r as TableCell, t as Table } from "./table-POL7QzXM.js";
import { jsx, jsxs } from "react/jsx-runtime";
import { Bot, Boxes, Cloud, Database, FileText, Layers, MessagesSquare, Search, Server, Sparkles } from "lucide-react";
//#region src/routes/architecture.tsx?tsr-split=component
var STACK = [
	{
		layer: "Ingestão",
		tools: "Airflow, cron jobs, webhooks, filas",
		role: "Traz documentos novos e atualizados para o pipeline"
	},
	{
		layer: "Parsing",
		tools: "Docling, Unstructured, LlamaIndex, PyMuPDF",
		role: "Converte PDF/DOCX/HTML em texto limpo e estruturado"
	},
	{
		layer: "Chunking",
		tools: "LangChain splitters, LlamaIndex node parsers",
		role: "Divide o texto em blocos com tamanho e overlap controlados"
	},
	{
		layer: "Embeddings",
		tools: "Modelos de embedding hospedados ou locais",
		role: "Transforma cada chunk em um vetor numérico"
	},
	{
		layer: "Vector DB",
		tools: "Qdrant, pgvector, Weaviate, Milvus, Chroma",
		role: "Armazena vetores + metadata e responde buscas por similaridade"
	},
	{
		layer: "Retrieval",
		tools: "Busca vetorial, híbrida (BM25 + vetores), filtros",
		role: "Seleciona os candidatos mais relevantes para a pergunta"
	},
	{
		layer: "Reranking",
		tools: "Cross-encoders e rerankers dedicados",
		role: "Reordena os candidatos com um julgamento mais caro e preciso"
	},
	{
		layer: "Orquestração",
		tools: "LangGraph, LlamaIndex, AI SDK, código próprio",
		role: "Monta o prompt, chama o modelo e coordena o loop de tools"
	},
	{
		layer: "Observabilidade",
		tools: "Traces, logs de tool call, avaliação offline",
		role: "Mede qualidade de retrieval, custo, latência e falhas"
	}
];
function ArchitecturePage() {
	return /* @__PURE__ */ jsxs(AppShell, { children: [
		/* @__PURE__ */ jsxs("div", {
			className: "mb-6",
			children: [
				/* @__PURE__ */ jsx("p", {
					className: "label-mono mb-1",
					children: "mundo real"
				}),
				/* @__PURE__ */ jsx("h1", {
					className: "text-2xl font-semibold sm:text-3xl",
					children: "Como isso é construído de verdade"
				}),
				/* @__PURE__ */ jsx("p", {
					className: "mt-2 max-w-2xl text-sm text-muted-foreground",
					children: "As simulações do laboratório rodam no navegador. Em produção, cada etapa vira um serviço, um job ou uma biblioteca. Este é o mapa."
				})
			]
		}),
		/* @__PURE__ */ jsxs("div", {
			className: "grid gap-5 lg:grid-cols-2",
			children: [/* @__PURE__ */ jsxs(Panel, {
				className: "border-[var(--rag)]/30",
				children: [
					/* @__PURE__ */ jsx(SectionTitle, {
						kicker: "pipeline offline",
						title: "Indexação (roda em background)"
					}),
					/* @__PURE__ */ jsx(PipelineNode, {
						label: "Fontes",
						value: "Drive, S3, CMS, banco, tickets",
						icon: FileText,
						tone: "rag"
					}),
					/* @__PURE__ */ jsx(PipelineEdge, { active: true }),
					/* @__PURE__ */ jsx(PipelineNode, {
						label: "Parsing",
						value: "PDF/DOCX/HTML → texto",
						icon: Layers,
						tone: "rag"
					}),
					/* @__PURE__ */ jsx(PipelineEdge, { active: true }),
					/* @__PURE__ */ jsx(PipelineNode, {
						label: "Chunking",
						value: "size + overlap",
						icon: Layers,
						tone: "rag"
					}),
					/* @__PURE__ */ jsx(PipelineEdge, { active: true }),
					/* @__PURE__ */ jsx(PipelineNode, {
						label: "Embedding model",
						value: "chunk → vetor",
						icon: Sparkles,
						tone: "rag"
					}),
					/* @__PURE__ */ jsx(PipelineEdge, { active: true }),
					/* @__PURE__ */ jsx(PipelineNode, {
						label: "Vector Database",
						value: "vetor + metadata + texto",
						icon: Database,
						tone: "rag"
					}),
					/* @__PURE__ */ jsx(SimNote, { children: "Esta parte não acontece durante a pergunta do usuário. Ela roda quando documentos são criados ou atualizados." })
				]
			}), /* @__PURE__ */ jsxs(Panel, {
				className: "border-[var(--signal)]/30",
				children: [
					/* @__PURE__ */ jsx(SectionTitle, {
						kicker: "pipeline online",
						title: "Consulta (roda por pergunta)"
					}),
					/* @__PURE__ */ jsx(PipelineNode, {
						label: "Usuário",
						value: "pergunta em linguagem natural",
						icon: MessagesSquare
					}),
					/* @__PURE__ */ jsx(PipelineEdge, { active: true }),
					/* @__PURE__ */ jsx(PipelineNode, {
						label: "API / backend",
						value: "autenticação, filtros por permissão",
						icon: Server
					}),
					/* @__PURE__ */ jsx(PipelineEdge, { active: true }),
					/* @__PURE__ */ jsx(PipelineNode, {
						label: "Embedding da query",
						value: "mesma família de modelo da indexação",
						icon: Sparkles
					}),
					/* @__PURE__ */ jsx(PipelineEdge, { active: true }),
					/* @__PURE__ */ jsx(PipelineNode, {
						label: "Vector search + filtros",
						value: "top-K candidatos",
						icon: Search
					}),
					/* @__PURE__ */ jsx(PipelineEdge, { active: true }),
					/* @__PURE__ */ jsx(PipelineNode, {
						label: "Reranking",
						value: "top-N final",
						icon: Boxes
					}),
					/* @__PURE__ */ jsx(PipelineEdge, { active: true }),
					/* @__PURE__ */ jsx(PipelineNode, {
						label: "LLM",
						value: "prompt + contexto → resposta",
						icon: Cloud
					}),
					/* @__PURE__ */ jsx(SimNote, { children: "Latência e custo da experiência vêm quase todos daqui — por isso o vector search é feito em milissegundos e o reranking só sobre poucos candidatos." })
				]
			})]
		}),
		/* @__PURE__ */ jsxs(Panel, {
			className: "mt-5",
			children: [/* @__PURE__ */ jsx(SectionTitle, {
				kicker: "agentes",
				title: "Arquitetura de um agente em produção",
				description: "O agente é um orquestrador com estado: memória, catálogo de tools, política de parada e logs."
			}), /* @__PURE__ */ jsxs("div", {
				className: "grid gap-4 lg:grid-cols-3",
				children: [
					/* @__PURE__ */ jsxs("div", {
						className: "rounded-lg border border-[var(--agent)]/35 bg-[var(--agent)]/6 p-4",
						children: [
							/* @__PURE__ */ jsx(Bot, { className: "mb-2 size-5 text-[var(--agent)]" }),
							/* @__PURE__ */ jsx("p", {
								className: "text-sm font-medium",
								children: "Núcleo do agente"
							}),
							/* @__PURE__ */ jsxs("ul", {
								className: "mt-2 space-y-1 text-xs text-muted-foreground",
								children: [
									/* @__PURE__ */ jsx("li", { children: "· prompt de sistema e objetivo" }),
									/* @__PURE__ */ jsx("li", { children: "· loop com limite de steps e custo" }),
									/* @__PURE__ */ jsx("li", { children: "· política de aprovação para ações sensíveis" })
								]
							})
						]
					}),
					/* @__PURE__ */ jsxs("div", {
						className: "rounded-lg border border-border p-4",
						children: [
							/* @__PURE__ */ jsx(Boxes, { className: "mb-2 size-5 text-[var(--signal)]" }),
							/* @__PURE__ */ jsx("p", {
								className: "text-sm font-medium",
								children: "Camada de tools"
							}),
							/* @__PURE__ */ jsxs("ul", {
								className: "mt-2 space-y-1 text-xs text-muted-foreground",
								children: [
									/* @__PURE__ */ jsx("li", { children: "· schema de entrada validado" }),
									/* @__PURE__ */ jsx("li", { children: "· APIs internas e externas" }),
									/* @__PURE__ */ jsx("li", { children: "· RAG exposto como uma tool de busca" })
								]
							})
						]
					}),
					/* @__PURE__ */ jsxs("div", {
						className: "rounded-lg border border-border p-4",
						children: [
							/* @__PURE__ */ jsx(Database, { className: "mb-2 size-5 text-[var(--rag)]" }),
							/* @__PURE__ */ jsx("p", {
								className: "text-sm font-medium",
								children: "Memória e estado"
							}),
							/* @__PURE__ */ jsxs("ul", {
								className: "mt-2 space-y-1 text-xs text-muted-foreground",
								children: [
									/* @__PURE__ */ jsx("li", { children: "· histórico da conversa (curto prazo)" }),
									/* @__PURE__ */ jsx("li", { children: "· fatos persistidos do usuário (longo prazo)" }),
									/* @__PURE__ */ jsx("li", { children: "· resultados de tools já executadas" })
								]
							})
						]
					})
				]
			})]
		}),
		/* @__PURE__ */ jsxs(Panel, {
			className: "mt-5",
			children: [/* @__PURE__ */ jsx(SectionTitle, {
				kicker: "stack",
				title: "Camada por camada"
			}), /* @__PURE__ */ jsx("div", {
				className: "overflow-x-auto rounded-lg border border-border",
				children: /* @__PURE__ */ jsxs(Table, { children: [/* @__PURE__ */ jsx(TableHeader, { children: /* @__PURE__ */ jsxs(TableRow, {
					className: "hover:bg-transparent",
					children: [
						/* @__PURE__ */ jsx(TableHead, { children: "Camada" }),
						/* @__PURE__ */ jsx(TableHead, { children: "Ferramentas típicas" }),
						/* @__PURE__ */ jsx(TableHead, { children: "Responsabilidade" })
					]
				}) }), /* @__PURE__ */ jsx(TableBody, { children: STACK.map((s) => /* @__PURE__ */ jsxs(TableRow, { children: [
					/* @__PURE__ */ jsx(TableCell, {
						className: "font-mono text-xs whitespace-nowrap text-[var(--rag)]",
						children: s.layer
					}),
					/* @__PURE__ */ jsx(TableCell, {
						className: "text-xs",
						children: s.tools
					}),
					/* @__PURE__ */ jsx(TableCell, {
						className: "text-xs text-muted-foreground",
						children: s.role
					})
				] }, s.layer)) })] })
			})]
		}),
		/* @__PURE__ */ jsxs("div", {
			className: "mt-5 grid gap-5 lg:grid-cols-2",
			children: [/* @__PURE__ */ jsxs(Panel, { children: [/* @__PURE__ */ jsx(SectionTitle, {
				kicker: "parsing",
				title: "Bibliotecas de parsing"
			}), /* @__PURE__ */ jsx("div", {
				className: "grid gap-3 sm:grid-cols-2",
				children: PARSERS.map((p) => /* @__PURE__ */ jsxs("div", {
					className: "rounded-md border border-border p-3",
					children: [/* @__PURE__ */ jsx("p", {
						className: "font-mono text-sm",
						children: p.name
					}), /* @__PURE__ */ jsx("p", {
						className: "mt-1 text-xs text-muted-foreground",
						children: p.note
					})]
				}, p.name))
			})] }), /* @__PURE__ */ jsxs(Panel, { children: [/* @__PURE__ */ jsx(SectionTitle, {
				kicker: "armazenamento",
				title: "Escolhendo o Vector Database"
			}), /* @__PURE__ */ jsx("div", {
				className: "space-y-3",
				children: VECTOR_DBS.map((db) => /* @__PURE__ */ jsxs("div", {
					className: "rounded-md border border-border p-3",
					children: [
						/* @__PURE__ */ jsxs("div", {
							className: "flex flex-wrap items-baseline gap-2",
							children: [/* @__PURE__ */ jsx("p", {
								className: "font-mono text-sm",
								children: db.name
							}), /* @__PURE__ */ jsx("span", {
								className: "label-mono",
								children: db.tipo
							})]
						}),
						/* @__PURE__ */ jsxs("p", {
							className: "mt-1 text-xs text-muted-foreground",
							children: [
								/* @__PURE__ */ jsx("span", {
									className: "text-[var(--signal)]",
									children: "Forte:"
								}),
								" ",
								db.forte
							]
						}),
						/* @__PURE__ */ jsxs("p", {
							className: "mt-0.5 text-xs text-muted-foreground",
							children: [
								/* @__PURE__ */ jsx("span", {
									className: "text-[var(--warn,var(--chart-5))]",
									children: "Atenção:"
								}),
								" ",
								db.atencao
							]
						})
					]
				}, db.name))
			})] })]
		})
	] });
}
//#endregion
export { ArchitecturePage as component };
