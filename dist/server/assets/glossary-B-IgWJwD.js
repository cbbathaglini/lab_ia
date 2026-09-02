import { o as QUIZ, r as GLOSSARY } from "./data-CeF3osJN.js";
import { a as cn } from "./tooltip-B16Z84u2.js";
import { a as SectionTitle, c as AppShell, r as Panel, s as Stat } from "./primitives-DFOvT6Pn.js";
import { t as Button } from "./button-Cq5Yh-24.js";
import { t as Input } from "./input-D5z8RfPB.js";
import { useMemo, useState } from "react";
import { jsx, jsxs } from "react/jsx-runtime";
import { Check, ChevronRight, RotateCcw, Search, X } from "lucide-react";
//#region src/components/lab/GlossaryCard.tsx
function GlossaryCard({ entry }) {
	const [open, setOpen] = useState(false);
	return /* @__PURE__ */ jsxs("button", {
		type: "button",
		onClick: () => setOpen((o) => !o),
		className: cn("w-full rounded-lg border bg-[var(--surface)]/70 p-4 text-left transition-all", open ? "border-[var(--rag)]/50 glow-rag" : "border-border hover:border-[var(--rag)]/35"),
		children: [
			/* @__PURE__ */ jsxs("div", {
				className: "flex items-center gap-2",
				children: [/* @__PURE__ */ jsx(ChevronRight, { className: cn("size-4 text-[var(--rag)] transition-transform", open && "rotate-90") }), /* @__PURE__ */ jsx("h3", {
					className: "font-mono text-sm font-semibold",
					children: entry.term
				})]
			}),
			/* @__PURE__ */ jsx("p", {
				className: "mt-1 pl-6 text-xs text-muted-foreground",
				children: entry.short
			}),
			open ? /* @__PURE__ */ jsxs("div", {
				className: "mt-3 space-y-2 pl-6",
				children: [/* @__PURE__ */ jsx("p", {
					className: "text-[13px] leading-relaxed text-foreground/85",
					children: entry.detail
				}), /* @__PURE__ */ jsx("p", {
					className: "rounded-md border border-border bg-[oklch(0.13_0.014_264)] px-2.5 py-1.5 font-mono text-[11px] text-[var(--rag)]",
					children: entry.example
				})]
			}) : null
		]
	});
}
//#endregion
//#region src/routes/glossary.tsx?tsr-split=component
function GlossaryPage() {
	const [q, setQ] = useState("");
	const [answers, setAnswers] = useState({});
	const filtered = useMemo(() => {
		const t = q.trim().toLowerCase();
		if (!t) return GLOSSARY;
		return GLOSSARY.filter((e) => e.term.toLowerCase().includes(t) || e.short.toLowerCase().includes(t) || e.detail.toLowerCase().includes(t));
	}, [q]);
	const answered = Object.keys(answers).length;
	const correct = QUIZ.filter((item, i) => answers[i] === item.answer).length;
	return /* @__PURE__ */ jsxs(AppShell, { children: [
		/* @__PURE__ */ jsxs("div", {
			className: "mb-6",
			children: [
				/* @__PURE__ */ jsx("p", {
					className: "label-mono mb-1",
					children: "referência"
				}),
				/* @__PURE__ */ jsx("h1", {
					className: "text-2xl font-semibold sm:text-3xl",
					children: "Glossário interativo"
				}),
				/* @__PURE__ */ jsx("p", {
					className: "mt-2 max-w-2xl text-sm text-muted-foreground",
					children: "Cada termo em uma frase, com detalhe e exemplo concreto. Clique para expandir."
				})
			]
		}),
		/* @__PURE__ */ jsxs(Panel, { children: [
			/* @__PURE__ */ jsxs("div", {
				className: "relative mb-4",
				children: [/* @__PURE__ */ jsx(Search, { className: "pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" }), /* @__PURE__ */ jsx(Input, {
					value: q,
					onChange: (e) => setQ(e.target.value),
					placeholder: "Buscar termo… (ex.: embedding, reranking, tool)",
					className: "pl-9"
				})]
			}),
			/* @__PURE__ */ jsx("div", {
				className: "grid gap-3 lg:grid-cols-2",
				children: filtered.map((entry) => /* @__PURE__ */ jsx(GlossaryCard, { entry }, entry.term))
			}),
			!filtered.length ? /* @__PURE__ */ jsxs("p", {
				className: "py-8 text-center text-sm text-muted-foreground",
				children: [
					"Nenhum termo encontrado para “",
					q,
					"”."
				]
			}) : null
		] }),
		/* @__PURE__ */ jsxs(Panel, {
			className: "mt-5",
			children: [
				/* @__PURE__ */ jsx(SectionTitle, {
					kicker: "quiz",
					title: "Teste seu entendimento",
					right: answered ? /* @__PURE__ */ jsxs(Button, {
						variant: "outline",
						size: "sm",
						onClick: () => setAnswers({}),
						children: [/* @__PURE__ */ jsx(RotateCcw, { className: "size-3.5" }), " Reiniciar"]
					}) : void 0
				}),
				/* @__PURE__ */ jsxs("div", {
					className: "mb-4 grid gap-3 sm:grid-cols-3",
					children: [
						/* @__PURE__ */ jsx(Stat, {
							label: "Respondidas",
							value: `${answered}/${QUIZ.length}`
						}),
						/* @__PURE__ */ jsx(Stat, {
							label: "Corretas",
							value: correct,
							tone: "signal"
						}),
						/* @__PURE__ */ jsx(Stat, {
							label: "Aproveitamento",
							value: answered ? `${Math.round(correct / answered * 100)}%` : "—",
							tone: "rag"
						})
					]
				}),
				/* @__PURE__ */ jsx("div", {
					className: "space-y-4",
					children: QUIZ.map((item, i) => {
						const chosen = answers[i];
						const done = chosen !== void 0;
						return /* @__PURE__ */ jsxs("div", {
							className: "rounded-lg border border-border p-4",
							children: [
								/* @__PURE__ */ jsxs("p", {
									className: "mb-3 text-sm font-medium",
									children: [/* @__PURE__ */ jsx("span", {
										className: "label-mono mr-2",
										children: String(i + 1).padStart(2, "0")
									}), item.question]
								}),
								/* @__PURE__ */ jsx("div", {
									className: "grid gap-2 sm:grid-cols-2",
									children: item.options.map((opt, oi) => {
										const isAnswer = oi === item.answer;
										const isChosen = chosen === oi;
										return /* @__PURE__ */ jsxs("button", {
											disabled: done,
											onClick: () => setAnswers({
												...answers,
												[i]: oi
											}),
											className: `flex items-center gap-2 rounded-md border px-3 py-2 text-left text-[13px] transition-colors ${!done ? "border-border hover:border-[var(--rag)]/60" : isAnswer ? "border-[var(--signal)] bg-[var(--signal)]/10" : isChosen ? "border-destructive bg-destructive/10" : "border-border opacity-55"}`,
											children: [
												done && isAnswer ? /* @__PURE__ */ jsx(Check, { className: "size-3.5 text-[var(--signal)]" }) : null,
												done && isChosen && !isAnswer ? /* @__PURE__ */ jsx(X, { className: "size-3.5 text-destructive" }) : null,
												/* @__PURE__ */ jsx("span", { children: opt })
											]
										}, opt);
									})
								}),
								done ? /* @__PURE__ */ jsx("p", {
									className: "mt-3 rounded-md border border-border bg-[var(--surface)]/60 p-3 text-xs text-muted-foreground",
									children: item.explanation
								}) : null
							]
						}, item.question);
					})
				})
			]
		})
	] });
}
//#endregion
export { GlossaryPage as component };
