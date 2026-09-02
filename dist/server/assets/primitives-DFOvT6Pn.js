import { a as cn, i as TooltipTrigger, n as TooltipContent, t as Tooltip } from "./tooltip-B16Z84u2.js";
import { Link } from "@tanstack/react-router";
import { jsx, jsxs } from "react/jsx-runtime";
import { Boxes, Info } from "lucide-react";
//#region src/components/lab/AppShell.tsx
var NAV = [
	{
		to: "/",
		label: "Home"
	},
	{
		to: "/rag",
		label: "RAG Lab"
	},
	{
		to: "/agents",
		label: "Agent Lab"
	},
	{
		to: "/playground",
		label: "Playground"
	},
	{
		to: "/architecture",
		label: "Arquitetura"
	},
	{
		to: "/glossary",
		label: "Glossário"
	}
];
function AppShell({ children }) {
	return /* @__PURE__ */ jsxs("div", {
		className: "min-h-screen",
		children: [
			/* @__PURE__ */ jsx("header", {
				className: "sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-md",
				children: /* @__PURE__ */ jsxs("div", {
					className: "mx-auto flex max-w-7xl items-center gap-4 px-4 py-3",
					children: [/* @__PURE__ */ jsxs(Link, {
						to: "/",
						className: "flex shrink-0 items-center gap-2",
						children: [/* @__PURE__ */ jsx(Boxes, { className: "size-5 text-[var(--rag)]" }), /* @__PURE__ */ jsxs("span", {
							className: "font-mono text-sm font-semibold tracking-tight",
							children: [
								"AI",
								/* @__PURE__ */ jsx("span", {
									className: "text-[var(--rag)]",
									children: "·"
								}),
								"LAB"
							]
						})]
					}), /* @__PURE__ */ jsx("nav", {
						className: "-mx-1 flex flex-1 gap-1 overflow-x-auto px-1",
						children: NAV.map((n) => /* @__PURE__ */ jsx(Link, {
							to: n.to,
							activeOptions: { exact: n.to === "/" },
							activeProps: { className: "text-foreground border-[var(--rag)]/50 bg-[var(--rag)]/10" },
							inactiveProps: { className: "text-muted-foreground border-transparent" },
							className: "shrink-0 rounded-md border px-2.5 py-1.5 font-mono text-[11px] tracking-wide uppercase transition-colors hover:text-foreground",
							children: n.label
						}, n.to))
					})]
				})
			}),
			/* @__PURE__ */ jsx("main", {
				className: "mx-auto max-w-7xl px-4 py-8 sm:py-10",
				children
			}),
			/* @__PURE__ */ jsx("footer", {
				className: "border-t border-border py-6",
				children: /* @__PURE__ */ jsx("p", {
					className: "mx-auto max-w-7xl px-4 font-mono text-[11px] text-muted-foreground",
					children: "AI Lab — laboratório educacional. Todos os embeddings, scores e latências são simulados localmente. Nenhuma API externa é chamada."
				})
			})
		]
	});
}
//#endregion
//#region src/components/lab/primitives.tsx
function Panel({ children, className, ...rest }) {
	return /* @__PURE__ */ jsx("div", {
		className: cn("panel p-4 sm:p-5", className),
		...rest,
		children
	});
}
function SectionTitle({ kicker, title, description, right }) {
	return /* @__PURE__ */ jsxs("div", {
		className: "mb-5 flex flex-wrap items-end justify-between gap-3",
		children: [/* @__PURE__ */ jsxs("div", { children: [
			kicker ? /* @__PURE__ */ jsx("p", {
				className: "label-mono mb-1",
				children: kicker
			}) : null,
			/* @__PURE__ */ jsx("h2", {
				className: "text-xl font-semibold sm:text-2xl",
				children: title
			}),
			description ? /* @__PURE__ */ jsx("p", {
				className: "mt-1 max-w-2xl text-sm text-muted-foreground",
				children: description
			}) : null
		] }), right]
	});
}
function Stat({ label, value, hint, tone = "default" }) {
	const toneClass = {
		default: "text-foreground",
		rag: "text-[var(--rag)]",
		agent: "text-[var(--agent)]",
		signal: "text-[var(--signal)]",
		warn: "text-[var(--warn)]"
	}[tone];
	return /* @__PURE__ */ jsxs("div", {
		className: "rounded-md border border-border bg-[var(--surface-2)]/60 px-3 py-2.5",
		children: [
			/* @__PURE__ */ jsx("p", {
				className: "label-mono",
				children: label
			}),
			/* @__PURE__ */ jsx("p", {
				className: cn("font-mono text-lg font-semibold tabular-nums", toneClass),
				children: value
			}),
			hint ? /* @__PURE__ */ jsx("p", {
				className: "mt-0.5 text-xs text-muted-foreground",
				children: hint
			}) : null
		]
	});
}
function InfoTip({ text }) {
	return /* @__PURE__ */ jsxs(Tooltip, { children: [/* @__PURE__ */ jsx(TooltipTrigger, {
		asChild: true,
		children: /* @__PURE__ */ jsx("button", {
			type: "button",
			"aria-label": "Mais informações",
			className: "inline-flex size-5 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:text-foreground",
			children: /* @__PURE__ */ jsx(Info, { className: "size-3" })
		})
	}), /* @__PURE__ */ jsx(TooltipContent, {
		className: "max-w-xs text-xs leading-relaxed",
		children: text
	})] });
}
function SimNote({ children }) {
	return /* @__PURE__ */ jsxs("p", {
		className: "mt-3 rounded-md border border-dashed border-[var(--warn)]/40 bg-[var(--warn)]/8 px-3 py-2 font-mono text-[11px] leading-relaxed text-[var(--warn)]",
		children: ["SIMULADO · ", children]
	});
}
function JsonBlock({ data, className }) {
	return /* @__PURE__ */ jsx("pre", {
		className: cn("overflow-x-auto rounded-md border border-border bg-[oklch(0.13_0.014_264)] p-3 font-mono text-[11.5px] leading-relaxed text-[var(--rag)]", className),
		children: JSON.stringify(data, null, 2)
	});
}
function ScoreBar({ value, tone = "rag" }) {
	const color = tone === "rag" ? "var(--rag)" : tone === "agent" ? "var(--agent)" : "var(--signal)";
	return /* @__PURE__ */ jsx("div", {
		className: "h-1.5 w-full overflow-hidden rounded-full bg-[var(--surface-2)]",
		children: /* @__PURE__ */ jsx("div", {
			className: "h-full rounded-full transition-all duration-500",
			style: {
				width: `${Math.max(2, value * 100)}%`,
				backgroundColor: color
			}
		})
	});
}
//#endregion
export { SectionTitle as a, AppShell as c, ScoreBar as i, JsonBlock as n, SimNote as o, Panel as r, Stat as s, InfoTip as t };
