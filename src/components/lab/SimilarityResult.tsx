import { ArrowDown, ArrowUp, Minus } from "lucide-react";
import { cn } from "@/lib/utils";
import type { ScoredChunk } from "@/lib/lab/types";
import { ScoreBar } from "./primitives";

export function SimilarityResult({
  chunk,
  rank,
  dev,
  showRerank,
  movement,
}: {
  chunk: ScoredChunk;
  rank: number;
  dev?: boolean;
  showRerank?: boolean;
  movement?: number;
}) {
  const score = showRerank ? (chunk.rerankScore ?? chunk.score) : chunk.score;
  const tone = score > 0.75 ? "signal" : score > 0.5 ? "rag" : "agent";
  return (
    <div
      className={cn(
        "rounded-md border bg-[var(--surface)]/70 p-3 transition-all duration-500",
        score > 0.75 ? "border-[var(--signal)]/40" : "border-border",
      )}
    >
      <div className="mb-1.5 flex items-center gap-2">
        <span className="font-mono text-[11px] font-semibold text-muted-foreground">
          #{rank}
        </span>
        {typeof movement === "number" && movement !== 0 ? (
          <span
            className={cn(
              "inline-flex items-center gap-0.5 font-mono text-[10px]",
              movement > 0 ? "text-[var(--signal)]" : "text-[var(--chart-5)]",
            )}
          >
            {movement > 0 ? <ArrowUp className="size-3" /> : <ArrowDown className="size-3" />}
            {Math.abs(movement)}
          </span>
        ) : typeof movement === "number" ? (
          <Minus className="size-3 text-muted-foreground" />
        ) : null}
        <span className="ml-auto font-mono text-sm font-semibold tabular-nums">
          {score.toFixed(2)}
        </span>
      </div>
      <ScoreBar value={score} tone={tone as "rag" | "signal" | "agent"} />
      <p className="mt-2 line-clamp-3 text-[13px] leading-relaxed text-foreground/85">
        {chunk.text}
      </p>
      <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-[10px] text-muted-foreground">
        <span className="text-[var(--rag)]">{chunk.docName}</span>
        <span>pág. {chunk.metadata.pagina}</span>
        <span>{chunk.metadata.departamento}</span>
        <span>{chunk.metadata.ano}</span>
        <span>{chunk.metadata.tipo}</span>
      </div>
      {dev ? (
        <div className="mt-2 flex flex-wrap gap-x-3 gap-y-1 border-t border-border pt-2 font-mono text-[10px] text-muted-foreground">
          <span>chunk_id: {chunk.id}</span>
          <span>tokens: {chunk.tokens}</span>
          <span>cosine: {chunk.score.toFixed(3)}</span>
          {chunk.rerankScore !== undefined ? (
            <span>rerank: {chunk.rerankScore.toFixed(3)}</span>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}
