import { a as buildContext, f as formatNumber, l as countTokens, r as CONTEXT_WINDOW } from "./store-oMQJaQSS.js";
import { a as cn } from "./tooltip-B16Z84u2.js";
import { i as ScoreBar, s as Stat } from "./primitives-DFOvT6Pn.js";
import * as React from "react";
import { jsx, jsxs } from "react/jsx-runtime";
import { ArrowDown, ArrowUp, Minus } from "lucide-react";
//#region src/components/lab/ChunkViewer.tsx
var CHUNK_COLORS = [
	"var(--chart-1)",
	"var(--chart-2)",
	"var(--chart-3)",
	"var(--chart-4)",
	"var(--chart-5)"
];
function chunkColor(i) {
	return CHUNK_COLORS[i % CHUNK_COLORS.length];
}
function ChunkCard({ chunk, index, dev, className }) {
	const color = chunkColor(index);
	return /* @__PURE__ */ jsxs("div", {
		className: cn("rounded-md border bg-[var(--surface)]/70 p-3 transition-colors", className),
		style: { borderColor: `color-mix(in oklab, ${color} 45%, transparent)` },
		children: [
			/* @__PURE__ */ jsxs("div", {
				className: "mb-1.5 flex items-center justify-between gap-2",
				children: [/* @__PURE__ */ jsxs("span", {
					className: "font-mono text-[11px] font-semibold tracking-wider",
					style: { color },
					children: ["CHUNK ", String(index + 1).padStart(2, "0")]
				}), /* @__PURE__ */ jsxs("span", {
					className: "font-mono text-[10px] text-muted-foreground",
					children: [chunk.tokens, " tokens"]
				})]
			}),
			/* @__PURE__ */ jsx("p", {
				className: "text-[13px] leading-relaxed text-foreground/85",
				children: chunk.text
			}),
			dev ? /* @__PURE__ */ jsxs("div", {
				className: "mt-2 flex flex-wrap gap-x-3 gap-y-1 border-t border-border pt-2 font-mono text-[10px] text-muted-foreground",
				children: [
					/* @__PURE__ */ jsxs("span", { children: ["chunk_id: ", chunk.id] }),
					/* @__PURE__ */ jsxs("span", { children: ["doc_id: ", chunk.docId] }),
					/* @__PURE__ */ jsxs("span", { children: [
						"overlap: ",
						chunk.overlapTokens,
						"t"
					] }),
					/* @__PURE__ */ jsx("span", { children: "dims: 1536" }),
					/* @__PURE__ */ jsxs("span", { children: ["page: ", chunk.metadata.pagina] })
				]
			}) : null
		]
	});
}
/** Horizontal ribbon showing the document split into overlapping segments. */
function ChunkRibbon({ chunks, totalTokens, chunkSize, overlap }) {
	const step = Math.max(1, chunkSize - overlap);
	return /* @__PURE__ */ jsxs("div", {
		className: "space-y-3",
		children: [
			/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsxs("p", {
				className: "label-mono mb-1.5",
				children: [
					"Documento · ",
					totalTokens,
					" tokens"
				]
			}), /* @__PURE__ */ jsx("div", { className: "h-4 w-full rounded-sm bg-gradient-to-r from-[var(--surface-2)] to-[var(--muted)]" })] }),
			/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("p", {
				className: "label-mono mb-1.5",
				children: "Chunks · cada linha é uma janela sobre o mesmo documento"
			}), /* @__PURE__ */ jsxs("div", {
				className: "relative space-y-2 rounded-md border border-border bg-[var(--surface)]/50 p-3",
				children: [/* @__PURE__ */ jsx("div", {
					className: "absolute top-0 bottom-0 border-l border-dashed border-[var(--warn)]/70",
					style: { left: `${Math.min(95, Math.max(5, (chunkSize - overlap) / Math.max(totalTokens, 1) * 100))}%` }
				}), chunks.map((c, i) => {
					const start = i * step / Math.max(totalTokens, 1);
					const width = Math.min(1 - start, chunkSize / Math.max(totalTokens, 1));
					return /* @__PURE__ */ jsxs("div", {
						className: "relative h-8 w-full",
						children: [
							/* @__PURE__ */ jsx("div", {
								className: "absolute top-1 h-5 rounded-sm transition-all duration-500",
								style: {
									left: `${start * 100}%`,
									width: `${Math.max(4, width * 100)}%`,
									backgroundColor: chunkColor(i),
									opacity: .85
								}
							}),
							/* @__PURE__ */ jsxs("span", {
								className: "absolute top-1.5 font-mono text-[10px] font-semibold text-background",
								style: { left: `${Math.min(96, start * 100 + 1)}%` },
								children: ["C", i + 1]
							}),
							i > 0 && overlap > 0 ? /* @__PURE__ */ jsx("div", {
								className: "absolute top-0 h-7 rounded-sm border border-dashed",
								style: {
									left: `${start * 100}%`,
									width: `${Math.max(3, overlap / Math.max(totalTokens, 1) * 100)}%`,
									borderColor: "var(--warn)",
									backgroundColor: "color-mix(in oklab, var(--warn) 25%, transparent)"
								},
								title: `overlap de ${overlap} tokens`
							}) : null
						]
					}, c.id);
				})]
			})] }),
			/* @__PURE__ */ jsxs("p", {
				className: "text-xs text-muted-foreground",
				children: [
					"Exemplo: com chunk size ",
					chunkSize,
					" e overlap ",
					overlap,
					", o próximo chunk começa depois de",
					" ",
					/* @__PURE__ */ jsxs("strong", {
						className: "text-foreground",
						children: [step, " tokens novos"]
					}),
					". A área âmbar é texto repetido de propósito, não erro nem duplicação acidental."
				]
			})
		]
	});
}
//#endregion
//#region src/components/lab/SimilarityResult.tsx
function SimilarityResult({ chunk, rank, dev, showRerank, movement }) {
	const score = showRerank ? chunk.rerankScore ?? chunk.score : chunk.score;
	const tone = score > .75 ? "signal" : score > .5 ? "rag" : "agent";
	return /* @__PURE__ */ jsxs("div", {
		className: cn("rounded-md border bg-[var(--surface)]/70 p-3 transition-all duration-500", score > .75 ? "border-[var(--signal)]/40" : "border-border"),
		children: [
			/* @__PURE__ */ jsxs("div", {
				className: "mb-1.5 flex items-center gap-2",
				children: [
					/* @__PURE__ */ jsxs("span", {
						className: "font-mono text-[11px] font-semibold text-muted-foreground",
						children: ["#", rank]
					}),
					typeof movement === "number" && movement !== 0 ? /* @__PURE__ */ jsxs("span", {
						className: cn("inline-flex items-center gap-0.5 font-mono text-[10px]", movement > 0 ? "text-[var(--signal)]" : "text-[var(--chart-5)]"),
						children: [movement > 0 ? /* @__PURE__ */ jsx(ArrowUp, { className: "size-3" }) : /* @__PURE__ */ jsx(ArrowDown, { className: "size-3" }), Math.abs(movement)]
					}) : typeof movement === "number" ? /* @__PURE__ */ jsx(Minus, { className: "size-3 text-muted-foreground" }) : null,
					/* @__PURE__ */ jsx("span", {
						className: "ml-auto font-mono text-sm font-semibold tabular-nums",
						children: score.toFixed(2)
					})
				]
			}),
			/* @__PURE__ */ jsx(ScoreBar, {
				value: score,
				tone
			}),
			/* @__PURE__ */ jsx("p", {
				className: "mt-2 line-clamp-3 text-[13px] leading-relaxed text-foreground/85",
				children: chunk.text
			}),
			/* @__PURE__ */ jsxs("div", {
				className: "mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-[10px] text-muted-foreground",
				children: [
					/* @__PURE__ */ jsx("span", {
						className: "text-[var(--rag)]",
						children: chunk.docName
					}),
					/* @__PURE__ */ jsxs("span", { children: ["pág. ", chunk.metadata.pagina] }),
					/* @__PURE__ */ jsx("span", { children: chunk.metadata.departamento }),
					/* @__PURE__ */ jsx("span", { children: chunk.metadata.ano }),
					/* @__PURE__ */ jsx("span", { children: chunk.metadata.tipo })
				]
			}),
			dev ? /* @__PURE__ */ jsxs("div", {
				className: "mt-2 flex flex-wrap gap-x-3 gap-y-1 border-t border-border pt-2 font-mono text-[10px] text-muted-foreground",
				children: [
					/* @__PURE__ */ jsxs("span", { children: ["chunk_id: ", chunk.id] }),
					/* @__PURE__ */ jsxs("span", { children: ["tokens: ", chunk.tokens] }),
					/* @__PURE__ */ jsxs("span", { children: ["cosine: ", chunk.score.toFixed(3)] }),
					chunk.rerankScore !== void 0 ? /* @__PURE__ */ jsxs("span", { children: ["rerank: ", chunk.rerankScore.toFixed(3)] }) : null
				]
			}) : null
		]
	});
}
//#endregion
//#region src/components/lab/ContextViewer.tsx
function ContextViewer({ question, chunks }) {
	const { system, context } = buildContext(question, chunks);
	const sysTokens = countTokens(system);
	const ctxTokens = countTokens(context);
	const qTokens = countTokens(question);
	const total = sysTokens + ctxTokens + qTokens;
	const pct = total / CONTEXT_WINDOW * 100;
	return /* @__PURE__ */ jsxs("div", {
		className: "space-y-4",
		children: [
			/* @__PURE__ */ jsxs("div", {
				className: "overflow-hidden rounded-lg border border-border bg-[oklch(0.13_0.014_264)]",
				children: [/* @__PURE__ */ jsxs("div", {
					className: "flex items-center gap-2 border-b border-border bg-[var(--surface)] px-3 py-2",
					children: [
						/* @__PURE__ */ jsx("span", { className: "size-2.5 rounded-full bg-[var(--chart-5)]" }),
						/* @__PURE__ */ jsx("span", { className: "size-2.5 rounded-full bg-[var(--warn)]" }),
						/* @__PURE__ */ jsx("span", { className: "size-2.5 rounded-full bg-[var(--signal)]" }),
						/* @__PURE__ */ jsx("span", {
							className: "ml-2 font-mono text-[11px] text-muted-foreground",
							children: "payload enviado ao LLM"
						})
					]
				}), /* @__PURE__ */ jsxs("pre", {
					className: "max-h-96 overflow-auto p-4 font-mono text-[11.5px] leading-relaxed whitespace-pre-wrap",
					children: [
						/* @__PURE__ */ jsx("span", {
							className: "text-[var(--agent)]",
							children: "SYSTEM:"
						}),
						"\n",
						/* @__PURE__ */ jsx("span", {
							className: "text-foreground/80",
							children: system
						}),
						"\n\n",
						/* @__PURE__ */ jsx("span", {
							className: "text-[var(--rag)]",
							children: "CONTEXT:"
						}),
						"\n",
						/* @__PURE__ */ jsx("span", {
							className: "text-foreground/80",
							children: context || "(vazio)"
						}),
						"\n\n",
						/* @__PURE__ */ jsx("span", {
							className: "text-[var(--warn)]",
							children: "QUESTION:"
						}),
						"\n",
						/* @__PURE__ */ jsx("span", {
							className: "text-foreground/80",
							children: question
						})
					]
				})]
			}),
			/* @__PURE__ */ jsxs("div", {
				className: "grid gap-3 sm:grid-cols-2 lg:grid-cols-4",
				children: [
					/* @__PURE__ */ jsx(Stat, {
						label: "System prompt",
						value: `${formatNumber(sysTokens)} tok`
					}),
					/* @__PURE__ */ jsx(Stat, {
						label: "Context",
						value: `${formatNumber(ctxTokens)} tok`,
						tone: "rag"
					}),
					/* @__PURE__ */ jsx(Stat, {
						label: "Question",
						value: `${formatNumber(qTokens)} tok`
					}),
					/* @__PURE__ */ jsx(Stat, {
						label: "Total",
						value: `${formatNumber(total)} tok`,
						tone: "signal"
					})
				]
			}),
			/* @__PURE__ */ jsxs("div", { children: [
				/* @__PURE__ */ jsxs("div", {
					className: "mb-1.5 flex justify-between font-mono text-[11px] text-muted-foreground",
					children: [/* @__PURE__ */ jsx("span", { children: "uso da context window" }), /* @__PURE__ */ jsxs("span", { children: [
						formatNumber(total),
						" / ",
						formatNumber(CONTEXT_WINDOW),
						" tokens (",
						pct.toFixed(2),
						"%)"
					] })]
				}),
				/* @__PURE__ */ jsx("div", {
					className: "h-3 w-full overflow-hidden rounded-sm border border-border bg-[var(--surface-2)]",
					children: /* @__PURE__ */ jsx("div", {
						className: "h-full bg-[var(--rag)] transition-all duration-700",
						style: { width: `${Math.max(.6, Math.min(100, pct))}%` }
					})
				}),
				/* @__PURE__ */ jsx("p", {
					className: "mt-2 text-xs text-muted-foreground",
					children: "Mesmo com 128.000 tokens disponíveis, enviar tudo seria caro e pioraria a qualidade. O pipeline existe justamente para caber pouco e certo."
				})
			] })
		]
	});
}
//#endregion
//#region src/components/ui/textarea.tsx
var Textarea = React.forwardRef(({ className, ...props }, ref) => {
	return /* @__PURE__ */ jsx("textarea", {
		className: cn("flex min-h-[60px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-base shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm", className),
		ref,
		...props
	});
});
Textarea.displayName = "Textarea";
//#endregion
export { ChunkRibbon as a, ChunkCard as i, ContextViewer as n, SimilarityResult as r, Textarea as t };
