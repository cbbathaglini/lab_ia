import { useState } from "react";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import type { GlossaryEntry } from "@/lib/lab/data";

export function GlossaryCard({ entry }: { entry: GlossaryEntry }) {
  const [open, setOpen] = useState(false);
  return (
    <button
      type="button"
      onClick={() => setOpen((o) => !o)}
      className={cn(
        "w-full rounded-lg border bg-[var(--surface)]/70 p-4 text-left transition-all",
        open ? "border-[var(--rag)]/50 glow-rag" : "border-border hover:border-[var(--rag)]/35",
      )}
    >
      <div className="flex items-center gap-2">
        <ChevronRight
          className={cn(
            "size-4 text-[var(--rag)] transition-transform",
            open && "rotate-90",
          )}
        />
        <h3 className="font-mono text-sm font-semibold">{entry.term}</h3>
      </div>
      <p className="mt-1 pl-6 text-xs text-muted-foreground">{entry.short}</p>
      {open ? (
        <div className="mt-3 space-y-2 pl-6">
          <p className="text-[13px] leading-relaxed text-foreground/85">{entry.detail}</p>
          <p className="rounded-md border border-border bg-[oklch(0.13_0.014_264)] px-2.5 py-1.5 font-mono text-[11px] text-[var(--rag)]">
            {entry.example}
          </p>
        </div>
      ) : null}
    </button>
  );
}
