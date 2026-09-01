import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import {
  Bot,
  Database,
  Play,
  RotateCcw,
  Search,
  SkipForward,
  Target,
  Wrench,
} from "lucide-react";
import { AppShell } from "@/components/lab/AppShell";
import { Panel, SectionTitle, SimNote, Stat } from "@/components/lab/primitives";
import { PipelineEdge, PipelineFlow, PipelineNode } from "@/components/lab/Pipeline";
import {
  AgentExecutionTimeline,
  ToolCallViewer,
  ToolNode,
} from "@/components/lab/AgentViews";
import { AGENT_GOAL, AGENT_STEPS, AGENT_TOOLS } from "@/lib/lab/agent";
import { useLab } from "@/lib/lab/store";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const TITLE = "Agent Lab — loop, tools e RAG como ferramenta | AI Lab";
const DESC =
  "Simulação passo a passo de um agente de IA: objetivo, planejamento, escolha de tool, execução, observação e nova decisão — incluindo RAG usado como ferramenta.";

export const Route = createFileRoute("/agents")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:type", content: "article" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: AgentLab,
});

const LOOP = [
  { label: "Goal", icon: Target },
  { label: "Think / Plan", icon: Bot },
  { label: "Select tool", icon: Wrench },
  { label: "Execute tool", icon: Play },
  { label: "Observation", icon: Search },
  { label: "Decision", icon: Bot },
  { label: "Next action ↺", icon: RotateCcw },
];

function AgentLab() {
  const { devMode, setDevMode } = useLab();
  const [current, setCurrent] = useState(0);
  const step = AGENT_STEPS[current]!;
  const usedTools = new Set(AGENT_STEPS.slice(0, current + 1).map((s) => s.toolId));
  const elapsed = AGENT_STEPS.slice(0, current + 1).reduce((a, s) => a + s.latencyMs, 0);

  return (
    <AppShell>
      <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="label-mono mb-1">agent lab</p>
          <h1 className="text-2xl font-semibold sm:text-3xl">Agentes de IA</h1>
        </div>
        <label className="flex items-center gap-2 rounded-md border border-border px-3 py-2">
          <Switch checked={devMode} onCheckedChange={setDevMode} />
          <span className="font-mono text-[11px] tracking-wide uppercase">Developer mode</span>
        </label>
      </div>

      <div className="grid gap-5 lg:grid-cols-2">
        <Panel className="border-[var(--rag)]/35">
          <p className="label-mono mb-1">rag pede</p>
          <p className="text-lg font-medium text-[var(--rag)]">
            “Procure informações e responda.”
          </p>
          <p className="mt-2 text-xs text-muted-foreground">
            Uma passagem só: pergunta → busca → contexto → resposta.
          </p>
        </Panel>
        <Panel className="border-[var(--agent)]/35">
          <p className="label-mono mb-1">agente pede</p>
          <p className="text-lg font-medium text-[var(--agent)]">“Alcance este objetivo.”</p>
          <p className="mt-2 text-xs text-muted-foreground">
            Vários ciclos: planejar → agir → observar → decidir de novo.
          </p>
        </Panel>
      </div>

      <Panel className="mt-5">
        <SectionTitle
          kicker="cenário"
          title={AGENT_GOAL}
          description="Um objetivo, seis ferramentas disponíveis e nenhuma sequência pré-definida. O agente decide o caminho."
        />
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {AGENT_TOOLS.map((t) => (
            <ToolNode
              key={t.id}
              tool={t}
              active={step.toolId === t.id}
              used={usedTools.has(t.id)}
            />
          ))}
        </div>
      </Panel>

      <div className="mt-5 grid gap-5 lg:grid-cols-[300px_1fr]">
        <Panel>
          <p className="label-mono mb-3">agent loop</p>
          <PipelineFlow
            steps={LOOP}
            tone="agent"
            activeIndex={((current % LOOP.length) + 1) % LOOP.length}
          />
          <p className="mt-3 text-xs text-muted-foreground">
            O loop roda até o objetivo ser atingido ou até um limite de passos/custo. É isso que
            diferencia um agente de uma única chamada ao modelo.
          </p>
        </Panel>

        <div className="space-y-5">
          <Panel>
            <SectionTitle
              kicker="execução"
              title="Passo a passo"
              right={
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={() => setCurrent(0)}>
                    <RotateCcw className="size-3.5" /> Reiniciar
                  </Button>
                  <Button
                    size="sm"
                    onClick={() => setCurrent((c) => Math.min(AGENT_STEPS.length - 1, c + 1))}
                    disabled={current === AGENT_STEPS.length - 1}
                  >
                    <SkipForward className="size-3.5" /> Próximo passo
                  </Button>
                </div>
              }
            />
            <AgentExecutionTimeline
              steps={AGENT_STEPS}
              current={current}
              onSelect={setCurrent}
              dev={devMode}
            />
            <SimNote>
              Isto é um <strong>plano de execução</strong> e um registro de decisões operacionais —
              não é chain-of-thought privada de um modelo. Sistemas em produção logam tool calls e
              observações, não o raciocínio interno bruto.
            </SimNote>
          </Panel>

          <Panel>
            <p className="label-mono mb-3">tool call visualizer · step {step.n}</p>
            <ToolCallViewer step={step} />
            <div className="mt-4 flex items-center gap-2">
              <PipelineNode
                label="observação alimenta o próximo passo"
                value={step.decision}
                icon={Bot}
                tone="agent"
                active
                compact
              />
            </div>
            {devMode ? (
              <div className="mt-4 grid gap-3 sm:grid-cols-3">
                <Stat label="Steps executados" value={current + 1} tone="agent" />
                <Stat label="Tools distintas" value={usedTools.size} />
                <Stat label="Latência acumulada" value={`${elapsed} ms`} tone="warn" hint="simulada" />
              </div>
            ) : null}
          </Panel>
        </div>
      </div>

      <Panel className="mt-5 scroll-mt-24" id="rag-as-tool">
        <SectionTitle
          kicker="rag + agentes"
          title="O agente usando RAG como ferramenta"
          description="RAG não substitui o agente, e o agente não substitui RAG. Um responde com conhecimento; o outro age em direção a um objetivo — e pode usar o primeiro."
        />
        <div className="grid gap-5 lg:grid-cols-[1fr_1fr]">
          <div className="rounded-lg border border-border bg-[oklch(0.14_0.014_264)] p-4">
            <div className="mb-3 flex items-center gap-2 rounded-md border border-[var(--agent)]/50 bg-[var(--agent)]/10 px-3 py-2">
              <Bot className="size-4 text-[var(--agent)]" />
              <span className="font-mono text-xs font-semibold text-[var(--agent)]">AGENT</span>
            </div>
            <ul className="space-y-1.5 pl-3 font-mono text-[11.5px] text-muted-foreground">
              <li>├── Calendar Tool</li>
              <li>├── Flight Tool</li>
              <li>├── Hotel Tool</li>
              <li>├── Email Tool</li>
              <li className="text-[var(--rag)]">└── Knowledge Tool</li>
            </ul>
            <div className="mt-2 ml-8 border-l border-dashed border-[var(--rag)]/50 pl-4">
              <PipelineNode label="RAG" value="retrieval + reranking" icon={Search} compact />
              <PipelineEdge active />
              <PipelineNode label="Vector Database" value="Qdrant · company_docs" icon={Database} compact />
              <PipelineEdge active />
              <PipelineNode label="Company Documents" value="políticas, manuais, procedimentos" icon={Database} compact />
            </div>
          </div>
          <div className="space-y-3">
            <p className="text-sm leading-relaxed text-muted-foreground">
              No step 2 da simulação acima, o agente chamou{" "}
              <code className="font-mono text-[var(--rag)]">searchCompanyPolicy</code>. Por baixo,
              essa tool é um pipeline RAG completo: embedding da query, filtro de metadata, busca
              vetorial, reranking e devolução dos trechos relevantes.
            </p>
            <p className="text-sm leading-relaxed text-muted-foreground">
              A diferença é <strong>quem decide</strong>. Em RAG puro, o pipeline é fixo. Com um
              agente, a busca é apenas uma das ações possíveis — e pode ser repetida, refinada ou
              abandonada conforme as observações.
            </p>
            <div className="grid gap-3 sm:grid-cols-2">
              <Stat label="RAG dentro do agente" value="1 tool" tone="rag" />
              <Stat label="Outras tools" value={`${AGENT_TOOLS.length - 1}`} tone="agent" />
            </div>
          </div>
        </div>
      </Panel>

      <Panel className="mt-5">
        <SectionTitle kicker="comparação" title="RAG vs Agent" />
        <div className="mb-5 grid gap-4 sm:grid-cols-2">
          <div>
            <p className="label-mono mb-2">fluxo rag</p>
            <PipelineFlow
              steps={[
                { label: "Pergunta" },
                { label: "Busca" },
                { label: "Contexto" },
                { label: "LLM" },
                { label: "Resposta" },
              ]}
              tone="rag"
            />
          </div>
          <div>
            <p className="label-mono mb-2">fluxo agent</p>
            <PipelineFlow
              steps={[
                { label: "Objetivo" },
                { label: "Planejamento" },
                { label: "Tool" },
                { label: "Resultado" },
                { label: "Nova decisão" },
                { label: "Tool" },
                { label: "Resposta / Ação" },
              ]}
              tone="agent"
            />
          </div>
        </div>
        <div className="overflow-x-auto rounded-lg border border-border">
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent">
                <TableHead />
                <TableHead className="text-[var(--rag)]">RAG</TableHead>
                <TableHead className="text-[var(--agent)]">AGENT</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {[
                ["Busca conhecimento", "SIM", "pode"],
                ["Executa ações", "normalmente NÃO", "SIM"],
                ["Possui tools", "opcional", "SIM"],
                ["Loop de execução", "normalmente NÃO", "SIM"],
                ["Objetivo principal", "responder usando conhecimento", "atingir um objetivo"],
              ].map(([k, a, b]) => (
                <TableRow key={k}>
                  <TableCell className="font-mono text-xs text-muted-foreground">{k}</TableCell>
                  <TableCell className="text-xs">{a}</TableCell>
                  <TableCell className="text-xs">{b}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </Panel>
    </AppShell>
  );
}
