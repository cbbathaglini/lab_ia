import { n as useLab } from "./store-oMQJaQSS.js";
import { a as cn } from "./tooltip-B16Z84u2.js";
import { a as SectionTitle, c as AppShell, n as JsonBlock, o as SimNote, r as Panel, s as Stat } from "./primitives-DFOvT6Pn.js";
import { i as PipelineNode, n as PipelineEdge, r as PipelineFlow } from "./Pipeline-DL_3P7-a.js";
import { t as Button } from "./button-Cq5Yh-24.js";
import { t as Switch } from "./switch-Cx31VwYw.js";
import { a as TableHeader, i as TableHead, n as TableBody, o as TableRow, r as TableCell, t as Table } from "./table-POL7QzXM.js";
import { useState } from "react";
import { jsx, jsxs } from "react/jsx-runtime";
import { BookOpen, Bot, Calendar, CloudSun, Database, Hotel, Mail, Plane, Play, RotateCcw, Search, SkipForward, Target, Wrench } from "lucide-react";
//#region src/lib/lab/agent.ts
var AGENT_TOOLS = [
	{
		id: "calendar",
		name: "checkCalendar",
		label: "CALENDAR",
		description: "Consulta janelas livres na agenda do colaborador",
		kind: "read"
	},
	{
		id: "policy",
		name: "searchCompanyPolicy",
		label: "COMPANY POLICY (RAG)",
		description: "Busca semântica nos documentos internos via Vector DB",
		kind: "knowledge"
	},
	{
		id: "flights",
		name: "searchFlights",
		label: "FLIGHTS",
		description: "Busca voos disponíveis por origem, destino e data",
		kind: "read"
	},
	{
		id: "hotels",
		name: "searchHotels",
		label: "HOTELS",
		description: "Busca hotéis por cidade, período e teto de diária",
		kind: "read"
	},
	{
		id: "weather",
		name: "getWeather",
		label: "WEATHER",
		description: "Previsão do tempo para o período da viagem",
		kind: "read"
	},
	{
		id: "email",
		name: "sendEmail",
		label: "EMAIL",
		description: "Envia o resumo da viagem — ação com efeito no mundo real",
		kind: "action"
	}
];
var AGENT_GOAL = "Organize uma viagem de trabalho para São Paulo.";
var AGENT_STEPS = [
	{
		n: 1,
		plan: "Preciso descobrir quais datas estão livres antes de cotar qualquer coisa.",
		toolId: "calendar",
		call: {
			tool: "checkCalendar",
			arguments: {
				user: "carine",
				range: "2026-09-01..2026-09-30"
			}
		},
		observation: {
			available: [
				"2026-09-15",
				"2026-09-16",
				"2026-09-17"
			],
			conflicts: 0
		},
		decision: "Janela de 15 a 17 de setembro está livre. Seguir com as restrições da empresa.",
		latencyMs: 120
	},
	{
		n: 2,
		plan: "Antes de cotar, preciso saber o que a política de viagens permite.",
		toolId: "policy",
		call: {
			tool: "searchCompanyPolicy",
			arguments: {
				query: "limites de voo e hotel em viagem corporativa",
				top_k: 5
			}
		},
		observation: {
			chunks: 3,
			rules: [
				"voos em classe econômica",
				"hotel até R$ 600/noite em capitais",
				"prestação em 5 dias úteis"
			],
			sources: ["viagens.txt"]
		},
		decision: "Restrições capturadas. Aplicar como filtro nas próximas buscas.",
		latencyMs: 340
	},
	{
		n: 3,
		plan: "Buscar voos POA → SAO respeitando classe econômica.",
		toolId: "flights",
		call: {
			tool: "searchFlights",
			arguments: {
				origin: "POA",
				destination: "SAO",
				date: "2026-09-15",
				cabin: "economy"
			}
		},
		observation: {
			flights: 3,
			cheapest: "R$ 612",
			earliest: "06:20"
		},
		decision: "3 opções válidas. Guardar e cotar hospedagem.",
		latencyMs: 480
	},
	{
		n: 4,
		plan: "Buscar hotéis dentro do teto de R$ 600 por noite.",
		toolId: "hotels",
		call: {
			tool: "searchHotels",
			arguments: {
				city: "São Paulo",
				checkin: "2026-09-15",
				checkout: "2026-09-17",
				maxNightly: 600
			}
		},
		observation: {
			hotels: 5,
			within_policy: 5,
			best_rated: "Hotel Paulista Centro — R$ 540"
		},
		decision: "5 opções dentro da política. Combinar com o voo mais eficiente.",
		latencyMs: 410
	},
	{
		n: 5,
		plan: "Verificar clima para orientar bagagem e deslocamento.",
		toolId: "weather",
		call: {
			tool: "getWeather",
			arguments: {
				city: "São Paulo",
				from: "2026-09-15",
				to: "2026-09-17"
			}
		},
		observation: {
			forecast: "chuva leve",
			temp_c: [16, 23]
		},
		decision: "Clima não invalida o plano. Selecionar a melhor combinação.",
		latencyMs: 90
	},
	{
		n: 6,
		plan: "Consolidar voo + hotel e enviar o resumo para aprovação.",
		toolId: "email",
		call: {
			tool: "sendEmail",
			arguments: {
				to: "gestor@empresa.com",
				subject: "Viagem SP · 15–17/09",
				body: "Voo 06:20 POA→SAO (R$ 612) + Hotel Paulista Centro (R$ 540/noite). Dentro da política."
			}
		},
		observation: {
			status: "enviado",
			requires_approval: true
		},
		decision: "Objetivo atingido: roteiro montado dentro da política e enviado para aprovação.",
		latencyMs: 260
	}
];
//#endregion
//#region src/components/lab/AgentViews.tsx
var TOOL_ICONS = {
	calendar: Calendar,
	policy: BookOpen,
	flights: Plane,
	hotels: Hotel,
	weather: CloudSun,
	email: Mail
};
function ToolNode({ tool, active, used, onClick }) {
	const Icon = TOOL_ICONS[tool.id] ?? Bot;
	const knowledge = tool.kind === "knowledge";
	const action = tool.kind === "action";
	const color = knowledge ? "var(--rag)" : action ? "var(--chart-5)" : "var(--agent)";
	return /* @__PURE__ */ jsxs("button", {
		type: "button",
		onClick,
		className: cn("w-full rounded-lg border bg-[var(--surface)]/70 p-3 text-left transition-all duration-300", active && "scale-[1.02]"),
		style: {
			borderColor: active || used ? color : "var(--border)",
			boxShadow: active ? `0 0 26px -8px ${color}` : void 0,
			opacity: used && !active ? .75 : 1
		},
		children: [/* @__PURE__ */ jsxs("div", {
			className: "flex items-center gap-2",
			children: [/* @__PURE__ */ jsx(Icon, {
				className: cn("size-4", active && "animate-pulse-soft"),
				style: { color }
			}), /* @__PURE__ */ jsx("span", {
				className: "font-mono text-[11px] font-semibold tracking-wider",
				style: { color },
				children: tool.label
			})]
		}), /* @__PURE__ */ jsx("p", {
			className: "mt-1.5 text-[11.5px] leading-snug text-muted-foreground",
			children: tool.description
		})]
	});
}
function ToolCallViewer({ step }) {
	return /* @__PURE__ */ jsxs("div", {
		className: "grid gap-3 md:grid-cols-2",
		children: [/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("p", {
			className: "label-mono mb-1.5",
			children: "Tool call"
		}), step.call ? /* @__PURE__ */ jsx(JsonBlock, { data: step.call }) : /* @__PURE__ */ jsx("p", {
			className: "rounded-md border border-dashed border-border p-3 text-xs text-muted-foreground",
			children: "Nenhuma tool chamada neste passo — apenas decisão interna."
		})] }), /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("p", {
			className: "label-mono mb-1.5",
			children: "Observation (resultado observado)"
		}), /* @__PURE__ */ jsx(JsonBlock, {
			data: step.observation,
			className: "text-[var(--signal)]"
		})] })]
	});
}
function AgentExecutionTimeline({ steps, current, onSelect, dev }) {
	return /* @__PURE__ */ jsxs("ol", {
		className: "relative space-y-2 pl-6",
		children: [/* @__PURE__ */ jsx("span", { className: "absolute top-2 bottom-2 left-[7px] w-px bg-border" }), steps.map((s, i) => {
			const tool = AGENT_TOOLS.find((t) => t.id === s.toolId);
			const active = i === current;
			const done = i < current;
			return /* @__PURE__ */ jsxs("li", {
				className: "relative",
				children: [/* @__PURE__ */ jsx("span", { className: cn("absolute top-3.5 -left-[19px] size-[9px] rounded-full border-2 transition-colors", active ? "animate-pulse-soft border-[var(--agent)] bg-[var(--agent)]" : done ? "border-[var(--signal)] bg-[var(--signal)]" : "border-border bg-background") }), /* @__PURE__ */ jsxs("button", {
					type: "button",
					onClick: () => onSelect(i),
					className: cn("w-full rounded-md border p-3 text-left transition-colors", active ? "border-[var(--agent)]/50 bg-[var(--agent)]/8" : "border-border bg-[var(--surface)]/60 hover:border-[var(--agent)]/35"),
					children: [
						/* @__PURE__ */ jsxs("div", {
							className: "flex flex-wrap items-center gap-2",
							children: [
								/* @__PURE__ */ jsxs("span", {
									className: "font-mono text-[11px] font-semibold text-[var(--agent)]",
									children: ["STEP ", s.n]
								}),
								tool ? /* @__PURE__ */ jsx("span", {
									className: "rounded-full border border-border px-2 py-0.5 font-mono text-[10px] text-muted-foreground",
									children: tool.name
								}) : null,
								dev ? /* @__PURE__ */ jsxs("span", {
									className: "ml-auto font-mono text-[10px] text-muted-foreground",
									children: [s.latencyMs, " ms (simulado)"]
								}) : null
							]
						}),
						/* @__PURE__ */ jsxs("p", {
							className: "mt-1.5 text-[13px] leading-relaxed",
							children: [/* @__PURE__ */ jsx("span", {
								className: "label-mono mr-1.5",
								children: "plano:"
							}), s.plan]
						}),
						(active || done) && /* @__PURE__ */ jsxs("p", {
							className: "mt-1 text-[12.5px] leading-relaxed text-muted-foreground",
							children: [/* @__PURE__ */ jsx("span", {
								className: "label-mono mr-1.5",
								children: "decisão:"
							}), s.decision]
						})
					]
				})]
			}, s.n);
		})]
	});
}
//#endregion
//#region src/routes/agents.tsx?tsr-split=component
var LOOP = [
	{
		label: "Goal",
		icon: Target
	},
	{
		label: "Think / Plan",
		icon: Bot
	},
	{
		label: "Select tool",
		icon: Wrench
	},
	{
		label: "Execute tool",
		icon: Play
	},
	{
		label: "Observation",
		icon: Search
	},
	{
		label: "Decision",
		icon: Bot
	},
	{
		label: "Next action ↺",
		icon: RotateCcw
	}
];
function AgentLab() {
	const { devMode, setDevMode } = useLab();
	const [current, setCurrent] = useState(0);
	const step = AGENT_STEPS[current];
	const usedTools = new Set(AGENT_STEPS.slice(0, current + 1).map((s) => s.toolId));
	const elapsed = AGENT_STEPS.slice(0, current + 1).reduce((a, s) => a + s.latencyMs, 0);
	return /* @__PURE__ */ jsxs(AppShell, { children: [
		/* @__PURE__ */ jsxs("div", {
			className: "mb-6 flex flex-wrap items-end justify-between gap-4",
			children: [/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("p", {
				className: "label-mono mb-1",
				children: "agent lab"
			}), /* @__PURE__ */ jsx("h1", {
				className: "text-2xl font-semibold sm:text-3xl",
				children: "Agentes de IA"
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
		}),
		/* @__PURE__ */ jsxs("div", {
			className: "grid gap-5 lg:grid-cols-2",
			children: [/* @__PURE__ */ jsxs(Panel, {
				className: "border-[var(--rag)]/35",
				children: [
					/* @__PURE__ */ jsx("p", {
						className: "label-mono mb-1",
						children: "rag pede"
					}),
					/* @__PURE__ */ jsx("p", {
						className: "text-lg font-medium text-[var(--rag)]",
						children: "“Procure informações e responda.”"
					}),
					/* @__PURE__ */ jsx("p", {
						className: "mt-2 text-xs text-muted-foreground",
						children: "Uma passagem só: pergunta → busca → contexto → resposta."
					})
				]
			}), /* @__PURE__ */ jsxs(Panel, {
				className: "border-[var(--agent)]/35",
				children: [
					/* @__PURE__ */ jsx("p", {
						className: "label-mono mb-1",
						children: "agente pede"
					}),
					/* @__PURE__ */ jsx("p", {
						className: "text-lg font-medium text-[var(--agent)]",
						children: "“Alcance este objetivo.”"
					}),
					/* @__PURE__ */ jsx("p", {
						className: "mt-2 text-xs text-muted-foreground",
						children: "Vários ciclos: planejar → agir → observar → decidir de novo."
					})
				]
			})]
		}),
		/* @__PURE__ */ jsxs(Panel, {
			className: "mt-5",
			children: [/* @__PURE__ */ jsx(SectionTitle, {
				kicker: "cenário",
				title: AGENT_GOAL,
				description: "Um objetivo, seis ferramentas disponíveis e nenhuma sequência pré-definida. O agente decide o caminho."
			}), /* @__PURE__ */ jsx("div", {
				className: "grid gap-3 sm:grid-cols-2 lg:grid-cols-3",
				children: AGENT_TOOLS.map((t) => /* @__PURE__ */ jsx(ToolNode, {
					tool: t,
					active: step.toolId === t.id,
					used: usedTools.has(t.id)
				}, t.id))
			})]
		}),
		/* @__PURE__ */ jsxs("div", {
			className: "mt-5 grid gap-5 lg:grid-cols-[300px_1fr]",
			children: [/* @__PURE__ */ jsxs(Panel, { children: [
				/* @__PURE__ */ jsx("p", {
					className: "label-mono mb-3",
					children: "agent loop"
				}),
				/* @__PURE__ */ jsx(PipelineFlow, {
					steps: LOOP,
					tone: "agent",
					activeIndex: (current % LOOP.length + 1) % LOOP.length
				}),
				/* @__PURE__ */ jsx("p", {
					className: "mt-3 text-xs text-muted-foreground",
					children: "O loop roda até o objetivo ser atingido ou até um limite de passos/custo. É isso que diferencia um agente de uma única chamada ao modelo."
				})
			] }), /* @__PURE__ */ jsxs("div", {
				className: "space-y-5",
				children: [/* @__PURE__ */ jsxs(Panel, { children: [
					/* @__PURE__ */ jsx(SectionTitle, {
						kicker: "execução",
						title: "Passo a passo",
						right: /* @__PURE__ */ jsxs("div", {
							className: "flex gap-2",
							children: [/* @__PURE__ */ jsxs(Button, {
								variant: "outline",
								size: "sm",
								onClick: () => setCurrent(0),
								children: [/* @__PURE__ */ jsx(RotateCcw, { className: "size-3.5" }), " Reiniciar"]
							}), /* @__PURE__ */ jsxs(Button, {
								size: "sm",
								onClick: () => setCurrent((c) => Math.min(AGENT_STEPS.length - 1, c + 1)),
								disabled: current === AGENT_STEPS.length - 1,
								children: [/* @__PURE__ */ jsx(SkipForward, { className: "size-3.5" }), " Próximo passo"]
							})]
						})
					}),
					/* @__PURE__ */ jsx(AgentExecutionTimeline, {
						steps: AGENT_STEPS,
						current,
						onSelect: setCurrent,
						dev: devMode
					}),
					/* @__PURE__ */ jsxs(SimNote, { children: [
						"Isto é um ",
						/* @__PURE__ */ jsx("strong", { children: "plano de execução" }),
						" e um registro de decisões operacionais — não é chain-of-thought privada de um modelo. Sistemas em produção logam tool calls e observações, não o raciocínio interno bruto."
					] })
				] }), /* @__PURE__ */ jsxs(Panel, { children: [
					/* @__PURE__ */ jsxs("p", {
						className: "label-mono mb-3",
						children: ["tool call visualizer · step ", step.n]
					}),
					/* @__PURE__ */ jsx(ToolCallViewer, { step }),
					/* @__PURE__ */ jsx("div", {
						className: "mt-4 flex items-center gap-2",
						children: /* @__PURE__ */ jsx(PipelineNode, {
							label: "observação alimenta o próximo passo",
							value: step.decision,
							icon: Bot,
							tone: "agent",
							active: true,
							compact: true
						})
					}),
					devMode ? /* @__PURE__ */ jsxs("div", {
						className: "mt-4 grid gap-3 sm:grid-cols-3",
						children: [
							/* @__PURE__ */ jsx(Stat, {
								label: "Steps executados",
								value: current + 1,
								tone: "agent"
							}),
							/* @__PURE__ */ jsx(Stat, {
								label: "Tools distintas",
								value: usedTools.size
							}),
							/* @__PURE__ */ jsx(Stat, {
								label: "Latência acumulada",
								value: `${elapsed} ms`,
								tone: "warn",
								hint: "simulada"
							})
						]
					}) : null
				] })]
			})]
		}),
		/* @__PURE__ */ jsxs(Panel, {
			className: "mt-5 scroll-mt-24",
			id: "rag-as-tool",
			children: [/* @__PURE__ */ jsx(SectionTitle, {
				kicker: "rag + agentes",
				title: "O agente usando RAG como ferramenta",
				description: "RAG não substitui o agente, e o agente não substitui RAG. Um responde com conhecimento; o outro age em direção a um objetivo — e pode usar o primeiro."
			}), /* @__PURE__ */ jsxs("div", {
				className: "grid gap-5 lg:grid-cols-[1fr_1fr]",
				children: [/* @__PURE__ */ jsxs("div", {
					className: "rounded-lg border border-border bg-[oklch(0.14_0.014_264)] p-4",
					children: [
						/* @__PURE__ */ jsxs("div", {
							className: "mb-3 flex items-center gap-2 rounded-md border border-[var(--agent)]/50 bg-[var(--agent)]/10 px-3 py-2",
							children: [/* @__PURE__ */ jsx(Bot, { className: "size-4 text-[var(--agent)]" }), /* @__PURE__ */ jsx("span", {
								className: "font-mono text-xs font-semibold text-[var(--agent)]",
								children: "AGENT"
							})]
						}),
						/* @__PURE__ */ jsxs("ul", {
							className: "space-y-1.5 pl-3 font-mono text-[11.5px] text-muted-foreground",
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
							className: "mt-2 ml-8 border-l border-dashed border-[var(--rag)]/50 pl-4",
							children: [
								/* @__PURE__ */ jsx(PipelineNode, {
									label: "RAG",
									value: "retrieval + reranking",
									icon: Search,
									compact: true
								}),
								/* @__PURE__ */ jsx(PipelineEdge, { active: true }),
								/* @__PURE__ */ jsx(PipelineNode, {
									label: "Vector Database",
									value: "Qdrant · company_docs",
									icon: Database,
									compact: true
								}),
								/* @__PURE__ */ jsx(PipelineEdge, { active: true }),
								/* @__PURE__ */ jsx(PipelineNode, {
									label: "Company Documents",
									value: "políticas, manuais, procedimentos",
									icon: Database,
									compact: true
								})
							]
						})
					]
				}), /* @__PURE__ */ jsxs("div", {
					className: "space-y-3",
					children: [
						/* @__PURE__ */ jsxs("p", {
							className: "text-sm leading-relaxed text-muted-foreground",
							children: [
								"No step 2 da simulação acima, o agente chamou",
								" ",
								/* @__PURE__ */ jsx("code", {
									className: "font-mono text-[var(--rag)]",
									children: "searchCompanyPolicy"
								}),
								". Por baixo, essa tool é um pipeline RAG completo: embedding da query, filtro de metadata, busca vetorial, reranking e devolução dos trechos relevantes."
							]
						}),
						/* @__PURE__ */ jsxs("p", {
							className: "text-sm leading-relaxed text-muted-foreground",
							children: [
								"A diferença é ",
								/* @__PURE__ */ jsx("strong", { children: "quem decide" }),
								". Em RAG puro, o pipeline é fixo. Com um agente, a busca é apenas uma das ações possíveis — e pode ser repetida, refinada ou abandonada conforme as observações."
							]
						}),
						/* @__PURE__ */ jsxs("div", {
							className: "grid gap-3 sm:grid-cols-2",
							children: [/* @__PURE__ */ jsx(Stat, {
								label: "RAG dentro do agente",
								value: "1 tool",
								tone: "rag"
							}), /* @__PURE__ */ jsx(Stat, {
								label: "Outras tools",
								value: `${AGENT_TOOLS.length - 1}`,
								tone: "agent"
							})]
						})
					]
				})]
			})]
		}),
		/* @__PURE__ */ jsxs(Panel, {
			className: "mt-5",
			children: [
				/* @__PURE__ */ jsx(SectionTitle, {
					kicker: "comparação",
					title: "RAG vs Agent"
				}),
				/* @__PURE__ */ jsxs("div", {
					className: "mb-5 grid gap-4 sm:grid-cols-2",
					children: [/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("p", {
						className: "label-mono mb-2",
						children: "fluxo rag"
					}), /* @__PURE__ */ jsx(PipelineFlow, {
						steps: [
							{ label: "Pergunta" },
							{ label: "Busca" },
							{ label: "Contexto" },
							{ label: "LLM" },
							{ label: "Resposta" }
						],
						tone: "rag"
					})] }), /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("p", {
						className: "label-mono mb-2",
						children: "fluxo agent"
					}), /* @__PURE__ */ jsx(PipelineFlow, {
						steps: [
							{ label: "Objetivo" },
							{ label: "Planejamento" },
							{ label: "Tool" },
							{ label: "Resultado" },
							{ label: "Nova decisão" },
							{ label: "Tool" },
							{ label: "Resposta / Ação" }
						],
						tone: "agent"
					})] })]
				}),
				/* @__PURE__ */ jsx("div", {
					className: "overflow-x-auto rounded-lg border border-border",
					children: /* @__PURE__ */ jsxs(Table, { children: [/* @__PURE__ */ jsx(TableHeader, { children: /* @__PURE__ */ jsxs(TableRow, {
						className: "hover:bg-transparent",
						children: [
							/* @__PURE__ */ jsx(TableHead, {}),
							/* @__PURE__ */ jsx(TableHead, {
								className: "text-[var(--rag)]",
								children: "RAG"
							}),
							/* @__PURE__ */ jsx(TableHead, {
								className: "text-[var(--agent)]",
								children: "AGENT"
							})
						]
					}) }), /* @__PURE__ */ jsx(TableBody, { children: [
						[
							"Busca conhecimento",
							"SIM",
							"pode"
						],
						[
							"Executa ações",
							"normalmente NÃO",
							"SIM"
						],
						[
							"Possui tools",
							"opcional",
							"SIM"
						],
						[
							"Loop de execução",
							"normalmente NÃO",
							"SIM"
						],
						[
							"Objetivo principal",
							"responder usando conhecimento",
							"atingir um objetivo"
						]
					].map(([k, a, b]) => /* @__PURE__ */ jsxs(TableRow, { children: [
						/* @__PURE__ */ jsx(TableCell, {
							className: "font-mono text-xs text-muted-foreground",
							children: k
						}),
						/* @__PURE__ */ jsx(TableCell, {
							className: "text-xs",
							children: a
						}),
						/* @__PURE__ */ jsx(TableCell, {
							className: "text-xs",
							children: b
						})
					] }, k)) })] })
				})
			]
		})
	] });
}
//#endregion
export { AgentLab as component };
