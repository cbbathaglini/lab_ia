import { useMemo, useState } from "react";
import { cosine, fakeEmbedding } from "@/lib/lab/engine";
import { EMBEDDING_POINTS, GROUP_COLORS } from "@/lib/lab/data";
import { SimNote } from "./primitives";

export function EmbeddingViewer({ text, dims = 12 }: { text: string; dims?: number }) {
  const vec = useMemo(() => fakeEmbedding(text, dims), [text, dims]);
  return (
    <div>
      <div className="grid grid-cols-3 gap-1.5 sm:grid-cols-4 lg:grid-cols-6">
        {vec.map((v, i) => (
          <div
            key={i}
            className="rounded-sm border border-border bg-[oklch(0.13_0.014_264)] px-2 py-1.5"
            style={{
              boxShadow: `inset ${Math.abs(v) * 60}px 0 0 -55px ${
                v >= 0 ? "var(--rag)" : "var(--chart-5)"
              }`,
            }}
          >
            <span className="block font-mono text-[9px] text-muted-foreground">d{i}</span>
            <span
              className="font-mono text-xs tabular-nums"
              style={{ color: v >= 0 ? "var(--rag)" : "var(--chart-5)" }}
            >
              {v >= 0 ? " " : ""}
              {v.toFixed(3)}
            </span>
          </div>
        ))}
        <div className="flex items-center justify-center rounded-sm border border-dashed border-border px-2 py-1.5 font-mono text-[10px] text-muted-foreground">
          … 1536d
        </div>
      </div>
      <SimNote>
        Estes números são gerados localmente por uma função determinística, apenas para
        visualização. Não são embeddings reais de um modelo.
      </SimNote>
    </div>
  );
}

export function VectorSpace() {
  const [selected, setSelected] = useState<number>(0);
  const anchor = EMBEDDING_POINTS[0]!;
  const point = EMBEDDING_POINTS[selected] ?? anchor;
  const sim = useMemo(() => {
    const raw = cosine(fakeEmbedding(anchor.text), fakeEmbedding(point.text));
    const dist = Math.hypot(point.x - anchor.x, point.y - anchor.y);
    return Number(Math.max(0.05, Math.min(0.99, (1 - dist) * 0.85 + (raw + 1) * 0.07)).toFixed(2));
  }, [anchor, point]);

  return (
    <div className="grid gap-4 lg:grid-cols-[1.4fr_1fr]">
      <div className="relative aspect-4/3 w-full rounded-lg border border-border bg-[oklch(0.14_0.014_264)]">
        <svg viewBox="0 0 100 100" className="absolute inset-0 size-full">
          {[20, 40, 60, 80].map((g) => (
            <g key={g}>
              <line x1={g} y1="0" x2={g} y2="100" stroke="var(--grid)" strokeWidth="0.3" />
              <line x1="0" y1={g} x2="100" y2={g} stroke="var(--grid)" strokeWidth="0.3" />
            </g>
          ))}
          {EMBEDDING_POINTS.map((p, i) =>
            i === selected ? null : (
              <line
                key={`l${i}`}
                x1={point.x * 100}
                y1={(1 - point.y) * 100}
                x2={p.x * 100}
                y2={(1 - p.y) * 100}
                stroke={p.group === point.group ? GROUP_COLORS[p.group] : "var(--border)"}
                strokeWidth={p.group === point.group ? 0.5 : 0.2}
                strokeDasharray="2 2"
                opacity={p.group === point.group ? 0.7 : 0.3}
              />
            ),
          )}
          {EMBEDDING_POINTS.map((p, i) => (
            <g key={p.text} onClick={() => setSelected(i)} className="cursor-pointer">
              <circle
                cx={p.x * 100}
                cy={(1 - p.y) * 100}
                r={i === selected ? 3 : 2}
                fill={GROUP_COLORS[p.group]}
                opacity={i === selected ? 1 : 0.8}
              />
              {i === selected ? (
                <circle
                  cx={p.x * 100}
                  cy={(1 - p.y) * 100}
                  r="5.5"
                  fill="none"
                  stroke={GROUP_COLORS[p.group]}
                  strokeWidth="0.5"
                  className="animate-pulse-soft"
                />
              ) : null}
              <text
                x={p.x * 100 + 4}
                y={(1 - p.y) * 100 + 1.5}
                fontSize="2.6"
                fill="var(--muted-foreground)"
                className="font-mono"
              >
                {p.text}
              </text>
            </g>
          ))}
        </svg>
      </div>
      <div className="space-y-3">
        <div className="flex flex-wrap gap-2">
          {Object.entries(GROUP_COLORS).map(([g, c]) => (
            <span
              key={g}
              className="inline-flex items-center gap-1.5 rounded-full border border-border px-2 py-0.5 text-[11px]"
            >
              <span className="size-2 rounded-full" style={{ backgroundColor: c }} />
              {g}
            </span>
          ))}
        </div>
        <div className="rounded-md border border-border bg-[var(--surface)] p-3">
          <p className="label-mono">Ponto selecionado</p>
          <p className="mb-2 text-sm font-medium">“{point.text}”</p>
          <p className="label-mono">Embedding fictício</p>
          <p className="mb-2 break-all font-mono text-[11px] text-[var(--rag)]">
            [{fakeEmbedding(point.text, 6).map((v) => v.toFixed(3)).join(", ")}, …]
          </p>
          <p className="label-mono">Similaridade com “{anchor.text}”</p>
          <p className="font-mono text-2xl font-semibold text-[var(--signal)]">{sim.toFixed(2)}</p>
        </div>
        <p className="text-xs leading-relaxed text-muted-foreground">
          Embeddings reais possuem centenas ou milhares de dimensões. Aqui reduzimos para 2
          dimensões apenas para visualização — é o que ferramentas como t-SNE e UMAP fazem.
        </p>
      </div>
    </div>
  );
}
