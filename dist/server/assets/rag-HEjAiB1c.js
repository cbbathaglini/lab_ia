import { a as PARSERS, c as VECTOR_DBS, i as GROUP_COLORS, n as FORMATS, t as EMBEDDING_POINTS } from "./data-CeF3osJN.js";
import { c as cosine, d as fakeEmbedding, f as formatNumber, g as simulatedLatency, h as simulateAnswer, i as SCALE, l as countTokens, m as search, n as useLab, p as rerank, s as chunkDocument, u as countWords } from "./store-oMQJaQSS.js";
import { a as cn } from "./tooltip-B16Z84u2.js";
import { a as SectionTitle, c as AppShell, n as JsonBlock, o as SimNote, r as Panel, s as Stat, t as InfoTip } from "./primitives-DFOvT6Pn.js";
import { i as PipelineNode, n as PipelineEdge, r as PipelineFlow, t as FunnelBar } from "./Pipeline-DL_3P7-a.js";
import { t as Button } from "./button-Cq5Yh-24.js";
import { t as Switch } from "./switch-Cx31VwYw.js";
import { a as TableHeader, i as TableHead, n as TableBody, o as TableRow, r as TableCell, t as Table } from "./table-POL7QzXM.js";
import { t as Input } from "./input-D5z8RfPB.js";
import { a as ChunkRibbon, i as ChunkCard, n as ContextViewer, r as SimilarityResult, t as Textarea } from "./textarea-Dn4UMVsc.js";
import * as React from "react";
import { useMemo, useState } from "react";
import { jsx, jsxs } from "react/jsx-runtime";
import { Bot, Check, ChevronDown, ChevronLeft, ChevronRight, ChevronUp, Database, FileText, Filter, Layers, Plus, RotateCcw, Search, Sparkles, Trash2, Zap } from "lucide-react";
import { cva } from "class-variance-authority";
import * as SelectPrimitive from "@radix-ui/react-select";
//#region src/components/lab/EmbeddingViewer.tsx
function EmbeddingViewer({ text, dims = 12 }) {
	const vec = useMemo(() => fakeEmbedding(text, dims), [text, dims]);
	return /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsxs("div", {
		className: "grid grid-cols-3 gap-1.5 sm:grid-cols-4 lg:grid-cols-6",
		children: [vec.map((v, i) => /* @__PURE__ */ jsxs("div", {
			className: "rounded-sm border border-border bg-[oklch(0.13_0.014_264)] px-2 py-1.5",
			style: { boxShadow: `inset ${Math.abs(v) * 60}px 0 0 -55px ${v >= 0 ? "var(--rag)" : "var(--chart-5)"}` },
			children: [/* @__PURE__ */ jsxs("span", {
				className: "block font-mono text-[9px] text-muted-foreground",
				children: ["d", i]
			}), /* @__PURE__ */ jsxs("span", {
				className: "font-mono text-xs tabular-nums",
				style: { color: v >= 0 ? "var(--rag)" : "var(--chart-5)" },
				children: [v >= 0 ? " " : "", v.toFixed(3)]
			})]
		}, i)), /* @__PURE__ */ jsx("div", {
			className: "flex items-center justify-center rounded-sm border border-dashed border-border px-2 py-1.5 font-mono text-[10px] text-muted-foreground",
			children: "… 1536d"
		})]
	}), /* @__PURE__ */ jsx(SimNote, { children: "Estes números são gerados localmente por uma função determinística, apenas para visualização. Não são embeddings reais de um modelo." })] });
}
function VectorSpace() {
	const [selected, setSelected] = useState(0);
	const anchor = EMBEDDING_POINTS[0];
	const point = EMBEDDING_POINTS[selected] ?? anchor;
	const sim = useMemo(() => {
		const raw = cosine(fakeEmbedding(anchor.text), fakeEmbedding(point.text));
		const dist = Math.hypot(point.x - anchor.x, point.y - anchor.y);
		return Number(Math.max(.05, Math.min(.99, (1 - dist) * .85 + (raw + 1) * .07)).toFixed(2));
	}, [anchor, point]);
	return /* @__PURE__ */ jsxs("div", {
		className: "grid gap-4 lg:grid-cols-[1.4fr_1fr]",
		children: [/* @__PURE__ */ jsx("div", {
			className: "relative aspect-4/3 w-full rounded-lg border border-border bg-[oklch(0.14_0.014_264)]",
			children: /* @__PURE__ */ jsxs("svg", {
				viewBox: "0 0 100 100",
				className: "absolute inset-0 size-full",
				children: [
					[
						20,
						40,
						60,
						80
					].map((g) => /* @__PURE__ */ jsxs("g", { children: [/* @__PURE__ */ jsx("line", {
						x1: g,
						y1: "0",
						x2: g,
						y2: "100",
						stroke: "var(--grid)",
						strokeWidth: "0.3"
					}), /* @__PURE__ */ jsx("line", {
						x1: "0",
						y1: g,
						x2: "100",
						y2: g,
						stroke: "var(--grid)",
						strokeWidth: "0.3"
					})] }, g)),
					EMBEDDING_POINTS.map((p, i) => i === selected ? null : /* @__PURE__ */ jsx("line", {
						x1: point.x * 100,
						y1: (1 - point.y) * 100,
						x2: p.x * 100,
						y2: (1 - p.y) * 100,
						stroke: p.group === point.group ? GROUP_COLORS[p.group] : "var(--border)",
						strokeWidth: p.group === point.group ? .5 : .2,
						strokeDasharray: "2 2",
						opacity: p.group === point.group ? .7 : .3
					}, `l${i}`)),
					EMBEDDING_POINTS.map((p, i) => /* @__PURE__ */ jsxs("g", {
						onClick: () => setSelected(i),
						className: "cursor-pointer",
						children: [
							/* @__PURE__ */ jsx("circle", {
								cx: p.x * 100,
								cy: (1 - p.y) * 100,
								r: i === selected ? 3 : 2,
								fill: GROUP_COLORS[p.group],
								opacity: i === selected ? 1 : .8
							}),
							i === selected ? /* @__PURE__ */ jsx("circle", {
								cx: p.x * 100,
								cy: (1 - p.y) * 100,
								r: "5.5",
								fill: "none",
								stroke: GROUP_COLORS[p.group],
								strokeWidth: "0.5",
								className: "animate-pulse-soft"
							}) : null,
							/* @__PURE__ */ jsx("text", {
								x: p.x * 100 + 4,
								y: (1 - p.y) * 100 + 1.5,
								fontSize: "2.6",
								fill: "var(--muted-foreground)",
								className: "font-mono",
								children: p.text
							})
						]
					}, p.text))
				]
			})
		}), /* @__PURE__ */ jsxs("div", {
			className: "space-y-3",
			children: [
				/* @__PURE__ */ jsx("div", {
					className: "flex flex-wrap gap-2",
					children: Object.entries(GROUP_COLORS).map(([g, c]) => /* @__PURE__ */ jsxs("span", {
						className: "inline-flex items-center gap-1.5 rounded-full border border-border px-2 py-0.5 text-[11px]",
						children: [/* @__PURE__ */ jsx("span", {
							className: "size-2 rounded-full",
							style: { backgroundColor: c }
						}), g]
					}, g))
				}),
				/* @__PURE__ */ jsxs("div", {
					className: "rounded-md border border-border bg-[var(--surface)] p-3",
					children: [
						/* @__PURE__ */ jsx("p", {
							className: "label-mono",
							children: "Ponto selecionado"
						}),
						/* @__PURE__ */ jsxs("p", {
							className: "mb-2 text-sm font-medium",
							children: [
								"“",
								point.text,
								"”"
							]
						}),
						/* @__PURE__ */ jsx("p", {
							className: "label-mono",
							children: "Embedding fictício"
						}),
						/* @__PURE__ */ jsxs("p", {
							className: "mb-2 break-all font-mono text-[11px] text-[var(--rag)]",
							children: [
								"[",
								fakeEmbedding(point.text, 6).map((v) => v.toFixed(3)).join(", "),
								", …]"
							]
						}),
						/* @__PURE__ */ jsxs("p", {
							className: "label-mono",
							children: [
								"Similaridade com “",
								anchor.text,
								"”"
							]
						}),
						/* @__PURE__ */ jsx("p", {
							className: "font-mono text-2xl font-semibold text-[var(--signal)]",
							children: sim.toFixed(2)
						})
					]
				}),
				/* @__PURE__ */ jsx("p", {
					className: "text-xs leading-relaxed text-muted-foreground",
					children: "Embeddings reais possuem centenas ou milhares de dimensões. Aqui reduzimos para 2 dimensões apenas para visualização — é o que ferramentas como t-SNE e UMAP fazem."
				})
			]
		})]
	});
}
//#endregion
//#region src/components/lab/VectorDatabaseViewer.tsx
function VectorDatabaseViewer({ chunks, totalVectors }) {
	const [openId, setOpenId] = useState(chunks[0]?.id ?? null);
	const open = chunks.find((c) => c.id === openId) ?? chunks[0];
	const docsIndexed = useMemo(() => new Set(chunks.map((c) => c.docId)).size, [chunks]);
	const visibleChunks = chunks.slice(0, 10);
	return /* @__PURE__ */ jsxs("div", {
		className: "space-y-4",
		children: [
			/* @__PURE__ */ jsxs("div", {
				className: "flex flex-wrap items-center justify-between gap-3 rounded-lg border border-[var(--rag)]/35 bg-[var(--rag)]/6 px-4 py-3",
				children: [/* @__PURE__ */ jsxs("div", {
					className: "flex items-center gap-3",
					children: [/* @__PURE__ */ jsx(Database, { className: "size-5 text-[var(--rag)]" }), /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("p", {
						className: "font-mono text-sm font-semibold text-[var(--rag)]",
						children: "QDRANT"
					}), /* @__PURE__ */ jsx("p", {
						className: "text-xs text-muted-foreground",
						children: "collection: company_docs"
					})] })]
				}), /* @__PURE__ */ jsxs("div", {
					className: "flex gap-6 font-mono text-xs",
					children: [
						/* @__PURE__ */ jsxs("span", { children: [/* @__PURE__ */ jsx("span", {
							className: "text-muted-foreground",
							children: "vectors: "
						}), formatNumber(totalVectors ?? chunks.length)] }),
						/* @__PURE__ */ jsxs("span", { children: [/* @__PURE__ */ jsx("span", {
							className: "text-muted-foreground",
							children: "dims: "
						}), "1536"] }),
						/* @__PURE__ */ jsxs("span", { children: [/* @__PURE__ */ jsx("span", {
							className: "text-muted-foreground",
							children: "metric: "
						}), "cosine"] })
					]
				})]
			}),
			/* @__PURE__ */ jsxs("div", {
				className: "grid gap-3 md:grid-cols-3",
				children: [
					/* @__PURE__ */ jsxs("div", {
						className: "rounded-md border border-border bg-[var(--surface)]/70 p-3",
						children: [/* @__PURE__ */ jsx("p", {
							className: "label-mono mb-1",
							children: "o que entra"
						}), /* @__PURE__ */ jsx("p", {
							className: "text-xs text-muted-foreground",
							children: "Chunks de texto, não o PDF/DOCX inteiro."
						})]
					}),
					/* @__PURE__ */ jsxs("div", {
						className: "rounded-md border border-[var(--rag)]/35 bg-[var(--rag)]/6 p-3",
						children: [/* @__PURE__ */ jsx("p", {
							className: "label-mono mb-1",
							children: "o que vira vetor"
						}), /* @__PURE__ */ jsx("p", {
							className: "text-xs text-muted-foreground",
							children: "Cada chunk gera 1 embedding com 1536 dimensões."
						})]
					}),
					/* @__PURE__ */ jsxs("div", {
						className: "rounded-md border border-[var(--accent)]/35 bg-[var(--accent)]/6 p-3",
						children: [/* @__PURE__ */ jsx("p", {
							className: "label-mono mb-1",
							children: "o que fica no payload"
						}), /* @__PURE__ */ jsx("p", {
							className: "text-xs text-muted-foreground",
							children: "Texto original, documento, página, departamento, ano e tipo."
						})]
					})
				]
			}),
			/* @__PURE__ */ jsxs("div", {
				className: "grid gap-3 sm:grid-cols-3",
				children: [
					/* @__PURE__ */ jsxs("div", {
						className: "rounded-md border border-border bg-[var(--surface)]/70 p-3",
						children: [/* @__PURE__ */ jsx("p", {
							className: "label-mono",
							children: "documentos indexados"
						}), /* @__PURE__ */ jsx("p", {
							className: "mt-1 font-mono text-2xl text-foreground",
							children: formatNumber(docsIndexed)
						})]
					}),
					/* @__PURE__ */ jsxs("div", {
						className: "rounded-md border border-border bg-[var(--surface)]/70 p-3",
						children: [/* @__PURE__ */ jsx("p", {
							className: "label-mono",
							children: "registros/vetores"
						}), /* @__PURE__ */ jsx("p", {
							className: "mt-1 font-mono text-2xl text-[var(--rag)]",
							children: formatNumber(totalVectors ?? chunks.length)
						})]
					}),
					/* @__PURE__ */ jsxs("div", {
						className: "rounded-md border border-border bg-[var(--surface)]/70 p-3",
						children: [/* @__PURE__ */ jsx("p", {
							className: "label-mono",
							children: "1 registro contém"
						}), /* @__PURE__ */ jsx("p", {
							className: "mt-1 font-mono text-sm text-muted-foreground",
							children: "id + vector + payload"
						})]
					})
				]
			}),
			/* @__PURE__ */ jsx("div", {
				className: "overflow-x-auto rounded-lg border border-border",
				children: /* @__PURE__ */ jsxs(Table, { children: [/* @__PURE__ */ jsx(TableHeader, { children: /* @__PURE__ */ jsxs(TableRow, {
					className: "hover:bg-transparent",
					children: [
						/* @__PURE__ */ jsx(TableHead, {
							className: "font-mono text-[11px] uppercase",
							children: "vector_id"
						}),
						/* @__PURE__ */ jsx(TableHead, {
							className: "font-mono text-[11px] uppercase",
							children: "vector"
						}),
						/* @__PURE__ */ jsx(TableHead, {
							className: "font-mono text-[11px] uppercase",
							children: "payload.text"
						}),
						/* @__PURE__ */ jsx(TableHead, {
							className: "font-mono text-[11px] uppercase",
							children: "payload.metadata"
						})
					]
				}) }), /* @__PURE__ */ jsx(TableBody, { children: visibleChunks.map((c) => /* @__PURE__ */ jsxs(TableRow, {
					onClick: () => setOpenId(c.id),
					className: "cursor-pointer",
					"data-state": c.id === open?.id ? "selected" : void 0,
					children: [
						/* @__PURE__ */ jsx(TableCell, {
							className: "font-mono text-[11px] text-[var(--rag)]",
							children: c.id
						}),
						/* @__PURE__ */ jsxs(TableCell, {
							className: "font-mono text-[11px] text-muted-foreground",
							children: [
								"[",
								c.embedding.slice(0, 3).map((v) => v.toFixed(2)).join(", "),
								", ... 1536d]"
							]
						}),
						/* @__PURE__ */ jsx(TableCell, {
							className: "max-w-[380px] truncate text-xs",
							children: c.text
						}),
						/* @__PURE__ */ jsxs(TableCell, {
							className: "font-mono text-[11px] text-muted-foreground",
							children: [
								c.docName,
								" · p.",
								c.metadata.pagina,
								" · ",
								c.metadata.departamento,
								" · ",
								c.metadata.tipo
							]
						})
					]
				}, c.id)) })] })
			}),
			/* @__PURE__ */ jsxs("p", {
				className: "text-xs text-muted-foreground",
				children: [
					"Na prática, a busca vetorial consulta a coluna ",
					/* @__PURE__ */ jsx("span", {
						className: "font-mono text-[var(--rag)]",
						children: "vector"
					}),
					". Depois que encontra os IDs mais próximos, a aplicação usa o ",
					/* @__PURE__ */ jsx("span", {
						className: "font-mono text-[var(--accent)]",
						children: "payload"
					}),
					"para montar contexto, citar fonte e aplicar filtros."
				]
			}),
			open ? /* @__PURE__ */ jsxs("div", {
				className: "grid gap-4 md:grid-cols-2",
				children: [/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("p", {
					className: "label-mono mb-1.5",
					children: "Registro selecionado"
				}), /* @__PURE__ */ jsx(JsonBlock, { data: {
					id: open.id,
					vector: [...open.embedding.slice(0, 4).map((v) => Number(v.toFixed(3))), "... 1536 dims"],
					payload: {
						text: open.text.slice(0, 90) + "...",
						doc_name: open.docName
					}
				} })] }), /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("p", {
					className: "label-mono mb-1.5",
					children: "Metadata (payload)"
				}), /* @__PURE__ */ jsx(JsonBlock, { data: {
					departamento: open.metadata.departamento,
					ano: open.metadata.ano,
					tipo: open.metadata.tipo,
					pagina: open.metadata.pagina,
					doc_id: open.docId
				} })] })]
			}) : null
		]
	});
}
function VectorDbComparison() {
	return /* @__PURE__ */ jsx("div", {
		className: "overflow-x-auto rounded-lg border border-border",
		children: /* @__PURE__ */ jsxs(Table, { children: [/* @__PURE__ */ jsx(TableHeader, { children: /* @__PURE__ */ jsxs(TableRow, {
			className: "hover:bg-transparent",
			children: [
				/* @__PURE__ */ jsx(TableHead, { children: "Opção" }),
				/* @__PURE__ */ jsx(TableHead, { children: "Tipo" }),
				/* @__PURE__ */ jsx(TableHead, { children: "Forte em" }),
				/* @__PURE__ */ jsx(TableHead, { children: "Atenção" })
			]
		}) }), /* @__PURE__ */ jsx(TableBody, { children: VECTOR_DBS.map((db) => /* @__PURE__ */ jsxs(TableRow, { children: [
			/* @__PURE__ */ jsx(TableCell, {
				className: "font-mono text-xs font-semibold text-[var(--rag)]",
				children: db.name
			}),
			/* @__PURE__ */ jsx(TableCell, {
				className: "text-xs",
				children: db.tipo
			}),
			/* @__PURE__ */ jsx(TableCell, {
				className: "text-xs text-muted-foreground",
				children: db.forte
			}),
			/* @__PURE__ */ jsx(TableCell, {
				className: "text-xs text-muted-foreground",
				children: db.atencao
			})
		] }, db.name)) })] })
	});
}
//#endregion
//#region src/components/ui/select.tsx
var Select = SelectPrimitive.Root;
var SelectValue = SelectPrimitive.Value;
var SelectTrigger = React.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ jsxs(SelectPrimitive.Trigger, {
	ref,
	className: cn("flex h-9 w-full items-center justify-between whitespace-nowrap rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm ring-offset-background cursor-pointer data-[placeholder]:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1", className),
	...props,
	children: [children, /* @__PURE__ */ jsx(SelectPrimitive.Icon, {
		asChild: true,
		children: /* @__PURE__ */ jsx(ChevronDown, { className: "h-4 w-4 opacity-50" })
	})]
}));
SelectTrigger.displayName = SelectPrimitive.Trigger.displayName;
var SelectScrollUpButton = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(SelectPrimitive.ScrollUpButton, {
	ref,
	className: cn("flex cursor-default items-center justify-center py-1", className),
	...props,
	children: /* @__PURE__ */ jsx(ChevronUp, { className: "h-4 w-4" })
}));
SelectScrollUpButton.displayName = SelectPrimitive.ScrollUpButton.displayName;
var SelectScrollDownButton = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(SelectPrimitive.ScrollDownButton, {
	ref,
	className: cn("flex cursor-default items-center justify-center py-1", className),
	...props,
	children: /* @__PURE__ */ jsx(ChevronDown, { className: "h-4 w-4" })
}));
SelectScrollDownButton.displayName = SelectPrimitive.ScrollDownButton.displayName;
var SelectContent = React.forwardRef(({ className, children, position = "popper", ...props }, ref) => /* @__PURE__ */ jsx(SelectPrimitive.Portal, { children: /* @__PURE__ */ jsxs(SelectPrimitive.Content, {
	ref,
	className: cn("relative z-50 max-h-(--radix-select-content-available-height) min-w-[8rem] overflow-y-auto overflow-x-hidden rounded-md border bg-popover text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 origin-(--radix-select-content-transform-origin)", position === "popper" && "data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1", className),
	position,
	...props,
	children: [
		/* @__PURE__ */ jsx(SelectScrollUpButton, {}),
		/* @__PURE__ */ jsx(SelectPrimitive.Viewport, {
			className: cn("p-1", position === "popper" && "h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]"),
			children
		}),
		/* @__PURE__ */ jsx(SelectScrollDownButton, {})
	]
}) }));
SelectContent.displayName = SelectPrimitive.Content.displayName;
var SelectLabel = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(SelectPrimitive.Label, {
	ref,
	className: cn("px-2 py-1.5 text-sm font-semibold", className),
	...props
}));
SelectLabel.displayName = SelectPrimitive.Label.displayName;
var SelectItem = React.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ jsxs(SelectPrimitive.Item, {
	ref,
	className: cn("relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-2 pr-8 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50", className),
	...props,
	children: [/* @__PURE__ */ jsx("span", {
		className: "absolute right-2 flex h-3.5 w-3.5 items-center justify-center",
		children: /* @__PURE__ */ jsx(SelectPrimitive.ItemIndicator, { children: /* @__PURE__ */ jsx(Check, { className: "h-4 w-4" }) })
	}), /* @__PURE__ */ jsx(SelectPrimitive.ItemText, { children })]
}));
SelectItem.displayName = SelectPrimitive.Item.displayName;
var SelectSeparator = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(SelectPrimitive.Separator, {
	ref,
	className: cn("-mx-1 my-1 h-px bg-muted", className),
	...props
}));
SelectSeparator.displayName = SelectPrimitive.Separator.displayName;
//#endregion
//#region src/components/lab/MetadataFilter.tsx
var FIELDS = [
	{
		key: "departamento",
		label: "Departamento",
		options: [
			"todos",
			"RH",
			"TI",
			"Financeiro"
		]
	},
	{
		key: "ano",
		label: "Ano",
		options: [
			"todos",
			"2024",
			"2025",
			"2026"
		]
	},
	{
		key: "tipo",
		label: "Tipo",
		options: [
			"todos",
			"manual",
			"politica",
			"procedimento"
		]
	}
];
function MetadataFilter({ filters, onChange }) {
	return /* @__PURE__ */ jsx("div", {
		className: "grid gap-3 sm:grid-cols-3",
		children: FIELDS.map((f) => /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("p", {
			className: "label-mono mb-1.5",
			children: f.label
		}), /* @__PURE__ */ jsxs(Select, {
			value: filters[f.key],
			onValueChange: (v) => onChange({
				...filters,
				[f.key]: v
			}),
			children: [/* @__PURE__ */ jsx(SelectTrigger, {
				className: "font-mono text-xs",
				children: /* @__PURE__ */ jsx(SelectValue, {})
			}), /* @__PURE__ */ jsx(SelectContent, { children: f.options.map((o) => /* @__PURE__ */ jsx(SelectItem, {
				value: o,
				className: "font-mono text-xs",
				children: o
			}, o)) })]
		})] }, f.key))
	});
}
//#endregion
//#region src/components/ui/badge.tsx
var badgeVariants = cva("inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2", {
	variants: { variant: {
		default: "border-transparent bg-primary text-primary-foreground shadow hover:bg-primary/80",
		secondary: "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
		destructive: "border-transparent bg-destructive text-destructive-foreground shadow hover:bg-destructive/80",
		outline: "text-foreground"
	} },
	defaultVariants: { variant: "default" }
});
function Badge({ className, variant, ...props }) {
	return /* @__PURE__ */ jsx("div", {
		className: cn(badgeVariants({ variant }), className),
		...props
	});
}
//#endregion
//#region src/routes/rag.tsx?tsr-split=component
var STEPS = [
	"Documentos",
	"Parsing",
	"Chunking",
	"Embeddings",
	"Vector DB",
	"Pergunta",
	"Query embedding",
	"Similaridade",
	"Retrieval",
	"Reranking",
	"Context window",
	"LLM",
	"Pipeline completo"
];
function RagLab() {
	const [step, setStep] = useState(0);
	const lab = useLab();
	return /* @__PURE__ */ jsxs(AppShell, { children: [
		/* @__PURE__ */ jsxs("div", {
			className: "mb-6 flex flex-wrap items-end justify-between gap-4",
			children: [/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("p", {
				className: "label-mono mb-1",
				children: "rag lab"
			}), /* @__PURE__ */ jsxs("h1", {
				className: "text-2xl font-semibold sm:text-3xl",
				children: [
					"Etapa ",
					step + 1,
					"/",
					STEPS.length,
					" · ",
					STEPS[step]
				]
			})] }), /* @__PURE__ */ jsx("div", {
				className: "flex items-center gap-3",
				children: /* @__PURE__ */ jsxs("label", {
					className: "flex items-center gap-2 rounded-md border border-border px-3 py-2",
					children: [/* @__PURE__ */ jsx(Switch, {
						checked: lab.devMode,
						onCheckedChange: lab.setDevMode
					}), /* @__PURE__ */ jsx("span", {
						className: "font-mono text-[11px] tracking-wide uppercase",
						children: "Developer mode"
					})]
				})
			})]
		}),
		/* @__PURE__ */ jsx(Timeline, {
			step,
			setStep
		}),
		/* @__PURE__ */ jsxs("div", {
			className: "mt-6",
			children: [
				step === 0 && /* @__PURE__ */ jsx(StepDocuments, {}),
				step === 1 && /* @__PURE__ */ jsx(StepParsing, {}),
				step === 2 && /* @__PURE__ */ jsx(StepChunking, {}),
				step === 3 && /* @__PURE__ */ jsx(StepEmbeddings, {}),
				step === 4 && /* @__PURE__ */ jsx(StepVectorDb, {}),
				step === 5 && /* @__PURE__ */ jsx(StepQuestion, {}),
				step === 6 && /* @__PURE__ */ jsx(StepQueryEmbedding, {}),
				step === 7 && /* @__PURE__ */ jsx(StepSimilarity, {}),
				step === 8 && /* @__PURE__ */ jsx(StepRetrieval, {}),
				step === 9 && /* @__PURE__ */ jsx(StepReranking, {}),
				step === 10 && /* @__PURE__ */ jsx(StepContext, {}),
				step === 11 && /* @__PURE__ */ jsx(StepLlm, {}),
				step === 12 && /* @__PURE__ */ jsx(StepFullPipeline, {})
			]
		}),
		/* @__PURE__ */ jsxs("div", {
			className: "mt-8 flex items-center justify-between gap-3",
			children: [
				/* @__PURE__ */ jsxs(Button, {
					variant: "outline",
					disabled: step === 0,
					onClick: () => setStep((s) => Math.max(0, s - 1)),
					children: [/* @__PURE__ */ jsx(ChevronLeft, { className: "size-4" }), " Anterior"]
				}),
				/* @__PURE__ */ jsxs("span", {
					className: "font-mono text-[11px] text-muted-foreground",
					children: [
						step + 1,
						" / ",
						STEPS.length
					]
				}),
				/* @__PURE__ */ jsxs(Button, {
					disabled: step === STEPS.length - 1,
					onClick: () => setStep((s) => Math.min(STEPS.length - 1, s + 1)),
					children: ["Próxima ", /* @__PURE__ */ jsx(ChevronRight, { className: "size-4" })]
				})
			]
		})
	] });
}
function Timeline({ step, setStep }) {
	return /* @__PURE__ */ jsx("div", {
		className: "-mx-4 overflow-x-auto px-4",
		children: /* @__PURE__ */ jsx("div", {
			className: "flex min-w-max items-center gap-1.5",
			children: STEPS.map((s, i) => /* @__PURE__ */ jsxs("button", {
				onClick: () => setStep(i),
				className: cn("rounded-md border px-2.5 py-1.5 font-mono text-[10.5px] tracking-wide whitespace-nowrap uppercase transition-colors", i === step ? "border-[var(--rag)] bg-[var(--rag)]/12 text-[var(--rag)]" : i < step ? "border-[var(--rag)]/25 text-foreground/70" : "border-border text-muted-foreground hover:text-foreground"),
				children: [
					String(i + 1).padStart(2, "0"),
					" ",
					s
				]
			}, s))
		})
	});
}
function StepDocuments() {
	const { docs, setDocs, resetDocs, scaleMode, setScaleMode } = useLab();
	const [draft, setDraft] = useState({
		name: "",
		text: ""
	});
	const totals = useMemo(() => {
		const text = docs.map((d) => d.text).join(" ");
		return {
			words: countWords(text),
			chars: text.length,
			tokens: countTokens(text)
		};
	}, [docs]);
	return /* @__PURE__ */ jsxs("div", {
		className: "space-y-5",
		children: [/* @__PURE__ */ jsxs(Panel, { children: [
			/* @__PURE__ */ jsx(SectionTitle, {
				kicker: "etapa 01",
				title: "Documentos",
				description: "Tudo começa com a base de conhecimento. Edite, adicione ou remova documentos — todas as etapas seguintes recalculam automaticamente.",
				right: /* @__PURE__ */ jsxs(Button, {
					variant: "outline",
					size: "sm",
					onClick: resetDocs,
					children: [/* @__PURE__ */ jsx(RotateCcw, { className: "size-3.5" }), " Restaurar exemplos"]
				})
			}),
			/* @__PURE__ */ jsxs("div", {
				className: "mb-5 grid gap-3 sm:grid-cols-4",
				children: [
					/* @__PURE__ */ jsx(Stat, {
						label: "Documentos",
						value: docs.length,
						tone: "rag"
					}),
					/* @__PURE__ */ jsx(Stat, {
						label: "Palavras",
						value: formatNumber(totals.words)
					}),
					/* @__PURE__ */ jsx(Stat, {
						label: "Caracteres",
						value: formatNumber(totals.chars)
					}),
					/* @__PURE__ */ jsx(Stat, {
						label: "Tokens aprox.",
						value: formatNumber(totals.tokens),
						tone: "signal"
					})
				]
			}),
			/* @__PURE__ */ jsx("div", {
				className: "space-y-3",
				children: docs.map((d) => /* @__PURE__ */ jsxs("div", {
					className: "rounded-md border border-border bg-[var(--surface)]/60 p-3",
					children: [/* @__PURE__ */ jsxs("div", {
						className: "mb-2 flex flex-wrap items-center gap-2",
						children: [
							/* @__PURE__ */ jsx(FileText, { className: "size-4 text-[var(--rag)]" }),
							/* @__PURE__ */ jsx(Input, {
								value: d.name,
								onChange: (e) => setDocs(docs.map((x) => x.id === d.id ? {
									...x,
									name: e.target.value
								} : x)),
								className: "h-8 max-w-[260px] font-mono text-xs"
							}),
							/* @__PURE__ */ jsx(FormatBadge, { format: d.format }),
							/* @__PURE__ */ jsxs(Badge, {
								variant: "outline",
								className: "font-mono text-[10px]",
								children: [
									d.metadata.departamento,
									" · ",
									d.metadata.ano,
									" · ",
									d.metadata.tipo
								]
							}),
							/* @__PURE__ */ jsx(Button, {
								variant: "ghost",
								size: "icon",
								className: "ml-auto size-8",
								onClick: () => setDocs(docs.filter((x) => x.id !== d.id)),
								"aria-label": `Excluir ${d.name}`,
								children: /* @__PURE__ */ jsx(Trash2, { className: "size-3.5" })
							})
						]
					}), /* @__PURE__ */ jsx(Textarea, {
						value: d.text,
						onChange: (e) => setDocs(docs.map((x) => x.id === d.id ? {
							...x,
							text: e.target.value
						} : x)),
						className: "min-h-24 text-[13px] leading-relaxed"
					})]
				}, d.id))
			}),
			/* @__PURE__ */ jsxs("div", {
				className: "mt-4 rounded-md border border-dashed border-border p-3",
				children: [/* @__PURE__ */ jsx("p", {
					className: "label-mono mb-2",
					children: "Adicionar documento"
				}), /* @__PURE__ */ jsxs("div", {
					className: "flex flex-col gap-2 sm:flex-row",
					children: [
						/* @__PURE__ */ jsx(Input, {
							placeholder: "nome-do-arquivo.txt",
							value: draft.name,
							onChange: (e) => setDraft({
								...draft,
								name: e.target.value
							}),
							className: "font-mono text-xs sm:max-w-[240px]"
						}),
						/* @__PURE__ */ jsx(Input, {
							placeholder: "Conteúdo do documento…",
							value: draft.text,
							onChange: (e) => setDraft({
								...draft,
								text: e.target.value
							}),
							className: "text-xs"
						}),
						/* @__PURE__ */ jsxs(Button, {
							onClick: () => {
								if (!draft.name.trim() || !draft.text.trim()) return;
								const doc = {
									id: `doc_${Date.now()}`,
									name: draft.name.trim(),
									format: "TXT",
									text: draft.text.trim(),
									metadata: {
										departamento: "RH",
										ano: 2026,
										tipo: "politica",
										pagina: 1
									}
								};
								setDocs([...docs, doc]);
								setDraft({
									name: "",
									text: ""
								});
							},
							children: [/* @__PURE__ */ jsx(Plus, { className: "size-4" }), " Adicionar"]
						})
					]
				})]
			})
		] }), /* @__PURE__ */ jsxs(Panel, { children: [/* @__PURE__ */ jsxs("div", {
			className: "mb-4 flex flex-wrap items-center justify-between gap-3",
			children: [/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsxs("h3", {
				className: "flex items-center gap-2 text-base font-semibold",
				children: ["Simular 50.000 documentos", /* @__PURE__ */ jsx(InfoTip, { text: "Nada é criado no navegador. Apenas projetamos os números para você enxergar a escala real de uma base corporativa." })]
			}), /* @__PURE__ */ jsx("p", {
				className: "text-xs text-muted-foreground",
				children: "Conceitual: nenhum documento extra é criado de verdade."
			})] }), /* @__PURE__ */ jsx(Switch, {
				checked: scaleMode,
				onCheckedChange: setScaleMode
			})]
		}), scaleMode ? /* @__PURE__ */ jsx(FunnelBar, { rows: [
			{
				label: "Documentos",
				value: SCALE.documents,
				caption: "média de 10 páginas cada"
			},
			{
				label: "Chunks por documento",
				value: SCALE.chunksPerDoc,
				caption: "~300 tokens cada"
			},
			{
				label: "Chunks totais",
				value: SCALE.chunks,
				caption: "= embeddings = vetores indexados"
			}
		] }) : /* @__PURE__ */ jsx("p", {
			className: "font-mono text-xs text-muted-foreground",
			children: "50.000 documentos → ~20 chunks/documento → ~1.000.000 chunks"
		})] })]
	});
}
function FormatBadge({ format }) {
	return /* @__PURE__ */ jsx("span", {
		className: cn("rounded px-2 py-1 font-mono text-[10px] font-semibold", {
			PDF: "border-red-400/45 bg-red-500/12 text-red-300",
			DOCX: "border-blue-400/45 bg-blue-500/12 text-blue-300",
			TXT: "border-slate-400/45 bg-slate-500/12 text-slate-300",
			HTML: "border-orange-400/45 bg-orange-500/12 text-orange-300",
			MD: "border-purple-400/45 bg-purple-500/12 text-purple-300",
			CSV: "border-emerald-400/45 bg-emerald-500/12 text-emerald-300"
		}[format]),
		children: format
	});
}
function StepParsing() {
	const { docs } = useLab();
	const doc = docs[0];
	const originalName = doc?.name ?? "documento.pdf";
	return /* @__PURE__ */ jsxs(Panel, { children: [
		/* @__PURE__ */ jsx(SectionTitle, {
			kicker: "etapa 02",
			title: "Parsing",
			description: "Parsing transforma diferentes formatos de documento em texto limpo que poderá ser processado. É onde tabelas, cabeçalhos e layout viram conteúdo."
		}),
		/* @__PURE__ */ jsxs("div", {
			className: "grid items-center gap-4 lg:grid-cols-[1fr_auto_1fr]",
			children: [
				/* @__PURE__ */ jsxs("div", {
					className: "rounded-lg border border-border bg-[var(--surface)]/70 p-4",
					children: [/* @__PURE__ */ jsx("p", {
						className: "label-mono mb-2",
						children: "arquivo original"
					}), /* @__PURE__ */ jsxs("div", {
						className: "flex items-center gap-3 rounded-md border border-[var(--chart-5)]/40 bg-[var(--chart-5)]/8 p-3",
						children: [/* @__PURE__ */ jsx(FileText, { className: "size-6 text-[var(--chart-5)]" }), /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("p", {
							className: "font-mono text-sm",
							children: originalName
						}), /* @__PURE__ */ jsx("p", {
							className: "font-mono text-[11px] text-muted-foreground",
							children: "binário · layout · fontes · imagens"
						})] })]
					})]
				}),
				/* @__PURE__ */ jsx("div", {
					className: "flex items-center justify-center lg:flex-col",
					children: /* @__PURE__ */ jsxs("div", {
						className: "relative h-8 w-full lg:h-16 lg:w-8",
						children: [/* @__PURE__ */ jsx("span", { className: "animate-travel-y absolute top-0 left-1/2 size-1.5 rounded-full bg-[var(--rag)] shadow-[0_0_10px_var(--rag)]" }), /* @__PURE__ */ jsx("div", { className: "mx-auto h-full w-px bg-border" })]
					})
				}),
				/* @__PURE__ */ jsxs("div", {
					className: "rounded-lg border border-[var(--rag)]/40 bg-[var(--rag)]/6 p-4",
					children: [/* @__PURE__ */ jsx("p", {
						className: "label-mono mb-2",
						children: "texto extraído"
					}), /* @__PURE__ */ jsxs("p", {
						className: "text-[13px] leading-relaxed text-foreground/85",
						children: [
							"“",
							doc?.text.slice(0, 220) ?? "",
							"…”"
						]
					})]
				})
			]
		}),
		/* @__PURE__ */ jsxs("div", {
			className: "mt-6 grid gap-5 md:grid-cols-2",
			children: [/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("p", {
				className: "label-mono mb-2",
				children: "formatos de entrada comuns"
			}), /* @__PURE__ */ jsx("div", {
				className: "flex flex-wrap gap-2",
				children: FORMATS.map((f) => /* @__PURE__ */ jsx(Badge, {
					variant: "outline",
					className: "font-mono text-[11px]",
					children: f
				}, f))
			})] }), /* @__PURE__ */ jsxs("div", { children: [
				/* @__PURE__ */ jsx("p", {
					className: "label-mono mb-2",
					children: "ferramentas de parsing (exemplos)"
				}),
				/* @__PURE__ */ jsx("div", {
					className: "grid gap-3",
					children: PARSERS.map((p) => /* @__PURE__ */ jsxs("div", {
						title: p.note,
						className: "rounded-md border border-[var(--rag)]/30 bg-[var(--rag)]/6 p-3",
						children: [/* @__PURE__ */ jsxs("div", {
							className: "mb-1 flex flex-wrap items-center gap-2",
							children: [/* @__PURE__ */ jsx("span", {
								className: "rounded-full border border-[var(--rag)]/35 bg-[var(--rag)]/8 px-2.5 py-1 font-mono text-[11px] text-[var(--rag)]",
								children: p.name
							}), /* @__PURE__ */ jsx("span", {
								className: "font-mono text-[10.5px] text-muted-foreground",
								children: p.note
							})]
						}), /* @__PURE__ */ jsx("p", {
							className: "text-xs leading-relaxed text-foreground/75",
							children: p.example
						})]
					}, p.name))
				}),
				/* @__PURE__ */ jsx("p", {
					className: "mt-2 text-xs text-muted-foreground",
					children: "São exemplos populares, não obrigatórios. A escolha depende de formato, volume e qualidade de layout exigida."
				})
			] })]
		})
	] });
}
function StepChunking() {
	const { docs, chunkSize, setChunkSize, overlap, setOverlap, devMode } = useLab();
	const [docId, setDocId] = useState(docs[0]?.id ?? "");
	const doc = docs.find((d) => d.id === docId) ?? docs[0];
	const chunks = useMemo(() => doc ? chunkDocument(doc, chunkSize, overlap) : [], [
		doc,
		chunkSize,
		overlap
	]);
	const totalTokens = doc ? countTokens(doc.text) : 0;
	if (!doc) return /* @__PURE__ */ jsx(Panel, { children: "Adicione um documento na etapa 1." });
	return /* @__PURE__ */ jsxs("div", {
		className: "space-y-5",
		children: [/* @__PURE__ */ jsxs(Panel, { children: [
			/* @__PURE__ */ jsx(SectionTitle, {
				kicker: "etapa 03",
				title: "Chunking",
				description: "Mude os controles e veja o corte acontecer na hora. Chunk pequeno = precisão e mais ruído de fronteira. Chunk grande = mais contexto e mais desperdício de tokens."
			}),
			/* @__PURE__ */ jsx("div", {
				className: "mb-4 flex flex-wrap gap-2",
				children: docs.map((d) => /* @__PURE__ */ jsx("button", {
					onClick: () => setDocId(d.id),
					className: cn("rounded-md border px-2.5 py-1.5 font-mono text-[11px] transition-colors", d.id === doc.id ? "border-[var(--rag)] bg-[var(--rag)]/10 text-[var(--rag)]" : "border-border text-muted-foreground hover:text-foreground"),
					children: d.name
				}, d.id))
			}),
			/* @__PURE__ */ jsxs("div", {
				className: "mb-5 grid gap-4 sm:grid-cols-2",
				children: [/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("p", {
					className: "label-mono mb-2",
					children: "Chunk size (tokens)"
				}), /* @__PURE__ */ jsx("div", {
					className: "flex flex-wrap gap-1.5",
					children: [
						100,
						200,
						300,
						500,
						1e3
					].map((v) => /* @__PURE__ */ jsx(ControlChip, {
						active: chunkSize === v,
						onClick: () => setChunkSize(v),
						children: v
					}, v))
				})] }), /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("p", {
					className: "label-mono mb-2",
					children: "Overlap (tokens)"
				}), /* @__PURE__ */ jsx("div", {
					className: "flex flex-wrap gap-1.5",
					children: [
						0,
						20,
						50,
						100
					].map((v) => /* @__PURE__ */ jsx(ControlChip, {
						active: overlap === v,
						onClick: () => setOverlap(v),
						children: v
					}, v))
				})] })]
			}),
			/* @__PURE__ */ jsxs("div", {
				className: "mb-5 grid gap-3 sm:grid-cols-4",
				children: [
					/* @__PURE__ */ jsx(Stat, {
						label: "Documento",
						value: 1
					}),
					/* @__PURE__ */ jsx(Stat, {
						label: "Chunks gerados",
						value: chunks.length,
						tone: "rag"
					}),
					/* @__PURE__ */ jsx(Stat, {
						label: "Chunk size",
						value: chunkSize
					}),
					/* @__PURE__ */ jsx(Stat, {
						label: "Overlap",
						value: overlap,
						tone: "warn"
					})
				]
			}),
			/* @__PURE__ */ jsx(ChunkRibbon, {
				chunks,
				totalTokens,
				chunkSize,
				overlap
			}),
			/* @__PURE__ */ jsxs("div", {
				className: "mt-5 grid gap-3 lg:grid-cols-3",
				children: [
					/* @__PURE__ */ jsxs("div", {
						className: "rounded-md border border-border bg-[var(--surface)]/70 p-3",
						children: [/* @__PURE__ */ jsx("p", {
							className: "label-mono mb-1",
							children: "1. documento longo"
						}), /* @__PURE__ */ jsx("p", {
							className: "text-xs text-muted-foreground",
							children: "O texto inteiro é grande demais para buscar e enviar ao LLM como uma peça única."
						})]
					}),
					/* @__PURE__ */ jsxs("div", {
						className: "rounded-md border border-[var(--rag)]/35 bg-[var(--rag)]/6 p-3",
						children: [/* @__PURE__ */ jsx("p", {
							className: "label-mono mb-1",
							children: "2. janela deslizante"
						}), /* @__PURE__ */ jsx("p", {
							className: "text-xs text-muted-foreground",
							children: "Chunk size define o tamanho da janela. Overlap define quanto ela volta antes de gerar o próximo chunk."
						})]
					}),
					/* @__PURE__ */ jsxs("div", {
						className: "rounded-md border border-[var(--warn)]/35 bg-[var(--warn)]/6 p-3",
						children: [/* @__PURE__ */ jsx("p", {
							className: "label-mono mb-1",
							children: "3. repetição útil"
						}), /* @__PURE__ */ jsx("p", {
							className: "text-xs text-muted-foreground",
							children: "Com overlap, uma frase perto da borda aparece em dois chunks e tem mais chance de ser recuperada."
						})]
					})
				]
			}),
			/* @__PURE__ */ jsxs("div", {
				className: "mt-3 rounded-md border border-[var(--warn)]/35 bg-[var(--warn)]/6 p-3",
				children: [/* @__PURE__ */ jsx("p", {
					className: "label-mono mb-2 text-[var(--warn)]",
					children: "como pensar sobre overlap"
				}), /* @__PURE__ */ jsxs("div", {
					className: "grid gap-2 text-xs leading-relaxed text-muted-foreground md:grid-cols-2",
					children: [
						/* @__PURE__ */ jsxs("p", { children: [/* @__PURE__ */ jsx("strong", {
							className: "text-foreground",
							children: "Sem overlap:"
						}), " mais barato, menos duplicação, mas pode cortar uma ideia no meio."] }),
						/* @__PURE__ */ jsxs("p", { children: [/* @__PURE__ */ jsx("strong", {
							className: "text-foreground",
							children: "Com overlap:"
						}), " mais caro e gera vetores duplicados, mas reduz perda de contexto nas bordas."] }),
						/* @__PURE__ */ jsxs("p", { children: [/* @__PURE__ */ jsx("strong", {
							className: "text-foreground",
							children: "Regra prática:"
						}), " overlap bom costuma ser pequeno, tipo 10% a 20% do chunk size."] }),
						/* @__PURE__ */ jsxs("p", { children: [/* @__PURE__ */ jsx("strong", {
							className: "text-foreground",
							children: "Cuidado:"
						}), " overlap alto demais indexa muita repetição e pode poluir a busca."] })
					]
				})]
			})
		] }), /* @__PURE__ */ jsxs(Panel, { children: [
			/* @__PURE__ */ jsx("p", {
				className: "label-mono mb-3",
				children: "chunks gerados"
			}),
			/* @__PURE__ */ jsx("div", {
				className: "grid gap-3 lg:grid-cols-2",
				children: chunks.map((c, i) => /* @__PURE__ */ jsx(ChunkCard, {
					chunk: c,
					index: i,
					dev: devMode
				}, c.id))
			}),
			/* @__PURE__ */ jsx(SimNote, { children: "A contagem de tokens usa a heurística de ~4 caracteres por token. Tokenizers reais (BPE) variam por modelo e idioma." })
		] })]
	});
}
function ControlChip({ active, onClick, children }) {
	return /* @__PURE__ */ jsx("button", {
		onClick,
		className: cn("rounded-md border px-3 py-1.5 font-mono text-xs transition-colors", active ? "border-[var(--rag)] bg-[var(--rag)]/12 text-[var(--rag)]" : "border-border text-muted-foreground hover:text-foreground"),
		children
	});
}
function StepEmbeddings() {
	const [text, setText] = useState("Funcionários têm direito a férias");
	return /* @__PURE__ */ jsxs("div", {
		className: "space-y-5",
		children: [/* @__PURE__ */ jsxs(Panel, { children: [/* @__PURE__ */ jsx(SectionTitle, {
			kicker: "etapa 04",
			title: "Embeddings",
			description: "Um modelo de embedding converte texto em um vetor de números. Textos com significado próximo produzem vetores próximos — é isso que torna a busca semântica possível."
		}), /* @__PURE__ */ jsxs("div", {
			className: "grid items-center gap-3 lg:grid-cols-[1fr_auto_1fr]",
			children: [
				/* @__PURE__ */ jsxs("div", { children: [
					/* @__PURE__ */ jsx("p", {
						className: "label-mono mb-2",
						children: "texto"
					}),
					/* @__PURE__ */ jsx(Textarea, {
						value: text,
						onChange: (e) => setText(e.target.value),
						className: "min-h-20 text-sm"
					}),
					/* @__PURE__ */ jsx("div", {
						className: "mt-2 flex flex-wrap gap-2",
						children: [
							"trabalho remoto",
							"home-office",
							"férias anuais",
							"bloqueio de senha"
						].map((example) => /* @__PURE__ */ jsx("button", {
							onClick: () => setText(example),
							className: "rounded-full border border-border px-2.5 py-1 text-[11px] text-muted-foreground transition-colors hover:border-[var(--accent)]/45 hover:text-foreground",
							children: example
						}, example))
					})
				] }),
				/* @__PURE__ */ jsxs("div", {
					className: "flex flex-col items-center gap-1",
					children: [/* @__PURE__ */ jsx("div", {
						className: "rounded-md border border-[var(--accent)]/45 bg-[var(--accent)]/10 px-3 py-2 font-mono text-[10px] tracking-wider text-[var(--accent)] uppercase",
						children: "embedding model"
					}), /* @__PURE__ */ jsx(PipelineEdge, { active: true })]
				}),
				/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("p", {
					className: "label-mono mb-2",
					children: "vetor (dimensões iniciais)"
				}), /* @__PURE__ */ jsx(EmbeddingViewer, { text })] })
			]
		})] }), /* @__PURE__ */ jsxs(Panel, { children: [/* @__PURE__ */ jsx(SectionTitle, {
			kicker: "espaço vetorial",
			title: "Visualização 2D de embeddings",
			description: "Clique nos pontos. Conceitos do mesmo grupo semântico ficam próximos, mesmo sem compartilhar palavras."
		}), /* @__PURE__ */ jsx(VectorSpace, {})] })]
	});
}
function StepVectorDb() {
	const { chunks, scaleMode } = useLab();
	return /* @__PURE__ */ jsxs("div", {
		className: "space-y-5",
		children: [/* @__PURE__ */ jsxs(Panel, { children: [/* @__PURE__ */ jsx(SectionTitle, {
			kicker: "etapa 05",
			title: "Vector Database",
			description: "Cada chunk vira um registro: id, texto, embedding e metadata. O banco é otimizado para responder 'quais vetores são mais parecidos com este?'."
		}), /* @__PURE__ */ jsx(VectorDatabaseViewer, {
			chunks,
			...scaleMode ? { totalVectors: SCALE.chunks } : {}
		})] }), /* @__PURE__ */ jsxs(Panel, { children: [/* @__PURE__ */ jsx(SectionTitle, {
			kicker: "comparativo",
			title: "Onde guardar os vetores",
			description: "Não existe escolha universal — existe a escolha adequada ao volume, à operação e ao stack que você já tem."
		}), /* @__PURE__ */ jsx(VectorDbComparison, {})] })]
	});
}
function StepQuestion() {
	const { question, setQuestion } = useLab();
	return /* @__PURE__ */ jsxs(Panel, { children: [
		/* @__PURE__ */ jsx(SectionTitle, {
			kicker: "etapa 06",
			title: "Faça uma pergunta sobre os documentos",
			description: "A pergunta é o ponto de entrada do pipeline de retrieval. Ela será convertida no mesmo espaço vetorial dos chunks."
		}),
		/* @__PURE__ */ jsx(Textarea, {
			value: question,
			onChange: (e) => setQuestion(e.target.value),
			className: "min-h-28 text-base",
			placeholder: "Faça uma pergunta sobre os documentos"
		}),
		/* @__PURE__ */ jsx("div", {
			className: "mt-3 flex flex-wrap gap-2",
			children: [
				"Quantos dias de férias um funcionário possui?",
				"Quantos dias por semana posso trabalhar remotamente?",
				"O que acontece após cinco tentativas de senha incorretas?",
				"Qual o limite de diária de hotel em viagem?"
			].map((s) => /* @__PURE__ */ jsx("button", {
				onClick: () => setQuestion(s),
				className: "rounded-full border border-border px-3 py-1 text-[11.5px] text-muted-foreground transition-colors hover:border-[var(--rag)]/45 hover:text-foreground",
				children: s
			}, s))
		}),
		/* @__PURE__ */ jsxs("p", {
			className: "mt-4 flex items-center gap-2 font-mono text-xs text-muted-foreground",
			children: [/* @__PURE__ */ jsx(Search, { className: "size-3.5" }), " avance para executar a busca etapa por etapa"]
		})
	] });
}
function StepQueryEmbedding() {
	const { question, chunks, scaleMode } = useLab();
	const queryVector = useMemo(() => fakeEmbedding(question, 8), [question]);
	const nearest = useMemo(() => chunks.map((chunk) => ({
		chunk,
		score: cosine(fakeEmbedding(question), chunk.embedding)
	})).sort((a, b) => b.score - a.score).slice(0, 3), [question, chunks]);
	return /* @__PURE__ */ jsxs("div", {
		className: "space-y-5",
		children: [
			/* @__PURE__ */ jsxs(Panel, { children: [/* @__PURE__ */ jsx(SectionTitle, {
				kicker: "etapa 07",
				title: "Embedding da pergunta",
				description: "A pergunta também vira vetor. Assim ela pode ser comparada com os vetores dos chunks, número contra número, no mesmo espaço semântico."
			}), /* @__PURE__ */ jsxs("div", {
				className: "grid gap-3 lg:grid-cols-[1fr_auto_1fr]",
				children: [
					/* @__PURE__ */ jsxs("div", {
						className: "rounded-lg border border-border bg-[var(--surface)]/70 p-4",
						children: [
							/* @__PURE__ */ jsx("p", {
								className: "label-mono mb-1.5",
								children: "pergunta"
							}),
							/* @__PURE__ */ jsxs("p", {
								className: "text-sm",
								children: [
									"“",
									question,
									"”"
								]
							}),
							/* @__PURE__ */ jsx("p", {
								className: "mt-3 text-xs text-muted-foreground",
								children: "Texto humano: bom para leitura, ruim para cálculo direto de similaridade."
							})
						]
					}),
					/* @__PURE__ */ jsxs("div", {
						className: "flex flex-col items-center justify-center",
						children: [/* @__PURE__ */ jsx("span", {
							className: "rounded-md border border-[var(--accent)]/45 bg-[var(--accent)]/10 px-3 py-2 font-mono text-[10px] tracking-wider text-[var(--accent)] uppercase",
							children: "embedding model"
						}), /* @__PURE__ */ jsx(PipelineEdge, { active: true })]
					}),
					/* @__PURE__ */ jsxs("div", {
						className: "rounded-lg border border-[var(--rag)]/40 bg-[var(--rag)]/6 p-4",
						children: [
							/* @__PURE__ */ jsx("p", {
								className: "label-mono mb-1.5",
								children: "query vector"
							}),
							/* @__PURE__ */ jsxs("p", {
								className: "break-all font-mono text-[11.5px] text-[var(--rag)]",
								children: [
									"[",
									queryVector.map((v) => v.toFixed(3)).join(", "),
									", …]"
								]
							}),
							/* @__PURE__ */ jsx("p", {
								className: "mt-3 text-xs text-muted-foreground",
								children: "Vetor da pergunta: bom para comparar com os vetores salvos no Vector DB."
							})
						]
					})
				]
			})] }),
			/* @__PURE__ */ jsxs(Panel, { children: [
				/* @__PURE__ */ jsx(SectionTitle, {
					kicker: "comparação",
					title: "O que acontece depois?",
					description: "O banco compara o vetor da pergunta com cada vetor de chunk. Os mais próximos sobem para o topo."
				}),
				/* @__PURE__ */ jsx("div", {
					className: "grid gap-3 lg:grid-cols-3",
					children: nearest.map(({ chunk, score }, index) => /* @__PURE__ */ jsxs("div", {
						className: "rounded-md border border-border bg-[var(--surface)]/70 p-3",
						children: [/* @__PURE__ */ jsxs("div", {
							className: "mb-2 flex items-center justify-between gap-2",
							children: [/* @__PURE__ */ jsxs("span", {
								className: "font-mono text-[11px] text-muted-foreground",
								children: [
									"#",
									index + 1,
									" ",
									chunk.id
								]
							}), /* @__PURE__ */ jsxs("span", {
								className: "font-mono text-xs text-[var(--signal)]",
								children: ["cos ", score.toFixed(2)]
							})]
						}), /* @__PURE__ */ jsx("p", {
							className: "line-clamp-4 text-xs leading-relaxed text-foreground/80",
							children: chunk.text
						})]
					}, chunk.id))
				}),
				/* @__PURE__ */ jsx(SimNote, { children: "Nesta demo os números são simulados. Em produção, eles viriam de um modelo de embedding real; o conceito é o mesmo: pergunta e chunks viram vetores comparáveis." })
			] }),
			/* @__PURE__ */ jsxs(Panel, { children: [/* @__PURE__ */ jsx("p", {
				className: "label-mono mb-3",
				children: "o query vector entra no vector database"
			}), /* @__PURE__ */ jsxs("div", {
				className: "flex flex-col items-center gap-0",
				children: [
					/* @__PURE__ */ jsx(PipelineNode, {
						label: "query vector",
						value: "1536 dims",
						icon: Sparkles,
						active: true
					}),
					/* @__PURE__ */ jsx(PipelineEdge, { active: true }),
					/* @__PURE__ */ jsx(PipelineNode, {
						label: "Qdrant · company_docs",
						value: `${formatNumber(scaleMode ? SCALE.chunks : chunks.length)} vetores indexados`,
						icon: Database,
						active: true
					}),
					/* @__PURE__ */ jsx(PipelineEdge, { active: true }),
					/* @__PURE__ */ jsx(PipelineNode, {
						label: "ANN search (HNSW · cosine)",
						value: "candidatos mais próximos",
						icon: Search,
						active: true
					})
				]
			})] })
		]
	});
}
function StepSimilarity() {
	const { question, chunks, topK, setTopK, devMode } = useLab();
	const results = useMemo(() => search(question, chunks, topK), [
		question,
		chunks,
		topK
	]);
	return /* @__PURE__ */ jsxs("div", {
		className: "space-y-5",
		children: [/* @__PURE__ */ jsxs(Panel, { children: [
			/* @__PURE__ */ jsx(SectionTitle, {
				kicker: "etapa 08",
				title: "Similaridade vetorial",
				description: "Cosine similarity compara a direção dos vetores. Perto de 1 = mesmo significado; perto de 0 = assuntos diferentes.",
				right: /* @__PURE__ */ jsxs("div", {
					className: "flex items-center gap-2",
					children: [/* @__PURE__ */ jsx("span", {
						className: "label-mono",
						children: "Top K"
					}), [
						3,
						5,
						10,
						20
					].map((k) => /* @__PURE__ */ jsx(ControlChip, {
						active: topK === k,
						onClick: () => setTopK(k),
						children: k
					}, k))]
				})
			}),
			/* @__PURE__ */ jsx("div", {
				className: "grid gap-3 lg:grid-cols-2",
				children: results.map((r, i) => /* @__PURE__ */ jsx(SimilarityResult, {
					chunk: r,
					rank: i + 1,
					dev: devMode
				}, r.id))
			}),
			/* @__PURE__ */ jsx(SimNote, { children: "Os scores vêm de uma função local determinística que combina proximidade vetorial simulada e sobreposição lexical, para que o comportamento seja didático e reproduzível." })
		] }), /* @__PURE__ */ jsxs(Panel, { children: [/* @__PURE__ */ jsx("p", {
			className: "label-mono mb-2",
			children: "como ler o score"
		}), /* @__PURE__ */ jsx("div", {
			className: "space-y-2 font-mono text-xs",
			children: [
				{
					r: "0.90 – 1.00",
					d: "praticamente o mesmo assunto",
					c: "var(--signal)"
				},
				{
					r: "0.70 – 0.89",
					d: "relacionado, provavelmente útil",
					c: "var(--rag)"
				},
				{
					r: "0.40 – 0.69",
					d: "tangencial, risco de ruído",
					c: "var(--warn)"
				},
				{
					r: "0.00 – 0.39",
					d: "outro assunto",
					c: "var(--chart-5)"
				}
			].map((x) => /* @__PURE__ */ jsxs("div", {
				className: "flex items-center gap-3",
				children: [/* @__PURE__ */ jsx("span", {
					className: "w-24",
					style: { color: x.c },
					children: x.r
				}), /* @__PURE__ */ jsx("span", {
					className: "text-muted-foreground",
					children: x.d
				})]
			}, x.r))
		})] })]
	});
}
function StepRetrieval() {
	const { question, chunks, filteredChunks, filters, setFilters, devMode, scaleMode } = useLab();
	const results = useMemo(() => search(question, filteredChunks, 20), [question, filteredChunks]);
	const ratio = chunks.length ? filteredChunks.length / chunks.length : 0;
	const universe = scaleMode ? SCALE.chunks : chunks.length;
	const candidates = Math.max(1, Math.round(universe * ratio));
	return /* @__PURE__ */ jsxs("div", {
		className: "space-y-5",
		children: [/* @__PURE__ */ jsxs(Panel, { children: [
			/* @__PURE__ */ jsx(SectionTitle, {
				kicker: "etapa 09",
				title: "Metadata filter + Retrieval",
				description: "Filtrar por metadata antes da busca vetorial reduz o universo pesquisado — mais rápido, mais barato e mais preciso."
			}),
			/* @__PURE__ */ jsx(MetadataFilter, {
				filters,
				onChange: setFilters
			}),
			/* @__PURE__ */ jsxs("div", {
				className: "mt-5 grid gap-5 lg:grid-cols-[1fr_1.2fr]",
				children: [/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsxs("p", {
					className: "label-mono mb-3 flex items-center gap-2",
					children: [/* @__PURE__ */ jsx(Filter, { className: "size-3.5" }), " funil de redução"]
				}), /* @__PURE__ */ jsx(FunnelBar, { rows: [
					{
						label: "Chunks indexados",
						value: universe
					},
					{
						label: "Após metadata filter",
						value: candidates,
						caption: "candidatos elegíveis"
					},
					{
						label: "Vector search · Top 20",
						value: Math.min(20, results.length)
					}
				] })] }), /* @__PURE__ */ jsxs("div", {
					className: "grid gap-3 sm:grid-cols-3",
					children: [
						/* @__PURE__ */ jsx(Stat, {
							label: "Chunks totais",
							value: formatNumber(universe)
						}),
						/* @__PURE__ */ jsx(Stat, {
							label: "Candidatos",
							value: formatNumber(candidates),
							tone: "warn"
						}),
						/* @__PURE__ */ jsx(Stat, {
							label: "Retornados",
							value: results.length,
							tone: "rag"
						})
					]
				})]
			})
		] }), /* @__PURE__ */ jsxs(Panel, { children: [/* @__PURE__ */ jsx("p", {
			className: "label-mono mb-3",
			children: "top 20 resultados do retriever"
		}), /* @__PURE__ */ jsxs("div", {
			className: "grid gap-3 lg:grid-cols-2",
			children: [results.map((r, i) => /* @__PURE__ */ jsx(SimilarityResult, {
				chunk: r,
				rank: i + 1,
				dev: devMode
			}, r.id)), !results.length && /* @__PURE__ */ jsx("p", {
				className: "text-sm text-muted-foreground",
				children: "Nenhum chunk passou pelos filtros. Afrouxe o metadata filter."
			})]
		})] })]
	});
}
function StepReranking() {
	const { question, filteredChunks, devMode } = useLab();
	const [applied, setApplied] = useState(false);
	const candidates = useMemo(() => search(question, filteredChunks, 20), [question, filteredChunks]);
	const reranked = useMemo(() => rerank(question, candidates, 5), [question, candidates]);
	return /* @__PURE__ */ jsxs(Panel, { children: [
		/* @__PURE__ */ jsx(SectionTitle, {
			kicker: "etapa 10",
			title: "Reranking",
			description: "A busca vetorial encontra candidatos rapidamente. O reranker faz uma avaliação mais precisa da relevância — e é caro, por isso só roda sobre os candidatos.",
			right: /* @__PURE__ */ jsxs(Button, {
				onClick: () => setApplied((a) => !a),
				variant: applied ? "outline" : "default",
				children: [
					/* @__PURE__ */ jsx(Zap, { className: "size-4" }),
					" ",
					applied ? "Ver antes do reranker" : "Aplicar reranker"
				]
			})
		}),
		/* @__PURE__ */ jsxs("div", {
			className: "mb-4 flex items-center gap-3 font-mono text-[11px] text-muted-foreground",
			children: [
				/* @__PURE__ */ jsxs("span", { children: ["VECTOR SEARCH · Top ", candidates.length] }),
				/* @__PURE__ */ jsx(ChevronRight, { className: "size-3.5" }),
				/* @__PURE__ */ jsx("span", {
					className: applied ? "text-[var(--accent)]" : "",
					children: "RERANKER (cross-encoder)"
				}),
				/* @__PURE__ */ jsx(ChevronRight, { className: "size-3.5" }),
				/* @__PURE__ */ jsx("span", {
					className: applied ? "text-[var(--signal)]" : "",
					children: "Top 5"
				})
			]
		}),
		/* @__PURE__ */ jsxs("div", {
			className: "grid gap-5 lg:grid-cols-2",
			children: [/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("p", {
				className: "label-mono mb-2",
				children: "antes · score vetorial"
			}), /* @__PURE__ */ jsx("div", {
				className: "space-y-3",
				children: candidates.slice(0, 5).map((c, i) => /* @__PURE__ */ jsx(SimilarityResult, {
					chunk: c,
					rank: i + 1,
					dev: devMode
				}, c.id))
			})] }), /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("p", {
				className: "label-mono mb-2",
				children: "depois · relevance score"
			}), /* @__PURE__ */ jsx("div", {
				className: "space-y-3",
				children: applied ? reranked.map((c, i) => /* @__PURE__ */ jsx(SimilarityResult, {
					chunk: c,
					rank: i + 1,
					dev: devMode,
					showRerank: true,
					movement: (c.previousRank ?? i + 1) - (i + 1)
				}, c.id)) : /* @__PURE__ */ jsx("p", {
					className: "rounded-md border border-dashed border-border p-6 text-center text-sm text-muted-foreground",
					children: "Clique em “Aplicar reranker” para ver os cards mudarem de posição."
				})
			})] })]
		}),
		/* @__PURE__ */ jsx(SimNote, { children: "O reranker aqui é uma função local que privilegia cobertura de termos da pergunta. Em produção seria um cross-encoder (ex.: bge-reranker, Cohere Rerank)." })
	] });
}
function StepContext() {
	const { question, filteredChunks } = useLab();
	const top = useMemo(() => rerank(question, search(question, filteredChunks, 20), 5), [question, filteredChunks]);
	return /* @__PURE__ */ jsxs(Panel, { children: [/* @__PURE__ */ jsx(SectionTitle, {
		kicker: "etapa 11",
		title: "Context window",
		description: "Este é exatamente o texto que sai da sua aplicação e chega ao modelo. Nada além disso."
	}), /* @__PURE__ */ jsx(ContextViewer, {
		question,
		chunks: top
	})] });
}
function StepLlm() {
	const { question, filteredChunks, chunks, devMode, scaleMode } = useLab();
	const top = useMemo(() => rerank(question, search(question, filteredChunks, 20), 5), [question, filteredChunks]);
	const answer = simulateAnswer(question, top);
	const lat = simulatedLatency(question);
	const universe = scaleMode ? SCALE.chunks : chunks.length;
	return /* @__PURE__ */ jsxs("div", {
		className: "space-y-5",
		children: [
			/* @__PURE__ */ jsxs(Panel, { children: [/* @__PURE__ */ jsx(SectionTitle, {
				kicker: "etapa 12",
				title: "LLM",
				description: "O modelo recebe contexto + pergunta e escreve a resposta. Ele não pesquisa nada por conta própria."
			}), /* @__PURE__ */ jsxs("div", {
				className: "grid items-center gap-3 lg:grid-cols-[1fr_auto_1fr]",
				children: [
					/* @__PURE__ */ jsxs("div", {
						className: "space-y-2",
						children: [/* @__PURE__ */ jsx(PipelineNode, {
							label: "context",
							value: `${top.length} chunks selecionados`,
							icon: Layers,
							done: true
						}), /* @__PURE__ */ jsx(PipelineNode, {
							label: "question",
							value: question,
							icon: Search,
							done: true
						})]
					}),
					/* @__PURE__ */ jsxs("div", {
						className: "flex flex-col items-center",
						children: [/* @__PURE__ */ jsxs("div", {
							className: "rounded-lg border border-[var(--accent)]/45 bg-[var(--accent)]/10 px-4 py-3 text-center",
							children: [
								/* @__PURE__ */ jsx(Bot, { className: "mx-auto mb-1 size-5 text-[var(--accent)]" }),
								/* @__PURE__ */ jsx("p", {
									className: "font-mono text-[11px] tracking-wider text-[var(--accent)] uppercase",
									children: "llm"
								}),
								/* @__PURE__ */ jsx("p", {
									className: "mt-1 font-mono text-[10px] text-muted-foreground",
									children: "GPT · Claude · Gemini · Llama · Qwen"
								})
							]
						}), /* @__PURE__ */ jsx(PipelineEdge, { active: true })]
					}),
					/* @__PURE__ */ jsxs("div", {
						className: "rounded-lg border border-[var(--signal)]/40 bg-[var(--signal)]/6 p-4",
						children: [/* @__PURE__ */ jsx("p", {
							className: "label-mono mb-1.5",
							children: "answer"
						}), /* @__PURE__ */ jsx("p", {
							className: "text-sm leading-relaxed whitespace-pre-line",
							children: answer
						})]
					})
				]
			})] }),
			/* @__PURE__ */ jsxs(Panel, {
				className: "border-[var(--warn)]/40",
				children: [/* @__PURE__ */ jsxs("h3", {
					className: "mb-2 text-base font-semibold text-[var(--warn)]",
					children: [
						"O LLM não leu ",
						formatNumber(universe),
						" chunks."
					]
				}), /* @__PURE__ */ jsxs("p", {
					className: "text-sm leading-relaxed text-muted-foreground",
					children: [
						"Ele recebeu apenas os ",
						top.length,
						" trechos selecionados pelo pipeline de retrieval. Toda a engenharia de chunking, embeddings, filtros e reranking existe para decidir o que merece ocupar espaço na context window. A qualidade da resposta é limitada pela qualidade dessa seleção — não pela inteligência do modelo."
					]
				})]
			}),
			devMode ? /* @__PURE__ */ jsxs(Panel, { children: [
				/* @__PURE__ */ jsx("p", {
					className: "label-mono mb-3",
					children: "developer mode · métricas simuladas"
				}),
				/* @__PURE__ */ jsxs("div", {
					className: "grid gap-3 sm:grid-cols-5",
					children: [
						/* @__PURE__ */ jsx(Stat, {
							label: "Query embedding",
							value: `${lat.embedding} ms`
						}),
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
							value: `${(lat.llm / 1e3).toFixed(2)} s`,
							tone: "warn"
						}),
						/* @__PURE__ */ jsx(Stat, {
							label: "Total",
							value: `${(lat.total / 1e3).toFixed(2)} s`,
							tone: "signal"
						})
					]
				}),
				/* @__PURE__ */ jsx(JsonBlock, {
					className: "mt-3",
					data: {
						top_k: 20,
						rerank_top_n: 5,
						embedding_dims: 1536,
						distance: "cosine",
						context_tokens: top.reduce((a, c) => a + c.tokens, 0),
						chunk_ids: top.map((c) => c.id)
					}
				}),
				/* @__PURE__ */ jsx(SimNote, { children: "Latências geradas de forma determinística a partir da pergunta." })
			] }) : null
		]
	});
}
function StepFullPipeline() {
	const { chunks, scaleMode, question } = useLab();
	const universe = scaleMode ? SCALE.chunks : chunks.length;
	const [selected, setSelected] = useState(0);
	const nodes = [
		{
			label: "Documentos",
			value: formatNumber(scaleMode ? SCALE.documents : chunks.length && new Set(chunks.map((c) => c.docId)).size),
			icon: FileText,
			detail: "Fontes brutas em PDF, DOCX, HTML, bancos de dados. Nada disso é consultável semanticamente ainda."
		},
		{
			label: "Parsing",
			value: "texto limpo",
			icon: Layers,
			detail: "Extrai texto legível preservando estrutura relevante (títulos, tabelas, ordem de leitura)."
		},
		{
			label: "Chunks",
			value: formatNumber(universe),
			icon: Layers,
			detail: "Unidades de recuperação. Tamanho e overlap definem precisão e custo."
		},
		{
			label: "Embeddings",
			value: `${formatNumber(universe)} vetores`,
			icon: Sparkles,
			detail: "Cada chunk vira um vetor de 1536 dimensões no mesmo espaço semântico."
		},
		{
			label: "Vector DB",
			value: "Qdrant · cosine · HNSW",
			icon: Database,
			detail: "Índice aproximado que responde em milissegundos mesmo com milhões de vetores."
		},
		{
			label: "Pergunta → query embedding",
			value: question,
			icon: Search,
			detail: "A pergunta entra no mesmo espaço vetorial para poder ser comparada."
		},
		{
			label: "Metadata filter",
			value: "reduz o universo",
			icon: Filter,
			detail: "Filtros estruturados (departamento, ano, permissão) cortam candidatos antes da comparação vetorial."
		},
		{
			label: "Vector search · Top 20",
			value: "recall",
			icon: Search,
			detail: "Rápido e amplo: prioriza não perder o chunk certo."
		},
		{
			label: "Reranker · Top 5",
			value: "precision",
			icon: Zap,
			detail: "Caro e preciso: reordena os finalistas lendo pergunta e chunk juntos."
		},
		{
			label: "Context",
			value: "system + chunks + pergunta",
			icon: Layers,
			detail: "O payload final, contado em tokens e limitado pela context window."
		},
		{
			label: "LLM",
			value: "gera a resposta",
			icon: Bot,
			detail: "Só enxerga o contexto entregue. Sem pipeline, não há conhecimento."
		},
		{
			label: "Resposta",
			value: "com fontes citadas",
			icon: Bot,
			detail: "Idealmente rastreável até documento e página — auditabilidade é requisito corporativo."
		}
	];
	return /* @__PURE__ */ jsxs("div", {
		className: "grid gap-5 lg:grid-cols-[1fr_1fr]",
		children: [/* @__PURE__ */ jsxs(Panel, { children: [/* @__PURE__ */ jsx(SectionTitle, {
			kicker: "etapa 13",
			title: "Pipeline RAG completo",
			description: "Clique em qualquer etapa para abrir os detalhes."
		}), /* @__PURE__ */ jsx(PipelineFlow, {
			steps: nodes.map((n) => ({
				label: n.label,
				value: n.value,
				icon: n.icon
			})),
			activeIndex: selected,
			onSelect: setSelected
		})] }), /* @__PURE__ */ jsxs("div", {
			className: "space-y-5",
			children: [/* @__PURE__ */ jsxs(Panel, {
				className: "glow-rag",
				children: [
					/* @__PURE__ */ jsx("p", {
						className: "label-mono mb-1",
						children: "detalhe da etapa"
					}),
					/* @__PURE__ */ jsx("h3", {
						className: "mb-2 text-lg font-semibold",
						children: nodes[selected]?.label
					}),
					/* @__PURE__ */ jsx("p", {
						className: "text-sm leading-relaxed text-muted-foreground",
						children: nodes[selected]?.detail
					})
				]
			}), /* @__PURE__ */ jsxs(Panel, { children: [/* @__PURE__ */ jsx("p", {
				className: "label-mono mb-3",
				children: "a grande redução"
			}), /* @__PURE__ */ jsx(FunnelBar, { rows: [
				{
					label: "Vetores no índice",
					value: universe
				},
				{
					label: "Após metadata filtering",
					value: Math.max(1, Math.round(universe * .1))
				},
				{
					label: "Vector similarity",
					value: 20
				},
				{
					label: "Reranking",
					value: 5
				},
				{
					label: "Enviado ao LLM",
					value: 5
				}
			] })] })]
		})]
	});
}
//#endregion
export { RagLab as component };
