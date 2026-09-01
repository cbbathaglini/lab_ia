import { cn } from "@/lib/utils";
import type { Chunk } from "@/lib/lab/types";

const CHUNK_COLORS = [
  "var(--chart-1)",
  "var(--chart-2)",
  "var(--chart-3)",
  "var(--chart-4)",
  "var(--chart-5)",
];

export function chunkColor(i: number) {
  return CHUNK_COLORS[i % CHUNK_COLORS.length] as string;
}

export function ChunkCard({
  chunk,
  index,
  dev,
  className,
}: {
  chunk: Chunk;
  index: number;
  dev?: boolean;
  className?: string;
}) {
  const color = chunkColor(index);
  return (
    <div
      className={cn("rounded-md border bg-[var(--surface)]/70 p-3 transition-colors", className)}
      style={{ borderColor: `color-mix(in oklab, ${color} 45%, transparent)` }}
    >
      <div className="mb-1.5 flex items-center justify-between gap-2">
        <span className="font-mono text-[11px] font-semibold tracking-wider" style={{ color }}>
          CHUNK {String(index + 1).padStart(2, "0")}
        </span>
        <span className="font-mono text-[10px] text-muted-foreground">{chunk.tokens} tokens</span>
      </div>
      <p className="text-[13px] leading-relaxed text-foreground/85">{chunk.text}</p>
      {dev ? (
        <div className="mt-2 flex flex-wrap gap-x-3 gap-y-1 border-t border-border pt-2 font-mono text-[10px] text-muted-foreground">
          <span>chunk_id: {chunk.id}</span>
          <span>doc_id: {chunk.docId}</span>
          <span>overlap: {chunk.overlapTokens}t</span>
          <span>dims: 1536</span>
          <span>page: {chunk.metadata.pagina}</span>
        </div>
      ) : null}
    </div>
  );
}

/** Horizontal ribbon showing the document split into overlapping segments. */
export function ChunkRibbon({
  chunks,
  totalTokens,
  chunkSize,
  overlap,
}: {
  chunks: Chunk[];
  totalTokens: number;
  chunkSize: number;
  overlap: number;
}) {
  const step = Math.max(1, chunkSize - overlap);
  return (
    <div className="space-y-3">
      <div>
        <p className="label-mono mb-1.5">Documento · {totalTokens} tokens</p>
        <div className="h-4 w-full rounded-sm bg-gradient-to-r from-[var(--surface-2)] to-[var(--muted)]" />
      </div>
      <div>
        <p className="label-mono mb-1.5">Chunks · cada linha é uma janela sobre o mesmo documento</p>
        <div className="relative space-y-2 rounded-md border border-border bg-[var(--surface)]/50 p-3">
          <div className="absolute top-0 bottom-0 border-l border-dashed border-[var(--warn)]/70" style={{ left: `${Math.min(95, Math.max(5, ((chunkSize - overlap) / Math.max(totalTokens, 1)) * 100))}%` }} />
          {chunks.map((c, i) => {
            const start = (i * step) / Math.max(totalTokens, 1);
            const width = Math.min(1 - start, chunkSize / Math.max(totalTokens, 1));
            return (
              <div key={c.id} className="relative h-8 w-full">
                <div
                  className="absolute top-1 h-5 rounded-sm transition-all duration-500"
                  style={{
                    left: `${start * 100}%`,
                    width: `${Math.max(4, width * 100)}%`,
                    backgroundColor: chunkColor(i),
                    opacity: 0.85,
                  }}
                />
                <span className="absolute top-1.5 font-mono text-[10px] font-semibold text-background" style={{ left: `${Math.min(96, start * 100 + 1)}%` }}>
                  C{i + 1}
                </span>
                {i > 0 && overlap > 0 ? (
                  <div
                    className="absolute top-0 h-7 rounded-sm border border-dashed"
                    style={{
                      left: `${start * 100}%`,
                      width: `${Math.max(3, (overlap / Math.max(totalTokens, 1)) * 100)}%`,
                      borderColor: "var(--warn)",
                      backgroundColor: "color-mix(in oklab, var(--warn) 25%, transparent)",
                    }}
                    title={`overlap de ${overlap} tokens`}
                  />
                ) : null}
              </div>
            );
          })}
        </div>
      </div>
      <p className="text-xs text-muted-foreground">
        Exemplo: com chunk size {chunkSize} e overlap {overlap}, o próximo chunk começa depois de
        {" "}<strong className="text-foreground">{step} tokens novos</strong>. A área âmbar é texto
        repetido de propósito, não erro nem duplicação acidental.
      </p>
    </div>
  );
}
