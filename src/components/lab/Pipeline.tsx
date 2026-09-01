import type { LucideIcon } from "lucide-react";
import { ChevronDown } from "lucide-react";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export type NodeTone = "rag" | "agent" | "neutral";

export function PipelineNode({
  label,
  value,
  icon: Icon,
  tone = "rag",
  active = false,
  done = false,
  onClick,
  compact = false,
}: {
  label: string;
  value?: ReactNode;
  icon?: LucideIcon;
  tone?: NodeTone;
  active?: boolean;
  done?: boolean;
  onClick?: (() => void) | undefined;
  compact?: boolean | undefined;
}) {
  const color =
    tone === "agent" ? "var(--agent)" : tone === "neutral" ? "var(--muted-foreground)" : "var(--rag)";
  const Tag = onClick ? "button" : "div";
  return (
    <Tag
      onClick={onClick}
      className={cn(
        "group relative w-full rounded-lg border bg-[var(--surface)]/80 px-3 text-left transition-all duration-300",
        compact ? "py-2" : "py-3",
        active ? "scale-[1.015]" : "hover:border-[color-mix(in_oklab,var(--rag)_45%,transparent)]",
        onClick && "cursor-pointer",
      )}
      style={{
        borderColor: active || done ? color : "var(--border)",
        boxShadow: active ? `0 0 26px -8px ${color}, inset 0 0 0 1px ${color}` : undefined,
      }}
    >
      <div className="flex items-center gap-2.5">
        {Icon ? (
          <Icon
            className={cn("size-4 shrink-0", active && "animate-pulse-soft")}
            style={{ color: active || done ? color : "var(--muted-foreground)" }}
          />
        ) : null}
        <div className="min-w-0 flex-1">
          <p className="truncate font-mono text-[11px] uppercase tracking-[0.12em] text-muted-foreground">
            {label}
          </p>
          {value ? <p className="truncate text-sm font-medium">{value}</p> : null}
        </div>
      </div>
    </Tag>
  );
}

export function PipelineEdge({
  active = false,
  tone = "rag",
  label,
}: {
  active?: boolean;
  tone?: NodeTone;
  label?: string;
}) {
  const color = tone === "agent" ? "var(--agent)" : "var(--rag)";
  return (
    <div className="relative flex h-8 flex-col items-center justify-center">
      <div
        className="h-full w-px"
        style={{
          backgroundImage: `linear-gradient(to bottom, ${active ? color : "var(--border)"} 55%, transparent 0%)`,
          backgroundSize: "1px 8px",
          backgroundRepeat: "repeat-y",
        }}
      />
      {active ? (
        <span
          className="animate-travel-y absolute top-0 size-1.5 rounded-full"
          style={{ backgroundColor: color, boxShadow: `0 0 10px ${color}` }}
        />
      ) : null}
      {label ? (
        <span className="absolute left-1/2 ml-3 font-mono text-[10px] text-muted-foreground">
          {label}
        </span>
      ) : (
        <ChevronDown
          className="absolute -bottom-1 size-3"
          style={{ color: active ? color : "var(--border)" }}
        />
      )}
    </div>
  );
}

export function PipelineFlow({
  steps,
  tone = "rag",
  activeIndex = -1,
  onSelect,
}: {
  steps: { label: string; value?: ReactNode; icon?: LucideIcon }[];
  tone?: NodeTone;
  activeIndex?: number;
  onSelect?: (i: number) => void;
}) {
  return (
    <div className="flex flex-col">
      {steps.map((s, i) => (
        <div key={s.label + i}>
          <PipelineNode
            {...s}
            tone={tone}
            active={i === activeIndex}
            done={activeIndex > i}
            onClick={onSelect ? () => onSelect(i) : undefined}
          />
          {i < steps.length - 1 ? (
            <PipelineEdge tone={tone} active={activeIndex >= i && activeIndex !== -1} />
          ) : null}
        </div>
      ))}
    </div>
  );
}

export function FunnelBar({
  rows,
  tone = "rag",
}: {
  rows: { label: string; value: number; caption?: string }[];
  tone?: "rag" | "agent";
}) {
  const max = Math.max(...rows.map((r) => r.value), 1);
  const color = tone === "agent" ? "var(--agent)" : "var(--rag)";
  return (
    <div className="space-y-2.5">
      {rows.map((r, i) => {
        const pct = Math.max(1.5, (Math.log10(r.value + 1) / Math.log10(max + 1)) * 100);
        return (
          <div key={r.label}>
            <div className="mb-1 flex items-baseline justify-between gap-2">
              <span className="label-mono">{r.label}</span>
              <span className="font-mono text-sm tabular-nums" style={{ color }}>
                {r.value.toLocaleString("pt-BR")}
              </span>
            </div>
            <div className="h-2.5 w-full overflow-hidden rounded-sm bg-[var(--surface-2)]">
              <div
                className="h-full rounded-sm transition-all duration-700"
                style={{
                  width: `${pct}%`,
                  backgroundColor: color,
                  opacity: 1 - i * 0.13,
                }}
              />
            </div>
            {r.caption ? (
              <p className="mt-1 text-[11px] text-muted-foreground">{r.caption}</p>
            ) : null}
          </div>
        );
      })}
    </div>
  );
}
