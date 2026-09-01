import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Check, RotateCcw, Search, X } from "lucide-react";
import { AppShell } from "@/components/lab/AppShell";
import { Panel, SectionTitle, Stat } from "@/components/lab/primitives";
import { GlossaryCard } from "@/components/lab/GlossaryCard";
import { GLOSSARY, QUIZ } from "@/lib/lab/data";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const TITLE = "Glossário e quiz de RAG e agentes | AI Lab";
const DESC =
  "Todos os termos do laboratório em linguagem simples — token, chunk, embedding, retrieval, reranking, tool, agent loop — mais um quiz para testar o entendimento.";

export const Route = createFileRoute("/glossary")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:type", content: "article" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: GlossaryPage,
});

function GlossaryPage() {
  const [q, setQ] = useState("");
  const [answers, setAnswers] = useState<Record<number, number>>({});

  const filtered = useMemo(() => {
    const t = q.trim().toLowerCase();
    if (!t) return GLOSSARY;
    return GLOSSARY.filter(
      (e) =>
        e.term.toLowerCase().includes(t) ||
        e.short.toLowerCase().includes(t) ||
        e.detail.toLowerCase().includes(t),
    );
  }, [q]);

  const answered = Object.keys(answers).length;
  const correct = QUIZ.filter((item, i) => answers[i] === item.answer).length;

  return (
    <AppShell>
      <div className="mb-6">
        <p className="label-mono mb-1">referência</p>
        <h1 className="text-2xl font-semibold sm:text-3xl">Glossário interativo</h1>
        <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
          Cada termo em uma frase, com detalhe e exemplo concreto. Clique para expandir.
        </p>
      </div>

      <Panel>
        <div className="relative mb-4">
          <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Buscar termo… (ex.: embedding, reranking, tool)"
            className="pl-9"
          />
        </div>
        <div className="grid gap-3 lg:grid-cols-2">
          {filtered.map((entry) => (
            <GlossaryCard key={entry.term} entry={entry} />
          ))}
        </div>
        {!filtered.length ? (
          <p className="py-8 text-center text-sm text-muted-foreground">
            Nenhum termo encontrado para “{q}”.
          </p>
        ) : null}
      </Panel>

      <Panel className="mt-5">
        <SectionTitle
          kicker="quiz"
          title="Teste seu entendimento"
          right={
            answered ? (
              <Button variant="outline" size="sm" onClick={() => setAnswers({})}>
                <RotateCcw className="size-3.5" /> Reiniciar
              </Button>
            ) : undefined
          }
        />
        <div className="mb-4 grid gap-3 sm:grid-cols-3">
          <Stat label="Respondidas" value={`${answered}/${QUIZ.length}`} />
          <Stat label="Corretas" value={correct} tone="signal" />
          <Stat
            label="Aproveitamento"
            value={answered ? `${Math.round((correct / answered) * 100)}%` : "—"}
            tone="rag"
          />
        </div>
        <div className="space-y-4">
          {QUIZ.map((item, i) => {
            const chosen = answers[i];
            const done = chosen !== undefined;
            return (
              <div key={item.question} className="rounded-lg border border-border p-4">
                <p className="mb-3 text-sm font-medium">
                  <span className="label-mono mr-2">{String(i + 1).padStart(2, "0")}</span>
                  {item.question}
                </p>
                <div className="grid gap-2 sm:grid-cols-2">
                  {item.options.map((opt, oi) => {
                    const isAnswer = oi === item.answer;
                    const isChosen = chosen === oi;
                    const state = !done
                      ? "border-border hover:border-[var(--rag)]/60"
                      : isAnswer
                        ? "border-[var(--signal)] bg-[var(--signal)]/10"
                        : isChosen
                          ? "border-destructive bg-destructive/10"
                          : "border-border opacity-55";
                    return (
                      <button
                        key={opt}
                        disabled={done}
                        onClick={() => setAnswers({ ...answers, [i]: oi })}
                        className={`flex items-center gap-2 rounded-md border px-3 py-2 text-left text-[13px] transition-colors ${state}`}
                      >
                        {done && isAnswer ? <Check className="size-3.5 text-[var(--signal)]" /> : null}
                        {done && isChosen && !isAnswer ? (
                          <X className="size-3.5 text-destructive" />
                        ) : null}
                        <span>{opt}</span>
                      </button>
                    );
                  })}
                </div>
                {done ? (
                  <p className="mt-3 rounded-md border border-border bg-[var(--surface)]/60 p-3 text-xs text-muted-foreground">
                    {item.explanation}
                  </p>
                ) : null}
              </div>
            );
          })}
        </div>
      </Panel>
    </AppShell>
  );
}
