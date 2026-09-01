import { Link } from "@tanstack/react-router";
import { Boxes } from "lucide-react";
import type { ReactNode } from "react";

const NAV = [
  { to: "/", label: "Home" },
  { to: "/rag", label: "RAG Lab" },
  { to: "/agents", label: "Agent Lab" },
  { to: "/playground", label: "Playground" },
  { to: "/architecture", label: "Arquitetura" },
  { to: "/glossary", label: "Glossário" },
] as const;

export function AppShell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center gap-4 px-4 py-3">
          <Link to="/" className="flex shrink-0 items-center gap-2">
            <Boxes className="size-5 text-[var(--rag)]" />
            <span className="font-mono text-sm font-semibold tracking-tight">
              AI<span className="text-[var(--rag)]">·</span>LAB
            </span>
          </Link>
          <nav className="-mx-1 flex flex-1 gap-1 overflow-x-auto px-1">
            {NAV.map((n) => (
              <Link
                key={n.to}
                to={n.to}
                activeOptions={{ exact: n.to === "/" }}
                activeProps={{
                  className:
                    "text-foreground border-[var(--rag)]/50 bg-[var(--rag)]/10",
                }}
                inactiveProps={{ className: "text-muted-foreground border-transparent" }}
                className="shrink-0 rounded-md border px-2.5 py-1.5 font-mono text-[11px] tracking-wide uppercase transition-colors hover:text-foreground"
              >
                {n.label}
              </Link>
            ))}
          </nav>
        </div>
      </header>
      <main className="mx-auto max-w-7xl px-4 py-8 sm:py-10">{children}</main>
      <footer className="border-t border-border py-6">
        <p className="mx-auto max-w-7xl px-4 font-mono text-[11px] text-muted-foreground">
          AI Lab — laboratório educacional. Todos os embeddings, scores e latências são simulados
          localmente. Nenhuma API externa é chamada.
        </p>
      </footer>
    </div>
  );
}
