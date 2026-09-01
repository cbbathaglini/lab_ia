import { CONTEXT_WINDOW, countTokens, formatNumber } from "@/lib/lab/engine";
import type { ScoredChunk } from "@/lib/lab/types";
import { buildContext } from "@/lib/lab/engine";
import { Stat } from "./primitives";

export function ContextViewer({
  question,
  chunks,
}: {
  question: string;
  chunks: ScoredChunk[];
}) {
  const { system, context } = buildContext(question, chunks);
  const sysTokens = countTokens(system);
  const ctxTokens = countTokens(context);
  const qTokens = countTokens(question);
  const total = sysTokens + ctxTokens + qTokens;
  const pct = (total / CONTEXT_WINDOW) * 100;

  return (
    <div className="space-y-4">
      <div className="overflow-hidden rounded-lg border border-border bg-[oklch(0.13_0.014_264)]">
        <div className="flex items-center gap-2 border-b border-border bg-[var(--surface)] px-3 py-2">
          <span className="size-2.5 rounded-full bg-[var(--chart-5)]" />
          <span className="size-2.5 rounded-full bg-[var(--warn)]" />
          <span className="size-2.5 rounded-full bg-[var(--signal)]" />
          <span className="ml-2 font-mono text-[11px] text-muted-foreground">
            payload enviado ao LLM
          </span>
        </div>
        <pre className="max-h-96 overflow-auto p-4 font-mono text-[11.5px] leading-relaxed whitespace-pre-wrap">
          <span className="text-[var(--agent)]">SYSTEM:</span>
          {"\n"}
          <span className="text-foreground/80">{system}</span>
          {"\n\n"}
          <span className="text-[var(--rag)]">CONTEXT:</span>
          {"\n"}
          <span className="text-foreground/80">{context || "(vazio)"}</span>
          {"\n\n"}
          <span className="text-[var(--warn)]">QUESTION:</span>
          {"\n"}
          <span className="text-foreground/80">{question}</span>
        </pre>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <Stat label="System prompt" value={`${formatNumber(sysTokens)} tok`} />
        <Stat label="Context" value={`${formatNumber(ctxTokens)} tok`} tone="rag" />
        <Stat label="Question" value={`${formatNumber(qTokens)} tok`} />
        <Stat label="Total" value={`${formatNumber(total)} tok`} tone="signal" />
      </div>

      <div>
        <div className="mb-1.5 flex justify-between font-mono text-[11px] text-muted-foreground">
          <span>uso da context window</span>
          <span>
            {formatNumber(total)} / {formatNumber(CONTEXT_WINDOW)} tokens ({pct.toFixed(2)}%)
          </span>
        </div>
        <div className="h-3 w-full overflow-hidden rounded-sm border border-border bg-[var(--surface-2)]">
          <div
            className="h-full bg-[var(--rag)] transition-all duration-700"
            style={{ width: `${Math.max(0.6, Math.min(100, pct))}%` }}
          />
        </div>
        <p className="mt-2 text-xs text-muted-foreground">
          Mesmo com 128.000 tokens disponíveis, enviar tudo seria caro e pioraria a qualidade. O
          pipeline existe justamente para caber pouco e certo.
        </p>
      </div>
    </div>
  );
}
