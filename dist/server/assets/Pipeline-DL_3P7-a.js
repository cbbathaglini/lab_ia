import { a as cn } from "./tooltip-B16Z84u2.js";
import { jsx, jsxs } from "react/jsx-runtime";
import { ChevronDown } from "lucide-react";
//#region src/components/lab/Pipeline.tsx
function PipelineNode({ label, value, icon: Icon, tone = "rag", active = false, done = false, onClick, compact = false }) {
	const color = tone === "agent" ? "var(--agent)" : tone === "neutral" ? "var(--muted-foreground)" : "var(--rag)";
	return /* @__PURE__ */ jsx(onClick ? "button" : "div", {
		onClick,
		className: cn("group relative w-full rounded-lg border bg-[var(--surface)]/80 px-3 text-left transition-all duration-300", compact ? "py-2" : "py-3", active ? "scale-[1.015]" : "hover:border-[color-mix(in_oklab,var(--rag)_45%,transparent)]", onClick && "cursor-pointer"),
		style: {
			borderColor: active || done ? color : "var(--border)",
			boxShadow: active ? `0 0 26px -8px ${color}, inset 0 0 0 1px ${color}` : void 0
		},
		children: /* @__PURE__ */ jsxs("div", {
			className: "flex items-center gap-2.5",
			children: [Icon ? /* @__PURE__ */ jsx(Icon, {
				className: cn("size-4 shrink-0", active && "animate-pulse-soft"),
				style: { color: active || done ? color : "var(--muted-foreground)" }
			}) : null, /* @__PURE__ */ jsxs("div", {
				className: "min-w-0 flex-1",
				children: [/* @__PURE__ */ jsx("p", {
					className: "truncate font-mono text-[11px] uppercase tracking-[0.12em] text-muted-foreground",
					children: label
				}), value ? /* @__PURE__ */ jsx("p", {
					className: "truncate text-sm font-medium",
					children: value
				}) : null]
			})]
		})
	});
}
function PipelineEdge({ active = false, tone = "rag", label }) {
	const color = tone === "agent" ? "var(--agent)" : "var(--rag)";
	return /* @__PURE__ */ jsxs("div", {
		className: "relative flex h-8 flex-col items-center justify-center",
		children: [
			/* @__PURE__ */ jsx("div", {
				className: "h-full w-px",
				style: {
					backgroundImage: `linear-gradient(to bottom, ${active ? color : "var(--border)"} 55%, transparent 0%)`,
					backgroundSize: "1px 8px",
					backgroundRepeat: "repeat-y"
				}
			}),
			active ? /* @__PURE__ */ jsx("span", {
				className: "animate-travel-y absolute top-0 size-1.5 rounded-full",
				style: {
					backgroundColor: color,
					boxShadow: `0 0 10px ${color}`
				}
			}) : null,
			label ? /* @__PURE__ */ jsx("span", {
				className: "absolute left-1/2 ml-3 font-mono text-[10px] text-muted-foreground",
				children: label
			}) : /* @__PURE__ */ jsx(ChevronDown, {
				className: "absolute -bottom-1 size-3",
				style: { color: active ? color : "var(--border)" }
			})
		]
	});
}
function PipelineFlow({ steps, tone = "rag", activeIndex = -1, onSelect }) {
	return /* @__PURE__ */ jsx("div", {
		className: "flex flex-col",
		children: steps.map((s, i) => /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx(PipelineNode, {
			...s,
			tone,
			active: i === activeIndex,
			done: activeIndex > i,
			onClick: onSelect ? () => onSelect(i) : void 0
		}), i < steps.length - 1 ? /* @__PURE__ */ jsx(PipelineEdge, {
			tone,
			active: activeIndex >= i && activeIndex !== -1
		}) : null] }, s.label + i))
	});
}
function FunnelBar({ rows, tone = "rag" }) {
	const max = Math.max(...rows.map((r) => r.value), 1);
	const color = tone === "agent" ? "var(--agent)" : "var(--rag)";
	return /* @__PURE__ */ jsx("div", {
		className: "space-y-2.5",
		children: rows.map((r, i) => {
			const pct = Math.max(1.5, Math.log10(r.value + 1) / Math.log10(max + 1) * 100);
			return /* @__PURE__ */ jsxs("div", { children: [
				/* @__PURE__ */ jsxs("div", {
					className: "mb-1 flex items-baseline justify-between gap-2",
					children: [/* @__PURE__ */ jsx("span", {
						className: "label-mono",
						children: r.label
					}), /* @__PURE__ */ jsx("span", {
						className: "font-mono text-sm tabular-nums",
						style: { color },
						children: r.value.toLocaleString("pt-BR")
					})]
				}),
				/* @__PURE__ */ jsx("div", {
					className: "h-2.5 w-full overflow-hidden rounded-sm bg-[var(--surface-2)]",
					children: /* @__PURE__ */ jsx("div", {
						className: "h-full rounded-sm transition-all duration-700",
						style: {
							width: `${pct}%`,
							backgroundColor: color,
							opacity: 1 - i * .13
						}
					})
				}),
				r.caption ? /* @__PURE__ */ jsx("p", {
					className: "mt-1 text-[11px] text-muted-foreground",
					children: r.caption
				}) : null
			] }, r.label);
		})
	});
}
//#endregion
export { PipelineNode as i, PipelineEdge as n, PipelineFlow as r, FunnelBar as t };
