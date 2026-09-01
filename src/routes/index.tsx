import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Boxes,
  Bot,
  Database,
  FileText,
  Layers,
  MessageSquare,
  Sparkles,
  Wrench,
} from "lucide-react";
import { AppShell } from "@/components/lab/AppShell";
import { PipelineFlow } from "@/components/lab/Pipeline";
import { Panel } from "@/components/lab/primitives";

const TITLE = "AI Lab — RAG & Agents Explorer";
const DESC =
  "Laboratório interativo para ver, por dentro, como funcionam chunks, embeddings, vector databases, retrieval, reranking, RAG e agentes de IA.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Home,
});

const RAG_STEPS = [
  { label: "Documentos", icon: FileText },
  { label: "Chunks", icon: Layers },
  { label: "Embeddings", icon: Sparkles },
  { label: "Vector Database", icon: Database },
  { label: "Retrieval", icon: Boxes },
  { label: "Reranking", icon: Layers },
  { label: "Contexto", icon: MessageSquare },
  { label: "LLM", icon: Bot },
  { label: "Resposta", icon: MessageSquare },
];

const AGENT_STEPS = [
  { label: "Objetivo", icon: Sparkles },
  { label: "Agente", icon: Bot },
  { label: "Planejamento", icon: Layers },
  { label: "Escolha de tool", icon: Wrench },
  { label: "Execução", icon: Boxes },
  { label: "Observação", icon: MessageSquare },
  { label: "Nova decisão", icon: Layers },
  { label: "Resultado", icon: Sparkles },
];

function Home() {
  return (
    <AppShell>
      <section className="mb-12">
        <p className="label-mono mb-3">laboratório interativo de arquitetura de IA</p>
        <h1 className="max-w-3xl text-3xl leading-tight font-semibold sm:text-5xl">
          Veja a inteligência artificial{" "}
          <span className="text-[var(--rag)]">funcionando por dentro</span>.
        </h1>
        <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
          Altere documentos, chunk size, overlap, Top K, filtros de metadata e perguntas — e observe
          cada etapa do pipeline mudar em tempo real. Nada aqui é apresentação estática: é
          simulação executável, rodando localmente no seu navegador.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            to="/rag"
            className="inline-flex items-center gap-2 rounded-md bg-[var(--rag)] px-4 py-2.5 text-sm font-semibold text-[var(--primary-foreground)] transition-opacity hover:opacity-90"
          >
            Explorar RAG <ArrowRight className="size-4" />
          </Link>
          <Link
            to="/agents"
            className="inline-flex items-center gap-2 rounded-md border border-[var(--agent)]/50 px-4 py-2.5 text-sm font-semibold text-[var(--agent)] transition-colors hover:bg-[var(--agent)]/10"
          >
            Explorar Agentes <ArrowRight className="size-4" />
          </Link>
        </div>
      </section>

      <section className="grid gap-5 lg:grid-cols-3">
        <Panel className="flex flex-col">
          <p className="label-mono mb-1">caminho 01</p>
          <h2 className="mb-1 text-lg font-semibold">Aprender RAG</h2>
          <p className="mb-4 text-xs text-muted-foreground">
            Como uma pergunta encontra a resposta certa dentro de 50.000 documentos.
          </p>
          <PipelineFlow steps={RAG_STEPS} tone="rag" />
          <Link
            to="/rag"
            className="mt-5 inline-flex items-center justify-center gap-2 rounded-md border border-[var(--rag)]/50 px-4 py-2 text-sm font-medium text-[var(--rag)] transition-colors hover:bg-[var(--rag)]/10"
          >
            Explorar RAG <ArrowRight className="size-4" />
          </Link>
        </Panel>

        <Panel className="flex flex-col">
          <p className="label-mono mb-1">caminho 02</p>
          <h2 className="mb-1 text-lg font-semibold">Aprender Agentes</h2>
          <p className="mb-4 text-xs text-muted-foreground">
            Como um sistema persegue um objetivo escolhendo e executando ferramentas.
          </p>
          <PipelineFlow steps={AGENT_STEPS} tone="agent" />
          <Link
            to="/agents"
            className="mt-5 inline-flex items-center justify-center gap-2 rounded-md border border-[var(--agent)]/50 px-4 py-2 text-sm font-medium text-[var(--agent)] transition-colors hover:bg-[var(--agent)]/10"
          >
            Explorar Agentes <ArrowRight className="size-4" />
          </Link>
        </Panel>

        <Panel className="flex flex-col">
          <p className="label-mono mb-1">caminho 03</p>
          <h2 className="mb-1 text-lg font-semibold">RAG + Agentes</h2>
          <p className="mb-4 text-xs text-muted-foreground">
            RAG não substitui o agente. RAG pode ser <em>uma das ferramentas</em> do agente.
          </p>
          <div className="flex-1 rounded-lg border border-border bg-[oklch(0.14_0.014_264)] p-4">
            <div className="mb-3 flex items-center gap-2 rounded-md border border-[var(--agent)]/50 bg-[var(--agent)]/10 px-3 py-2">
              <Bot className="size-4 text-[var(--agent)]" />
              <span className="font-mono text-xs font-semibold text-[var(--agent)]">AGENT</span>
            </div>
            <ul className="space-y-1.5 pl-3 font-mono text-[11px] text-muted-foreground">
              <li>├── Calendar Tool</li>
              <li>├── Flight Tool</li>
              <li>├── Hotel Tool</li>
              <li>├── Email Tool</li>
              <li className="text-[var(--rag)]">└── Knowledge Tool</li>
            </ul>
            <div className="mt-2 ml-8 space-y-1 border-l border-dashed border-[var(--rag)]/50 pl-3 font-mono text-[11px] text-[var(--rag)]">
              <p>↓ RAG</p>
              <p>↓ Vector Database</p>
              <p>↓ Company Documents</p>
            </div>
          </div>
          <Link
            to="/agents"
            hash="rag-as-tool"
            className="mt-5 inline-flex items-center justify-center gap-2 rounded-md border border-border px-4 py-2 text-sm font-medium transition-colors hover:bg-[var(--surface-2)]"
          >
            Ver a combinação <ArrowRight className="size-4" />
          </Link>
        </Panel>
      </section>

      <section className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { to: "/playground" as const, title: "Playground livre", desc: "Seus documentos, seu pipeline, do zero ao retrieval." },
          { to: "/architecture" as const, title: "Arquitetura real", desc: "Como isso seria implementado de verdade em produção." },
          { to: "/glossary" as const, title: "Glossário + Quiz", desc: "18 conceitos com exemplos e desafios rápidos." },
          { to: "/rag" as const, title: "Modo 50.000 docs", desc: "A redução de 1.000.000 de chunks até 5, visualmente." },
        ].map((c) => (
          <Link
            key={c.title}
            to={c.to}
            className="rounded-lg border border-border bg-[var(--surface)]/60 p-4 transition-colors hover:border-[var(--rag)]/40"
          >
            <h3 className="text-sm font-semibold">{c.title}</h3>
            <p className="mt-1 text-xs text-muted-foreground">{c.desc}</p>
          </Link>
        ))}
      </section>
    </AppShell>
  );
}
