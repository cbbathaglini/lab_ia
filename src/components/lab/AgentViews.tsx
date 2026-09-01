import {
  Calendar,
  CloudSun,
  Hotel,
  Mail,
  Plane,
  BookOpen,
  Bot,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { AGENT_TOOLS, type AgentStep, type AgentTool } from "@/lib/lab/agent";
import { JsonBlock } from "./primitives";

export const TOOL_ICONS: Record<string, LucideIcon> = {
  calendar: Calendar,
  policy: BookOpen,
  flights: Plane,
  hotels: Hotel,
  weather: CloudSun,
  email: Mail,
};

export function ToolNode({
  tool,
  active,
  used,
  onClick,
}: {
  tool: AgentTool;
  active?: boolean;
  used?: boolean;
  onClick?: () => void;
}) {
  const Icon = TOOL_ICONS[tool.id] ?? Bot;
  const knowledge = tool.kind === "knowledge";
  const action = tool.kind === "action";
  const color = knowledge ? "var(--rag)" : action ? "var(--chart-5)" : "var(--agent)";
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "w-full rounded-lg border bg-[var(--surface)]/70 p-3 text-left transition-all duration-300",
        active && "scale-[1.02]",
      )}
      style={{
        borderColor: active || used ? color : "var(--border)",
        boxShadow: active ? `0 0 26px -8px ${color}` : undefined,
        opacity: used && !active ? 0.75 : 1,
      }}
    >
      <div className="flex items-center gap-2">
        <Icon className={cn("size-4", active && "animate-pulse-soft")} style={{ color }} />
        <span className="font-mono text-[11px] font-semibold tracking-wider" style={{ color }}>
          {tool.label}
        </span>
      </div>
      <p className="mt-1.5 text-[11.5px] leading-snug text-muted-foreground">{tool.description}</p>
    </button>
  );
}

export function ToolCallViewer({ step }: { step: AgentStep }) {
  return (
    <div className="grid gap-3 md:grid-cols-2">
      <div>
        <p className="label-mono mb-1.5">Tool call</p>
        {step.call ? (
          <JsonBlock data={step.call} />
        ) : (
          <p className="rounded-md border border-dashed border-border p-3 text-xs text-muted-foreground">
            Nenhuma tool chamada neste passo — apenas decisão interna.
          </p>
        )}
      </div>
      <div>
        <p className="label-mono mb-1.5">Observation (resultado observado)</p>
        <JsonBlock data={step.observation} className="text-[var(--signal)]" />
      </div>
    </div>
  );
}

export function AgentExecutionTimeline({
  steps,
  current,
  onSelect,
  dev,
}: {
  steps: AgentStep[];
  current: number;
  onSelect: (i: number) => void;
  dev?: boolean;
}) {
  return (
    <ol className="relative space-y-2 pl-6">
      <span className="absolute top-2 bottom-2 left-[7px] w-px bg-border" />
      {steps.map((s, i) => {
        const tool = AGENT_TOOLS.find((t) => t.id === s.toolId);
        const active = i === current;
        const done = i < current;
        return (
          <li key={s.n} className="relative">
            <span
              className={cn(
                "absolute top-3.5 -left-[19px] size-[9px] rounded-full border-2 transition-colors",
                active
                  ? "animate-pulse-soft border-[var(--agent)] bg-[var(--agent)]"
                  : done
                    ? "border-[var(--signal)] bg-[var(--signal)]"
                    : "border-border bg-background",
              )}
            />
            <button
              type="button"
              onClick={() => onSelect(i)}
              className={cn(
                "w-full rounded-md border p-3 text-left transition-colors",
                active
                  ? "border-[var(--agent)]/50 bg-[var(--agent)]/8"
                  : "border-border bg-[var(--surface)]/60 hover:border-[var(--agent)]/35",
              )}
            >
              <div className="flex flex-wrap items-center gap-2">
                <span className="font-mono text-[11px] font-semibold text-[var(--agent)]">
                  STEP {s.n}
                </span>
                {tool ? (
                  <span className="rounded-full border border-border px-2 py-0.5 font-mono text-[10px] text-muted-foreground">
                    {tool.name}
                  </span>
                ) : null}
                {dev ? (
                  <span className="ml-auto font-mono text-[10px] text-muted-foreground">
                    {s.latencyMs} ms (simulado)
                  </span>
                ) : null}
              </div>
              <p className="mt-1.5 text-[13px] leading-relaxed">
                <span className="label-mono mr-1.5">plano:</span>
                {s.plan}
              </p>
              {(active || done) && (
                <p className="mt-1 text-[12.5px] leading-relaxed text-muted-foreground">
                  <span className="label-mono mr-1.5">decisão:</span>
                  {s.decision}
                </p>
              )}
            </button>
          </li>
        );
      })}
    </ol>
  );
}
