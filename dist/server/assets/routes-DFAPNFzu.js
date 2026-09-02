import { c as AppShell, r as Panel } from "./primitives-DFOvT6Pn.js";
import { r as PipelineFlow } from "./Pipeline-DL_3P7-a.js";
import { Link } from "@tanstack/react-router";
import { jsx, jsxs } from "react/jsx-runtime";
import { ArrowRight, Bot, Boxes, Database, FileText, Layers, MessageSquare, Sparkles, Wrench } from "lucide-react";
//#region src/routes/index.tsx?tsr-split=component
var RAG_STEPS = [
	{
		label: "Documentos",
		icon: FileText
	},
	{
		label: "Chunks",
		icon: Layers
	},
	{
		label: "Embeddings",
		icon: Sparkles
	},
	{
		label: "Vector Database",
		icon: Database
	},
	{
		label: "Retrieval",
		icon: Boxes
	},
	{
		label: "Reranking",
		icon: Layers
	},
	{
		label: "Contexto",
		icon: MessageSquare
	},
	{
		label: "LLM",
		icon: Bot
	},
	{
		label: "Resposta",
		icon: MessageSquare
	}
];
var AGENT_STEPS = [
	{
		label: "Objetivo",
		icon: Sparkles
	},
	{
		label: "Agente",
		icon: Bot
	},
	{
		label: "Planejamento",
		icon: Layers
	},
	{
		label: "Escolha de tool",
		icon: Wrench
	},
	{
		label: "Execução",
		icon: Boxes
	},
	{
		label: "Observação",
		icon: MessageSquare
	},
	{
		label: "Nova decisão",
		icon: Layers
	},
	{
		label: "Resultado",
		icon: Sparkles
	}
];
function Home() {
	return /* @__PURE__ */ jsxs(AppShell, { children: [
		/* @__PURE__ */ jsxs("section", {
			className: "mb-12",
			children: [
				/* @__PURE__ */ jsx("p", {
					className: "label-mono mb-3",
					children: "laboratório interativo de arquitetura de IA"
				}),
				/* @__PURE__ */ jsxs("h1", {
					className: "max-w-3xl text-3xl leading-tight font-semibold sm:text-5xl",
					children: [
						"Veja a inteligência artificial",
						" ",
						/* @__PURE__ */ jsx("span", {
							className: "text-[var(--rag)]",
							children: "funcionando por dentro"
						}),
						"."
					]
				}),
				/* @__PURE__ */ jsx("p", {
					className: "mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base",
					children: "Altere documentos, chunk size, overlap, Top K, filtros de metadata e perguntas — e observe cada etapa do pipeline mudar em tempo real. Nada aqui é apresentação estática: é simulação executável, rodando localmente no seu navegador."
				}),
				/* @__PURE__ */ jsxs("div", {
					className: "mt-6 flex flex-wrap gap-3",
					children: [/* @__PURE__ */ jsxs(Link, {
						to: "/rag",
						className: "inline-flex items-center gap-2 rounded-md bg-[var(--rag)] px-4 py-2.5 text-sm font-semibold text-[var(--primary-foreground)] transition-opacity hover:opacity-90",
						children: ["Explorar RAG ", /* @__PURE__ */ jsx(ArrowRight, { className: "size-4" })]
					}), /* @__PURE__ */ jsxs(Link, {
						to: "/agents",
						className: "inline-flex items-center gap-2 rounded-md border border-[var(--agent)]/50 px-4 py-2.5 text-sm font-semibold text-[var(--agent)] transition-colors hover:bg-[var(--agent)]/10",
						children: ["Explorar Agentes ", /* @__PURE__ */ jsx(ArrowRight, { className: "size-4" })]
					})]
				})
			]
		}),
		/* @__PURE__ */ jsxs("section", {
			className: "grid gap-5 lg:grid-cols-3",
			children: [
				/* @__PURE__ */ jsxs(Panel, {
					className: "flex flex-col",
					children: [
						/* @__PURE__ */ jsx("p", {
							className: "label-mono mb-1",
							children: "caminho 01"
						}),
						/* @__PURE__ */ jsx("h2", {
							className: "mb-1 text-lg font-semibold",
							children: "Aprender RAG"
						}),
						/* @__PURE__ */ jsx("p", {
							className: "mb-4 text-xs text-muted-foreground",
							children: "Como uma pergunta encontra a resposta certa dentro de 50.000 documentos."
						}),
						/* @__PURE__ */ jsx(PipelineFlow, {
							steps: RAG_STEPS,
							tone: "rag"
						}),
						/* @__PURE__ */ jsxs(Link, {
							to: "/rag",
							className: "mt-5 inline-flex items-center justify-center gap-2 rounded-md border border-[var(--rag)]/50 px-4 py-2 text-sm font-medium text-[var(--rag)] transition-colors hover:bg-[var(--rag)]/10",
							children: ["Explorar RAG ", /* @__PURE__ */ jsx(ArrowRight, { className: "size-4" })]
						})
					]
				}),
				/* @__PURE__ */ jsxs(Panel, {
					className: "flex flex-col",
					children: [
						/* @__PURE__ */ jsx("p", {
							className: "label-mono mb-1",
							children: "caminho 02"
						}),
						/* @__PURE__ */ jsx("h2", {
							className: "mb-1 text-lg font-semibold",
							children: "Aprender Agentes"
						}),
						/* @__PURE__ */ jsx("p", {
							className: "mb-4 text-xs text-muted-foreground",
							children: "Como um sistema persegue um objetivo escolhendo e executando ferramentas."
						}),
						/* @__PURE__ */ jsx(PipelineFlow, {
							steps: AGENT_STEPS,
							tone: "agent"
						}),
						/* @__PURE__ */ jsxs(Link, {
							to: "/agents",
							className: "mt-5 inline-flex items-center justify-center gap-2 rounded-md border border-[var(--agent)]/50 px-4 py-2 text-sm font-medium text-[var(--agent)] transition-colors hover:bg-[var(--agent)]/10",
							children: ["Explorar Agentes ", /* @__PURE__ */ jsx(ArrowRight, { className: "size-4" })]
						})
					]
				}),
				/* @__PURE__ */ jsxs(Panel, {
					className: "flex flex-col",
					children: [
						/* @__PURE__ */ jsx("p", {
							className: "label-mono mb-1",
							children: "caminho 03"
						}),
						/* @__PURE__ */ jsx("h2", {
							className: "mb-1 text-lg font-semibold",
							children: "RAG + Agentes"
						}),
						/* @__PURE__ */ jsxs("p", {
							className: "mb-4 text-xs text-muted-foreground",
							children: [
								"RAG não substitui o agente. RAG pode ser ",
								/* @__PURE__ */ jsx("em", { children: "uma das ferramentas" }),
								" do agente."
							]
						}),
						/* @__PURE__ */ jsxs("div", {
							className: "flex-1 rounded-lg border border-border bg-[oklch(0.14_0.014_264)] p-4",
							children: [
								/* @__PURE__ */ jsxs("div", {
									className: "mb-3 flex items-center gap-2 rounded-md border border-[var(--agent)]/50 bg-[var(--agent)]/10 px-3 py-2",
									children: [/* @__PURE__ */ jsx(Bot, { className: "size-4 text-[var(--agent)]" }), /* @__PURE__ */ jsx("span", {
										className: "font-mono text-xs font-semibold text-[var(--agent)]",
										children: "AGENT"
									})]
								}),
								/* @__PURE__ */ jsxs("ul", {
									className: "space-y-1.5 pl-3 font-mono text-[11px] text-muted-foreground",
									children: [
										/* @__PURE__ */ jsx("li", { children: "├── Calendar Tool" }),
										/* @__PURE__ */ jsx("li", { children: "├── Flight Tool" }),
										/* @__PURE__ */ jsx("li", { children: "├── Hotel Tool" }),
										/* @__PURE__ */ jsx("li", { children: "├── Email Tool" }),
										/* @__PURE__ */ jsx("li", {
											className: "text-[var(--rag)]",
											children: "└── Knowledge Tool"
										})
									]
								}),
								/* @__PURE__ */ jsxs("div", {
									className: "mt-2 ml-8 space-y-1 border-l border-dashed border-[var(--rag)]/50 pl-3 font-mono text-[11px] text-[var(--rag)]",
									children: [
										/* @__PURE__ */ jsx("p", { children: "↓ RAG" }),
										/* @__PURE__ */ jsx("p", { children: "↓ Vector Database" }),
										/* @__PURE__ */ jsx("p", { children: "↓ Company Documents" })
									]
								})
							]
						}),
						/* @__PURE__ */ jsxs(Link, {
							to: "/agents",
							hash: "rag-as-tool",
							className: "mt-5 inline-flex items-center justify-center gap-2 rounded-md border border-border px-4 py-2 text-sm font-medium transition-colors hover:bg-[var(--surface-2)]",
							children: ["Ver a combinação ", /* @__PURE__ */ jsx(ArrowRight, { className: "size-4" })]
						})
					]
				})
			]
		}),
		/* @__PURE__ */ jsx("section", {
			className: "mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4",
			children: [
				{
					to: "/playground",
					title: "Playground livre",
					desc: "Seus documentos, seu pipeline, do zero ao retrieval."
				},
				{
					to: "/architecture",
					title: "Arquitetura real",
					desc: "Como isso seria implementado de verdade em produção."
				},
				{
					to: "/glossary",
					title: "Glossário + Quiz",
					desc: "18 conceitos com exemplos e desafios rápidos."
				},
				{
					to: "/rag",
					title: "Modo 50.000 docs",
					desc: "A redução de 1.000.000 de chunks até 5, visualmente."
				}
			].map((c) => /* @__PURE__ */ jsxs(Link, {
				to: c.to,
				className: "rounded-lg border border-border bg-[var(--surface)]/60 p-4 transition-colors hover:border-[var(--rag)]/40",
				children: [/* @__PURE__ */ jsx("h3", {
					className: "text-sm font-semibold",
					children: c.title
				}), /* @__PURE__ */ jsx("p", {
					className: "mt-1 text-xs text-muted-foreground",
					children: c.desc
				})]
			}, c.title))
		})
	] });
}
//#endregion
export { Home as component };
