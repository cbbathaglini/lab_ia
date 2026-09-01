import { Info } from "lucide-react";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

export function Panel({
  children,
  className,
  ...rest
}: { children: ReactNode; className?: string } & React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("panel p-4 sm:p-5", className)} {...rest}>
      {children}
    </div>
  );
}

export function SectionTitle({
  kicker,
  title,
  description,
  right,
}: {
  kicker?: string;
  title: string;
  description?: string;
  right?: ReactNode;
}) {
  return (
    <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
      <div>
        {kicker ? <p className="label-mono mb-1">{kicker}</p> : null}
        <h2 className="text-xl font-semibold sm:text-2xl">{title}</h2>
        {description ? (
          <p className="mt-1 max-w-2xl text-sm text-muted-foreground">{description}</p>
        ) : null}
      </div>
      {right}
    </div>
  );
}

export function Stat({
  label,
  value,
  hint,
  tone = "default",
}: {
  label: string;
  value: ReactNode;
  hint?: string;
  tone?: "default" | "rag" | "agent" | "signal" | "warn";
}) {
  const toneClass = {
    default: "text-foreground",
    rag: "text-[var(--rag)]",
    agent: "text-[var(--agent)]",
    signal: "text-[var(--signal)]",
    warn: "text-[var(--warn)]",
  }[tone];
  return (
    <div className="rounded-md border border-border bg-[var(--surface-2)]/60 px-3 py-2.5">
      <p className="label-mono">{label}</p>
      <p className={cn("font-mono text-lg font-semibold tabular-nums", toneClass)}>{value}</p>
      {hint ? <p className="mt-0.5 text-xs text-muted-foreground">{hint}</p> : null}
    </div>
  );
}

export function InfoTip({ text }: { text: string }) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <button
          type="button"
          aria-label="Mais informações"
          className="inline-flex size-5 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:text-foreground"
        >
          <Info className="size-3" />
        </button>
      </TooltipTrigger>
      <TooltipContent className="max-w-xs text-xs leading-relaxed">{text}</TooltipContent>
    </Tooltip>
  );
}

export function SimNote({ children }: { children: ReactNode }) {
  return (
    <p className="mt-3 rounded-md border border-dashed border-[var(--warn)]/40 bg-[var(--warn)]/8 px-3 py-2 font-mono text-[11px] leading-relaxed text-[var(--warn)]">
      SIMULADO · {children}
    </p>
  );
}

export function JsonBlock({ data, className }: { data: unknown; className?: string }) {
  return (
    <pre
      className={cn(
        "overflow-x-auto rounded-md border border-border bg-[oklch(0.13_0.014_264)] p-3 font-mono text-[11.5px] leading-relaxed text-[var(--rag)]",
        className,
      )}
    >
      {JSON.stringify(data, null, 2)}
    </pre>
  );
}

export function ScoreBar({ value, tone = "rag" }: { value: number; tone?: "rag" | "agent" | "signal" }) {
  const color = tone === "rag" ? "var(--rag)" : tone === "agent" ? "var(--agent)" : "var(--signal)";
  return (
    <div className="h-1.5 w-full overflow-hidden rounded-full bg-[var(--surface-2)]">
      <div
        className="h-full rounded-full transition-all duration-500"
        style={{ width: `${Math.max(2, value * 100)}%`, backgroundColor: color }}
      />
    </div>
  );
}
