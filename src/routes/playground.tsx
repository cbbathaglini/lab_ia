import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Database, Layers, Play, Plus, Search, Sparkles, Trash2 } from "lucide-react";
import { AppShell } from "@/components/lab/AppShell";
import { Panel, SectionTitle, SimNote, Stat } from "@/components/lab/primitives";
import { PipelineEdge, PipelineNode } from "@/components/lab/Pipeline";
import { ChunkCard } from "@/components/lab/ChunkViewer";
import { SimilarityResult } from "@/components/lab/SimilarityResult";
import { ContextViewer } from "@/components/lab/ContextViewer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import {
  chunkAll,
  countTokens,
  rerank,
  search,
  simulateAnswer,
  simulatedLatency,
} from "@/lib/lab/engine";
import type { LabDoc } from "@/lib/lab/types";
import { useLab } from "@/lib/lab/store";

const TITLE = "Playground — monte seu próprio pipeline RAG | AI Lab";
const DESC =
  "Escreva seus documentos, gere chunks e embeddings simulados, indexe e faça perguntas: o pipeline RAG inteiro rodando com o seu conteúdo.";

export const Route = createFileRoute("/playground")({
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
  component: Playground,
});

type Phase = 0 | 1 | 2 | 3 | 4;

function Playground() {
  const { devMode, setDevMode } = useLab();
  const [docs, setDocs] = useState<{ id: string; name: string; text: string }[]>([
    { id: "p1", name: "documento-1.txt", text: "Nosso time de suporte atende de segunda a sexta, das 9h às 18h, pelo chat interno." },
    { id: "p2", name: "documento-2.txt", text: "Chamados críticos possuem SLA de resposta de 2 horas e devem ser abertos com prioridade P1." },
    { id: "p3", name: "documento-3.txt", text: "O time de plantão cobre finais de semana apenas para incidentes de produção." },
  ]);
  const [phase, setPhase] = useState<Phase>(0);
  const [chunkSize, setChunkSize] = useState(120);
  const [question, setQuestion] = useState("Qual o SLA para chamados críticos?");

  const labDocs: LabDoc[] = useMemo(
    () =>
      docs.map((d, i) => ({
        id: d.id,
        name: d.name,
        format: "TXT" as const,
        text: d.text,
        metadata: { departamento: "TI" as const, ano: 2026 as const, tipo: "manual" as const, pagina: i + 1 },
      })),
    [docs],
  );
  const chunks = useMemo(() => chunkAll(labDocs, chunkSize, 20), [labDocs, chunkSize]);
  const results = useMemo(
    () => (phase >= 4 ? rerank(question, search(question, chunks, 10), 4) : []),
    [phase, question, chunks],
  );
  const lat = simulatedLatency(question);

  return (
    <AppShell>
      <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="label-mono mb-1">playground livre</p>
          <h1 className="text-2xl font-semibold sm:text-3xl">Seu conteúdo, seu pipeline</h1>
        </div>
        <label className="flex items-center gap-2 rounded-md border border-border px-3 py-2">
          <Switch checked={devMode} onCheckedChange={setDevMode} />
          <span className="font-mono text-[11px] tracking-wide uppercase">Developer mode</span>
        </label>
      </div>

      <div className="grid gap-5 lg:grid-cols-[260px_1fr]">
        <Panel className="h-fit lg:sticky lg:top-24">
          <p className="label-mono mb-3">pipeline</p>
          <PipelineNode label="Documentos" value={`${docs.length} arquivos`} icon={Layers} done={phase >= 0} active={phase === 0} />
          <PipelineEdge active={phase >= 1} />
          <PipelineNode label="Chunks" value={phase >= 1 ? `${chunks.length} chunks` : "—"} icon={Layers} done={phase >= 1} active={phase === 1} />
          <PipelineEdge active={phase >= 2} />
          <PipelineNode label="Embeddings" value={phase >= 2 ? `${chunks.length} vetores` : "—"} icon={Sparkles} done={phase >= 2} active={phase === 2} />
          <PipelineEdge active={phase >= 3} />
          <PipelineNode label="Index" value={phase >= 3 ? "in-memory VDB" : "—"} icon={Database} done={phase >= 3} active={phase === 3} />
          <PipelineEdge active={phase >= 4} />
          <PipelineNode label="Query" value={phase >= 4 ? `${results.length} resultados` : "—"} icon={Search} done={phase >= 4} active={phase === 4} />
        </Panel>

        <div className="space-y-5">
          <Panel>
            <SectionTitle
              kicker="passo 1"
              title="Documentos"
              right={
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() =>
                    setDocs([
                      ...docs,
                      { id: `p${Date.now()}`, name: `documento-${docs.length + 1}.txt`, text: "" },
                    ])
                  }
                >
                  <Plus className="size-3.5" /> Novo documento
                </Button>
              }
            />
            <div className="space-y-3">
              {docs.map((d) => (
                <div key={d.id} className="rounded-md border border-border bg-[var(--surface)]/60 p-3">
                  <div className="mb-2 flex items-center gap-2">
                    <Input
                      value={d.name}
                      onChange={(e) =>
                        setDocs(docs.map((x) => (x.id === d.id ? { ...x, name: e.target.value } : x)))
                      }
                      className="h-8 max-w-[240px] font-mono text-xs"
                    />
                    <span className="font-mono text-[10px] text-muted-foreground">
                      {countTokens(d.text)} tokens
                    </span>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="ml-auto size-8"
                      onClick={() => setDocs(docs.filter((x) => x.id !== d.id))}
                      aria-label="Excluir documento"
                    >
                      <Trash2 className="size-3.5" />
                    </Button>
                  </div>
                  <Textarea
                    value={d.text}
                    onChange={(e) =>
                      setDocs(docs.map((x) => (x.id === d.id ? { ...x, text: e.target.value } : x)))
                    }
                    className="min-h-20 text-[13px]"
                  />
                </div>
              ))}
            </div>
            <div className="mt-4 flex flex-wrap items-center gap-3">
              <span className="label-mono">chunk size</span>
              {[80, 120, 200, 400].map((v) => (
                <button
                  key={v}
                  onClick={() => setChunkSize(v)}
                  className={
                    "rounded-md border px-2.5 py-1 font-mono text-xs transition-colors " +
                    (chunkSize === v
                      ? "border-[var(--rag)] bg-[var(--rag)]/12 text-[var(--rag)]"
                      : "border-border text-muted-foreground")
                  }
                >
                  {v}
                </button>
              ))}
              <Button className="ml-auto" onClick={() => setPhase(1)}>
                <Play className="size-4" /> Gerar chunks
              </Button>
            </div>
          </Panel>

          {phase >= 1 ? (
            <Panel>
              <SectionTitle
                kicker="passo 2"
                title={`${chunks.length} chunks gerados`}
                right={
                  <Button onClick={() => setPhase(2)} disabled={phase >= 2} variant="outline">
                    <Sparkles className="size-4" /> Gerar embeddings simulados
                  </Button>
                }
              />
              <div className="grid gap-3 lg:grid-cols-2">
                {chunks.map((c, i) => (
                  <ChunkCard key={c.id} chunk={c} index={i} dev={devMode} />
                ))}
              </div>
            </Panel>
          ) : null}

          {phase >= 2 ? (
            <Panel>
              <SectionTitle
                kicker="passo 3"
                title="Embeddings e indexação"
                right={
                  <Button onClick={() => setPhase(3)} disabled={phase >= 3} variant="outline">
                    <Database className="size-4" /> Indexar
                  </Button>
                }
              />
              <div className="grid gap-3 sm:grid-cols-3">
                <Stat label="Vetores" value={chunks.length} tone="rag" />
                <Stat label="Dimensões" value="1536" />
                <Stat label="Métrica" value="cosine" />
              </div>
              <SimNote>Embeddings gerados por função local determinística.</SimNote>
            </Panel>
          ) : null}

          {phase >= 3 ? (
            <Panel>
              <SectionTitle kicker="passo 4" title="Pergunte à sua base" />
              <div className="flex flex-col gap-3 sm:flex-row">
                <Textarea
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  className="min-h-16 flex-1"
                />
                <Button onClick={() => setPhase(4)} className="sm:self-stretch">
                  <Search className="size-4" /> Executar busca
                </Button>
              </div>
            </Panel>
          ) : null}

          {phase >= 4 && results.length ? (
            <>
              <Panel>
                <p className="label-mono mb-3">chunks recuperados e reordenados</p>
                <div className="grid gap-3 lg:grid-cols-2">
                  {results.map((r, i) => (
                    <SimilarityResult key={r.id} chunk={r} rank={i + 1} dev={devMode} showRerank />
                  ))}
                </div>
              </Panel>
              <Panel>
                <p className="label-mono mb-3">contexto enviado ao llm</p>
                <ContextViewer question={question} chunks={results} />
              </Panel>
              <Panel className="border-[var(--signal)]/40">
                <p className="label-mono mb-2">resposta simulada</p>
                <p className="text-sm leading-relaxed whitespace-pre-line">
                  {simulateAnswer(question, results)}
                </p>
                {devMode ? (
                  <div className="mt-4 grid gap-3 sm:grid-cols-4">
                    <Stat label="Retrieval" value={`${lat.retrieval} ms`} />
                    <Stat label="Reranking" value={`${lat.reranking} ms`} />
                    <Stat label="LLM" value={`${(lat.llm / 1000).toFixed(2)} s`} />
                    <Stat label="Total" value={`${(lat.total / 1000).toFixed(2)} s`} tone="signal" />
                  </div>
                ) : null}
                <SimNote>
                  A resposta é extrativa, montada a partir dos chunks recuperados. Nenhum modelo é
                  chamado.
                </SimNote>
              </Panel>
            </>
          ) : null}
        </div>
      </div>
    </AppShell>
  );
}
