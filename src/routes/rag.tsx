import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import {
  Bot,
  ChevronLeft,
  ChevronRight,
  Database,
  FileText,
  Filter,
  Layers,
  Plus,
  RotateCcw,
  Search,
  Sparkles,
  Trash2,
  Zap,
} from "lucide-react";
import { AppShell } from "@/components/lab/AppShell";
import { Panel, SectionTitle, SimNote, Stat, InfoTip, JsonBlock } from "@/components/lab/primitives";
import { FunnelBar, PipelineEdge, PipelineFlow, PipelineNode } from "@/components/lab/Pipeline";
import { ChunkCard, ChunkRibbon, chunkColor } from "@/components/lab/ChunkViewer";
import { EmbeddingViewer, VectorSpace } from "@/components/lab/EmbeddingViewer";
import {
  VectorDatabaseViewer,
  VectorDbComparison,
} from "@/components/lab/VectorDatabaseViewer";
import { SimilarityResult } from "@/components/lab/SimilarityResult";
import { MetadataFilter } from "@/components/lab/MetadataFilter";
import { ContextViewer } from "@/components/lab/ContextViewer";
import { useLab } from "@/lib/lab/store";
import {
  SCALE,
  chunkDocument,
  cosine,
  countTokens,
  countWords,
  fakeEmbedding,
  formatNumber,
  rerank,
  search,
  simulateAnswer,
  simulatedLatency,
} from "@/lib/lab/engine";
import { FORMATS, PARSERS } from "@/lib/lab/data";
import type { LabDoc } from "@/lib/lab/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const TITLE = "RAG Lab — pipeline de retrieval passo a passo | AI Lab";
const DESC =
  "Percorra documentos, parsing, chunking, embeddings, vector database, similaridade, metadata filter, reranking, context window e LLM em um pipeline RAG interativo.";

export const Route = createFileRoute("/rag")({
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
  component: RagLab,
});

const STEPS = [
  "Documentos",
  "Parsing",
  "Chunking",
  "Embeddings",
  "Vector DB",
  "Pergunta",
  "Query embedding",
  "Similaridade",
  "Retrieval",
  "Reranking",
  "Context window",
  "LLM",
  "Pipeline completo",
] as const;

function RagLab() {
  const [step, setStep] = useState(0);
  const lab = useLab();

  return (
    <AppShell>
      <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="label-mono mb-1">rag lab</p>
          <h1 className="text-2xl font-semibold sm:text-3xl">
            Etapa {step + 1}/{STEPS.length} · {STEPS[step]}
          </h1>
        </div>
        <div className="flex items-center gap-3">
          <label className="flex items-center gap-2 rounded-md border border-border px-3 py-2">
            <Switch checked={lab.devMode} onCheckedChange={lab.setDevMode} />
            <span className="font-mono text-[11px] tracking-wide uppercase">Developer mode</span>
          </label>
        </div>
      </div>

      <Timeline step={step} setStep={setStep} />

      <div className="mt-6">
        {step === 0 && <StepDocuments />}
        {step === 1 && <StepParsing />}
        {step === 2 && <StepChunking />}
        {step === 3 && <StepEmbeddings />}
        {step === 4 && <StepVectorDb />}
        {step === 5 && <StepQuestion />}
        {step === 6 && <StepQueryEmbedding />}
        {step === 7 && <StepSimilarity />}
        {step === 8 && <StepRetrieval />}
        {step === 9 && <StepReranking />}
        {step === 10 && <StepContext />}
        {step === 11 && <StepLlm />}
        {step === 12 && <StepFullPipeline />}
      </div>

      <div className="mt-8 flex items-center justify-between gap-3">
        <Button
          variant="outline"
          disabled={step === 0}
          onClick={() => setStep((s) => Math.max(0, s - 1))}
        >
          <ChevronLeft className="size-4" /> Anterior
        </Button>
        <span className="font-mono text-[11px] text-muted-foreground">
          {step + 1} / {STEPS.length}
        </span>
        <Button
          disabled={step === STEPS.length - 1}
          onClick={() => setStep((s) => Math.min(STEPS.length - 1, s + 1))}
        >
          Próxima <ChevronRight className="size-4" />
        </Button>
      </div>
    </AppShell>
  );
}

function Timeline({ step, setStep }: { step: number; setStep: (n: number) => void }) {
  return (
    <div className="-mx-4 overflow-x-auto px-4">
      <div className="flex min-w-max items-center gap-1.5">
        {STEPS.map((s, i) => (
          <button
            key={s}
            onClick={() => setStep(i)}
            className={cn(
              "rounded-md border px-2.5 py-1.5 font-mono text-[10.5px] tracking-wide whitespace-nowrap uppercase transition-colors",
              i === step
                ? "border-[var(--rag)] bg-[var(--rag)]/12 text-[var(--rag)]"
                : i < step
                  ? "border-[var(--rag)]/25 text-foreground/70"
                  : "border-border text-muted-foreground hover:text-foreground",
            )}
          >
            {String(i + 1).padStart(2, "0")} {s}
          </button>
        ))}
      </div>
    </div>
  );
}

/* ---------------------------------------------------------------- 1. DOCS */

function StepDocuments() {
  const { docs, setDocs, resetDocs, scaleMode, setScaleMode } = useLab();
  const [draft, setDraft] = useState({ name: "", text: "" });

  const totals = useMemo(() => {
    const text = docs.map((d) => d.text).join(" ");
    return { words: countWords(text), chars: text.length, tokens: countTokens(text) };
  }, [docs]);

  return (
    <div className="space-y-5">
      <Panel>
        <SectionTitle
          kicker="etapa 01"
          title="Documentos"
          description="Tudo começa com a base de conhecimento. Edite, adicione ou remova documentos — todas as etapas seguintes recalculam automaticamente."
          right={
            <Button variant="outline" size="sm" onClick={resetDocs}>
              <RotateCcw className="size-3.5" /> Restaurar exemplos
            </Button>
          }
        />
        <div className="mb-5 grid gap-3 sm:grid-cols-4">
          <Stat label="Documentos" value={docs.length} tone="rag" />
          <Stat label="Palavras" value={formatNumber(totals.words)} />
          <Stat label="Caracteres" value={formatNumber(totals.chars)} />
          <Stat label="Tokens aprox." value={formatNumber(totals.tokens)} tone="signal" />
        </div>

        <div className="space-y-3">
          {docs.map((d) => (
            <div key={d.id} className="rounded-md border border-border bg-[var(--surface)]/60 p-3">
              <div className="mb-2 flex flex-wrap items-center gap-2">
                <FileText className="size-4 text-[var(--rag)]" />
                <Input
                  value={d.name}
                  onChange={(e) =>
                    setDocs(docs.map((x) => (x.id === d.id ? { ...x, name: e.target.value } : x)))
                  }
                  className="h-8 max-w-[260px] font-mono text-xs"
                />
                <FormatBadge format={d.format} />
                <Badge variant="outline" className="font-mono text-[10px]">
                  {d.metadata.departamento} · {d.metadata.ano} · {d.metadata.tipo}
                </Badge>
                <Button
                  variant="ghost"
                  size="icon"
                  className="ml-auto size-8"
                  onClick={() => setDocs(docs.filter((x) => x.id !== d.id))}
                  aria-label={`Excluir ${d.name}`}
                >
                  <Trash2 className="size-3.5" />
                </Button>
              </div>
              <Textarea
                value={d.text}
                onChange={(e) =>
                  setDocs(docs.map((x) => (x.id === d.id ? { ...x, text: e.target.value } : x)))
                }
                className="min-h-24 text-[13px] leading-relaxed"
              />
            </div>
          ))}
        </div>

        <div className="mt-4 rounded-md border border-dashed border-border p-3">
          <p className="label-mono mb-2">Adicionar documento</p>
          <div className="flex flex-col gap-2 sm:flex-row">
            <Input
              placeholder="nome-do-arquivo.txt"
              value={draft.name}
              onChange={(e) => setDraft({ ...draft, name: e.target.value })}
              className="font-mono text-xs sm:max-w-[240px]"
            />
            <Input
              placeholder="Conteúdo do documento…"
              value={draft.text}
              onChange={(e) => setDraft({ ...draft, text: e.target.value })}
              className="text-xs"
            />
            <Button
              onClick={() => {
                if (!draft.name.trim() || !draft.text.trim()) return;
                const doc: LabDoc = {
                  id: `doc_${Date.now()}`,
                  name: draft.name.trim(),
                  format: "TXT",
                  text: draft.text.trim(),
                  metadata: { departamento: "RH", ano: 2026, tipo: "politica", pagina: 1 },
                };
                setDocs([...docs, doc]);
                setDraft({ name: "", text: "" });
              }}
            >
              <Plus className="size-4" /> Adicionar
            </Button>
          </div>
        </div>
      </Panel>

      <Panel>
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <div>
            <h3 className="flex items-center gap-2 text-base font-semibold">
              Simular 50.000 documentos
              <InfoTip text="Nada é criado no navegador. Apenas projetamos os números para você enxergar a escala real de uma base corporativa." />
            </h3>
            <p className="text-xs text-muted-foreground">
              Conceitual: nenhum documento extra é criado de verdade.
            </p>
          </div>
          <Switch checked={scaleMode} onCheckedChange={setScaleMode} />
        </div>
        {scaleMode ? (
          <FunnelBar
            rows={[
              { label: "Documentos", value: SCALE.documents, caption: "média de 10 páginas cada" },
              { label: "Chunks por documento", value: SCALE.chunksPerDoc, caption: "~300 tokens cada" },
              { label: "Chunks totais", value: SCALE.chunks, caption: "= embeddings = vetores indexados" },
            ]}
          />
        ) : (
          <p className="font-mono text-xs text-muted-foreground">
            50.000 documentos → ~20 chunks/documento → ~1.000.000 chunks
          </p>
        )}
      </Panel>
    </div>
  );
}

function FormatBadge({ format }: { format: LabDoc["format"] }) {
  const classes: Record<LabDoc["format"], string> = {
    PDF: "border-red-400/45 bg-red-500/12 text-red-300",
    DOCX: "border-blue-400/45 bg-blue-500/12 text-blue-300",
    TXT: "border-slate-400/45 bg-slate-500/12 text-slate-300",
    HTML: "border-orange-400/45 bg-orange-500/12 text-orange-300",
    MD: "border-purple-400/45 bg-purple-500/12 text-purple-300",
    CSV: "border-emerald-400/45 bg-emerald-500/12 text-emerald-300",
  };

  return (
    <span className={cn("rounded px-2 py-1 font-mono text-[10px] font-semibold", classes[format])}>
      {format}
    </span>
  );
}

/* ------------------------------------------------------------- 2. PARSING */

function StepParsing() {
  const { docs } = useLab();
  const doc = docs[0];
  const originalName = doc?.name ?? "documento.pdf";
  return (
    <Panel>
      <SectionTitle
        kicker="etapa 02"
        title="Parsing"
        description="Parsing transforma diferentes formatos de documento em texto limpo que poderá ser processado. É onde tabelas, cabeçalhos e layout viram conteúdo."
      />
      <div className="grid items-center gap-4 lg:grid-cols-[1fr_auto_1fr]">
        <div className="rounded-lg border border-border bg-[var(--surface)]/70 p-4">
          <p className="label-mono mb-2">arquivo original</p>
          <div className="flex items-center gap-3 rounded-md border border-[var(--chart-5)]/40 bg-[var(--chart-5)]/8 p-3">
            <FileText className="size-6 text-[var(--chart-5)]" />
            <div>
              <p className="font-mono text-sm">{originalName}</p>
              <p className="font-mono text-[11px] text-muted-foreground">
                binário · layout · fontes · imagens
              </p>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-center lg:flex-col">
          <div className="relative h-8 w-full lg:h-16 lg:w-8">
            <span className="animate-travel-y absolute top-0 left-1/2 size-1.5 rounded-full bg-[var(--rag)] shadow-[0_0_10px_var(--rag)]" />
            <div className="mx-auto h-full w-px bg-border" />
          </div>
        </div>
        <div className="rounded-lg border border-[var(--rag)]/40 bg-[var(--rag)]/6 p-4">
          <p className="label-mono mb-2">texto extraído</p>
          <p className="text-[13px] leading-relaxed text-foreground/85">
            “{doc?.text.slice(0, 220) ?? ""}…”
          </p>
        </div>
      </div>

      <div className="mt-6 grid gap-5 md:grid-cols-2">
        <div>
          <p className="label-mono mb-2">formatos de entrada comuns</p>
          <div className="flex flex-wrap gap-2">
            {FORMATS.map((f) => (
              <Badge key={f} variant="outline" className="font-mono text-[11px]">
                {f}
              </Badge>
            ))}
          </div>
        </div>
        <div>
          <p className="label-mono mb-2">ferramentas de parsing (exemplos)</p>
          <div className="grid gap-3">
            {PARSERS.map((p) => (
              <div
                key={p.name}
                title={p.note}
                className="rounded-md border border-[var(--rag)]/30 bg-[var(--rag)]/6 p-3"
              >
                <div className="mb-1 flex flex-wrap items-center gap-2">
                  <span className="rounded-full border border-[var(--rag)]/35 bg-[var(--rag)]/8 px-2.5 py-1 font-mono text-[11px] text-[var(--rag)]">
                    {p.name}
                  </span>
                  <span className="font-mono text-[10.5px] text-muted-foreground">{p.note}</span>
                </div>
                <p className="text-xs leading-relaxed text-foreground/75">{p.example}</p>
              </div>
            ))}
          </div>
          <p className="mt-2 text-xs text-muted-foreground">
            São exemplos populares, não obrigatórios. A escolha depende de formato, volume e
            qualidade de layout exigida.
          </p>
        </div>
      </div>
    </Panel>
  );
}

/* ------------------------------------------------------------ 3. CHUNKING */

function StepChunking() {
  const { docs, chunkSize, setChunkSize, overlap, setOverlap, devMode } = useLab();
  const [docId, setDocId] = useState(docs[0]?.id ?? "");
  const doc = docs.find((d) => d.id === docId) ?? docs[0];
  const chunks = useMemo(
    () => (doc ? chunkDocument(doc, chunkSize, overlap) : []),
    [doc, chunkSize, overlap],
  );
  const totalTokens = doc ? countTokens(doc.text) : 0;

  if (!doc) return <Panel>Adicione um documento na etapa 1.</Panel>;

  return (
    <div className="space-y-5">
      <Panel>
        <SectionTitle
          kicker="etapa 03"
          title="Chunking"
          description="Mude os controles e veja o corte acontecer na hora. Chunk pequeno = precisão e mais ruído de fronteira. Chunk grande = mais contexto e mais desperdício de tokens."
        />
        <div className="mb-4 flex flex-wrap gap-2">
          {docs.map((d) => (
            <button
              key={d.id}
              onClick={() => setDocId(d.id)}
              className={cn(
                "rounded-md border px-2.5 py-1.5 font-mono text-[11px] transition-colors",
                d.id === doc.id
                  ? "border-[var(--rag)] bg-[var(--rag)]/10 text-[var(--rag)]"
                  : "border-border text-muted-foreground hover:text-foreground",
              )}
            >
              {d.name}
            </button>
          ))}
        </div>

        <div className="mb-5 grid gap-4 sm:grid-cols-2">
          <div>
            <p className="label-mono mb-2">Chunk size (tokens)</p>
            <div className="flex flex-wrap gap-1.5">
              {[100, 200, 300, 500, 1000].map((v) => (
                <ControlChip key={v} active={chunkSize === v} onClick={() => setChunkSize(v)}>
                  {v}
                </ControlChip>
              ))}
            </div>
          </div>
          <div>
            <p className="label-mono mb-2">Overlap (tokens)</p>
            <div className="flex flex-wrap gap-1.5">
              {[0, 20, 50, 100].map((v) => (
                <ControlChip key={v} active={overlap === v} onClick={() => setOverlap(v)}>
                  {v}
                </ControlChip>
              ))}
            </div>
          </div>
        </div>

        <div className="mb-5 grid gap-3 sm:grid-cols-4">
          <Stat label="Documento" value={1} />
          <Stat label="Chunks gerados" value={chunks.length} tone="rag" />
          <Stat label="Chunk size" value={chunkSize} />
          <Stat label="Overlap" value={overlap} tone="warn" />
        </div>

        <ChunkRibbon
          chunks={chunks}
          totalTokens={totalTokens}
          chunkSize={chunkSize}
          overlap={overlap}
        />
        <div className="mt-5 grid gap-3 lg:grid-cols-3">
          <div className="rounded-md border border-border bg-[var(--surface)]/70 p-3">
            <p className="label-mono mb-1">1. documento longo</p>
            <p className="text-xs text-muted-foreground">O texto inteiro é grande demais para buscar e enviar ao LLM como uma peça única.</p>
          </div>
          <div className="rounded-md border border-[var(--rag)]/35 bg-[var(--rag)]/6 p-3">
            <p className="label-mono mb-1">2. janela deslizante</p>
            <p className="text-xs text-muted-foreground">Chunk size define o tamanho da janela. Overlap define quanto ela volta antes de gerar o próximo chunk.</p>
          </div>
          <div className="rounded-md border border-[var(--warn)]/35 bg-[var(--warn)]/6 p-3">
            <p className="label-mono mb-1">3. repetição útil</p>
            <p className="text-xs text-muted-foreground">Com overlap, uma frase perto da borda aparece em dois chunks e tem mais chance de ser recuperada.</p>
          </div>
        </div>
        <div className="mt-3 rounded-md border border-[var(--warn)]/35 bg-[var(--warn)]/6 p-3">
          <p className="label-mono mb-2 text-[var(--warn)]">como pensar sobre overlap</p>
          <div className="grid gap-2 text-xs leading-relaxed text-muted-foreground md:grid-cols-2">
            <p>
              <strong className="text-foreground">Sem overlap:</strong> mais barato, menos duplicação,
              mas pode cortar uma ideia no meio.
            </p>
            <p>
              <strong className="text-foreground">Com overlap:</strong> mais caro e gera vetores
              duplicados, mas reduz perda de contexto nas bordas.
            </p>
            <p>
              <strong className="text-foreground">Regra prática:</strong> overlap bom costuma ser
              pequeno, tipo 10% a 20% do chunk size.
            </p>
            <p>
              <strong className="text-foreground">Cuidado:</strong> overlap alto demais indexa muita
              repetição e pode poluir a busca.
            </p>
          </div>
        </div>
      </Panel>

      <Panel>
        <p className="label-mono mb-3">chunks gerados</p>
        <div className="grid gap-3 lg:grid-cols-2">
          {chunks.map((c, i) => (
            <ChunkCard key={c.id} chunk={c} index={i} dev={devMode} />
          ))}
        </div>
        <SimNote>
          A contagem de tokens usa a heurística de ~4 caracteres por token. Tokenizers reais (BPE)
          variam por modelo e idioma.
        </SimNote>
      </Panel>
    </div>
  );
}

function ControlChip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "rounded-md border px-3 py-1.5 font-mono text-xs transition-colors",
        active
          ? "border-[var(--rag)] bg-[var(--rag)]/12 text-[var(--rag)]"
          : "border-border text-muted-foreground hover:text-foreground",
      )}
    >
      {children}
    </button>
  );
}

/* ---------------------------------------------------------- 4. EMBEDDINGS */

function StepEmbeddings() {
  const [text, setText] = useState("Funcionários têm direito a férias");
  const examples = ["trabalho remoto", "home-office", "férias anuais", "bloqueio de senha"];
  return (
    <div className="space-y-5">
      <Panel>
        <SectionTitle
          kicker="etapa 04"
          title="Embeddings"
          description="Um modelo de embedding converte texto em um vetor de números. Textos com significado próximo produzem vetores próximos — é isso que torna a busca semântica possível."
        />
        <div className="grid items-center gap-3 lg:grid-cols-[1fr_auto_1fr]">
          <div>
            <p className="label-mono mb-2">texto</p>
            <Textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="min-h-20 text-sm"
            />
            <div className="mt-2 flex flex-wrap gap-2">
              {examples.map((example) => (
                <button
                  key={example}
                  onClick={() => setText(example)}
                  className="rounded-full border border-border px-2.5 py-1 text-[11px] text-muted-foreground transition-colors hover:border-[var(--accent)]/45 hover:text-foreground"
                >
                  {example}
                </button>
              ))}
            </div>
          </div>
          <div className="flex flex-col items-center gap-1">
            <div className="rounded-md border border-[var(--accent)]/45 bg-[var(--accent)]/10 px-3 py-2 font-mono text-[10px] tracking-wider text-[var(--accent)] uppercase">
              embedding model
            </div>
            <PipelineEdge active />
          </div>
          <div>
            <p className="label-mono mb-2">vetor (dimensões iniciais)</p>
            <EmbeddingViewer text={text} />
          </div>
        </div>
      </Panel>

      <Panel>
        <SectionTitle
          kicker="espaço vetorial"
          title="Visualização 2D de embeddings"
          description="Clique nos pontos. Conceitos do mesmo grupo semântico ficam próximos, mesmo sem compartilhar palavras."
        />
        <VectorSpace />
      </Panel>
    </div>
  );
}

/* ----------------------------------------------------------- 5. VECTOR DB */

function StepVectorDb() {
  const { chunks, scaleMode } = useLab();
  return (
    <div className="space-y-5">
      <Panel>
        <SectionTitle
          kicker="etapa 05"
          title="Vector Database"
          description="Cada chunk vira um registro: id, texto, embedding e metadata. O banco é otimizado para responder 'quais vetores são mais parecidos com este?'."
        />
        <VectorDatabaseViewer
          chunks={chunks}
          {...(scaleMode ? { totalVectors: SCALE.chunks } : {})}
        />
      </Panel>
      <Panel>
        <SectionTitle
          kicker="comparativo"
          title="Onde guardar os vetores"
          description="Não existe escolha universal — existe a escolha adequada ao volume, à operação e ao stack que você já tem."
        />
        <VectorDbComparison />
      </Panel>
    </div>
  );
}

/* ------------------------------------------------------------ 6. QUESTION */

function StepQuestion() {
  const { question, setQuestion } = useLab();
  const suggestions = [
    "Quantos dias de férias um funcionário possui?",
    "Quantos dias por semana posso trabalhar remotamente?",
    "O que acontece após cinco tentativas de senha incorretas?",
    "Qual o limite de diária de hotel em viagem?",
  ];
  return (
    <Panel>
      <SectionTitle
        kicker="etapa 06"
        title="Faça uma pergunta sobre os documentos"
        description="A pergunta é o ponto de entrada do pipeline de retrieval. Ela será convertida no mesmo espaço vetorial dos chunks."
      />
      <Textarea
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        className="min-h-28 text-base"
        placeholder="Faça uma pergunta sobre os documentos"
      />
      <div className="mt-3 flex flex-wrap gap-2">
        {suggestions.map((s) => (
          <button
            key={s}
            onClick={() => setQuestion(s)}
            className="rounded-full border border-border px-3 py-1 text-[11.5px] text-muted-foreground transition-colors hover:border-[var(--rag)]/45 hover:text-foreground"
          >
            {s}
          </button>
        ))}
      </div>
      <p className="mt-4 flex items-center gap-2 font-mono text-xs text-muted-foreground">
        <Search className="size-3.5" /> avance para executar a busca etapa por etapa
      </p>
    </Panel>
  );
}

/* ------------------------------------------------------ 7. QUERY EMBEDDING */

function StepQueryEmbedding() {
  const { question, chunks, scaleMode } = useLab();
  const queryVector = useMemo(() => fakeEmbedding(question, 8), [question]);
  const nearest = useMemo(
    () =>
      chunks
        .map((chunk) => ({
          chunk,
          score: cosine(fakeEmbedding(question), chunk.embedding),
        }))
        .sort((a, b) => b.score - a.score)
        .slice(0, 3),
    [question, chunks],
  );

  return (
    <div className="space-y-5">
      <Panel>
        <SectionTitle
          kicker="etapa 07"
          title="Embedding da pergunta"
          description="A pergunta também vira vetor. Assim ela pode ser comparada com os vetores dos chunks, número contra número, no mesmo espaço semântico."
        />
        <div className="grid gap-3 lg:grid-cols-[1fr_auto_1fr]">
          <div className="rounded-lg border border-border bg-[var(--surface)]/70 p-4">
            <p className="label-mono mb-1.5">pergunta</p>
            <p className="text-sm">“{question}”</p>
            <p className="mt-3 text-xs text-muted-foreground">
              Texto humano: bom para leitura, ruim para cálculo direto de similaridade.
            </p>
          </div>
          <div className="flex flex-col items-center justify-center">
            <span className="rounded-md border border-[var(--accent)]/45 bg-[var(--accent)]/10 px-3 py-2 font-mono text-[10px] tracking-wider text-[var(--accent)] uppercase">
              embedding model
            </span>
            <PipelineEdge active />
          </div>
          <div className="rounded-lg border border-[var(--rag)]/40 bg-[var(--rag)]/6 p-4">
            <p className="label-mono mb-1.5">query vector</p>
            <p className="break-all font-mono text-[11.5px] text-[var(--rag)]">
              [{queryVector.map((v) => v.toFixed(3)).join(", ")}, …]
            </p>
            <p className="mt-3 text-xs text-muted-foreground">
              Vetor da pergunta: bom para comparar com os vetores salvos no Vector DB.
            </p>
          </div>
        </div>
      </Panel>
      <Panel>
        <SectionTitle
          kicker="comparação"
          title="O que acontece depois?"
          description="O banco compara o vetor da pergunta com cada vetor de chunk. Os mais próximos sobem para o topo."
        />
        <div className="grid gap-3 lg:grid-cols-3">
          {nearest.map(({ chunk, score }, index) => (
            <div key={chunk.id} className="rounded-md border border-border bg-[var(--surface)]/70 p-3">
              <div className="mb-2 flex items-center justify-between gap-2">
                <span className="font-mono text-[11px] text-muted-foreground">#{index + 1} {chunk.id}</span>
                <span className="font-mono text-xs text-[var(--signal)]">cos {score.toFixed(2)}</span>
              </div>
              <p className="line-clamp-4 text-xs leading-relaxed text-foreground/80">{chunk.text}</p>
            </div>
          ))}
        </div>
        <SimNote>
          Nesta demo os números são simulados. Em produção, eles viriam de um modelo de embedding real; o conceito é o mesmo: pergunta e chunks viram vetores comparáveis.
        </SimNote>
      </Panel>
      <Panel>
        <p className="label-mono mb-3">o query vector entra no vector database</p>
        <div className="flex flex-col items-center gap-0">
          <PipelineNode label="query vector" value="1536 dims" icon={Sparkles} active />
          <PipelineEdge active />
          <PipelineNode
            label="Qdrant · company_docs"
            value={`${formatNumber(scaleMode ? SCALE.chunks : chunks.length)} vetores indexados`}
            icon={Database}
            active
          />
          <PipelineEdge active />
          <PipelineNode label="ANN search (HNSW · cosine)" value="candidatos mais próximos" icon={Search} active />
        </div>
      </Panel>
    </div>
  );
}

/* ---------------------------------------------------------- 8. SIMILARITY */

function StepSimilarity() {
  const { question, chunks, topK, setTopK, devMode } = useLab();
  const results = useMemo(() => search(question, chunks, topK), [question, chunks, topK]);
  return (
    <div className="space-y-5">
      <Panel>
        <SectionTitle
          kicker="etapa 08"
          title="Similaridade vetorial"
          description="Cosine similarity compara a direção dos vetores. Perto de 1 = mesmo significado; perto de 0 = assuntos diferentes."
          right={
            <div className="flex items-center gap-2">
              <span className="label-mono">Top K</span>
              {[3, 5, 10, 20].map((k) => (
                <ControlChip key={k} active={topK === k} onClick={() => setTopK(k)}>
                  {k}
                </ControlChip>
              ))}
            </div>
          }
        />
        <div className="grid gap-3 lg:grid-cols-2">
          {results.map((r, i) => (
            <SimilarityResult key={r.id} chunk={r} rank={i + 1} dev={devMode} />
          ))}
        </div>
        <SimNote>
          Os scores vêm de uma função local determinística que combina proximidade vetorial
          simulada e sobreposição lexical, para que o comportamento seja didático e reproduzível.
        </SimNote>
      </Panel>
      <Panel>
        <p className="label-mono mb-2">como ler o score</p>
        <div className="space-y-2 font-mono text-xs">
          {[
            { r: "0.90 – 1.00", d: "praticamente o mesmo assunto", c: "var(--signal)" },
            { r: "0.70 – 0.89", d: "relacionado, provavelmente útil", c: "var(--rag)" },
            { r: "0.40 – 0.69", d: "tangencial, risco de ruído", c: "var(--warn)" },
            { r: "0.00 – 0.39", d: "outro assunto", c: "var(--chart-5)" },
          ].map((x) => (
            <div key={x.r} className="flex items-center gap-3">
              <span className="w-24" style={{ color: x.c }}>
                {x.r}
              </span>
              <span className="text-muted-foreground">{x.d}</span>
            </div>
          ))}
        </div>
      </Panel>
    </div>
  );
}

/* ---------------------------------------------------------- 9. RETRIEVAL */

function StepRetrieval() {
  const { question, chunks, filteredChunks, filters, setFilters, devMode, scaleMode } = useLab();
  const results = useMemo(
    () => search(question, filteredChunks, 20),
    [question, filteredChunks],
  );
  const ratio = chunks.length ? filteredChunks.length / chunks.length : 0;
  const universe = scaleMode ? SCALE.chunks : chunks.length;
  const candidates = Math.max(1, Math.round(universe * ratio));

  return (
    <div className="space-y-5">
      <Panel>
        <SectionTitle
          kicker="etapa 09"
          title="Metadata filter + Retrieval"
          description="Filtrar por metadata antes da busca vetorial reduz o universo pesquisado — mais rápido, mais barato e mais preciso."
        />
        <MetadataFilter filters={filters} onChange={setFilters} />
        <div className="mt-5 grid gap-5 lg:grid-cols-[1fr_1.2fr]">
          <div>
            <p className="label-mono mb-3 flex items-center gap-2">
              <Filter className="size-3.5" /> funil de redução
            </p>
            <FunnelBar
              rows={[
                { label: "Chunks indexados", value: universe },
                { label: "Após metadata filter", value: candidates, caption: "candidatos elegíveis" },
                { label: "Vector search · Top 20", value: Math.min(20, results.length) },
              ]}
            />
          </div>
          <div className="grid gap-3 sm:grid-cols-3">
            <Stat label="Chunks totais" value={formatNumber(universe)} />
            <Stat label="Candidatos" value={formatNumber(candidates)} tone="warn" />
            <Stat label="Retornados" value={results.length} tone="rag" />
          </div>
        </div>
      </Panel>
      <Panel>
        <p className="label-mono mb-3">top 20 resultados do retriever</p>
        <div className="grid gap-3 lg:grid-cols-2">
          {results.map((r, i) => (
            <SimilarityResult key={r.id} chunk={r} rank={i + 1} dev={devMode} />
          ))}
          {!results.length && (
            <p className="text-sm text-muted-foreground">
              Nenhum chunk passou pelos filtros. Afrouxe o metadata filter.
            </p>
          )}
        </div>
      </Panel>
    </div>
  );
}

/* --------------------------------------------------------- 10. RERANKING */

function StepReranking() {
  const { question, filteredChunks, devMode } = useLab();
  const [applied, setApplied] = useState(false);
  const candidates = useMemo(() => search(question, filteredChunks, 20), [question, filteredChunks]);
  const reranked = useMemo(() => rerank(question, candidates, 5), [question, candidates]);

  return (
    <Panel>
      <SectionTitle
        kicker="etapa 10"
        title="Reranking"
        description="A busca vetorial encontra candidatos rapidamente. O reranker faz uma avaliação mais precisa da relevância — e é caro, por isso só roda sobre os candidatos."
        right={
          <Button onClick={() => setApplied((a) => !a)} variant={applied ? "outline" : "default"}>
            <Zap className="size-4" /> {applied ? "Ver antes do reranker" : "Aplicar reranker"}
          </Button>
        }
      />
      <div className="mb-4 flex items-center gap-3 font-mono text-[11px] text-muted-foreground">
        <span>VECTOR SEARCH · Top {candidates.length}</span>
        <ChevronRight className="size-3.5" />
        <span className={applied ? "text-[var(--accent)]" : ""}>RERANKER (cross-encoder)</span>
        <ChevronRight className="size-3.5" />
        <span className={applied ? "text-[var(--signal)]" : ""}>Top 5</span>
      </div>
      <div className="grid gap-5 lg:grid-cols-2">
        <div>
          <p className="label-mono mb-2">antes · score vetorial</p>
          <div className="space-y-3">
            {candidates.slice(0, 5).map((c, i) => (
              <SimilarityResult key={c.id} chunk={c} rank={i + 1} dev={devMode} />
            ))}
          </div>
        </div>
        <div>
          <p className="label-mono mb-2">depois · relevance score</p>
          <div className="space-y-3">
            {applied ? (
              reranked.map((c, i) => (
                <SimilarityResult
                  key={c.id}
                  chunk={c}
                  rank={i + 1}
                  dev={devMode}
                  showRerank
                  movement={(c.previousRank ?? i + 1) - (i + 1)}
                />
              ))
            ) : (
              <p className="rounded-md border border-dashed border-border p-6 text-center text-sm text-muted-foreground">
                Clique em “Aplicar reranker” para ver os cards mudarem de posição.
              </p>
            )}
          </div>
        </div>
      </div>
      <SimNote>
        O reranker aqui é uma função local que privilegia cobertura de termos da pergunta. Em
        produção seria um cross-encoder (ex.: bge-reranker, Cohere Rerank).
      </SimNote>
    </Panel>
  );
}

/* ----------------------------------------------------------- 11. CONTEXT */

function StepContext() {
  const { question, filteredChunks } = useLab();
  const top = useMemo(
    () => rerank(question, search(question, filteredChunks, 20), 5),
    [question, filteredChunks],
  );
  return (
    <Panel>
      <SectionTitle
        kicker="etapa 11"
        title="Context window"
        description="Este é exatamente o texto que sai da sua aplicação e chega ao modelo. Nada além disso."
      />
      <ContextViewer question={question} chunks={top} />
    </Panel>
  );
}

/* --------------------------------------------------------------- 12. LLM */

function StepLlm() {
  const { question, filteredChunks, chunks, devMode, scaleMode } = useLab();
  const top = useMemo(
    () => rerank(question, search(question, filteredChunks, 20), 5),
    [question, filteredChunks],
  );
  const answer = simulateAnswer(question, top);
  const lat = simulatedLatency(question);
  const universe = scaleMode ? SCALE.chunks : chunks.length;

  return (
    <div className="space-y-5">
      <Panel>
        <SectionTitle
          kicker="etapa 12"
          title="LLM"
          description="O modelo recebe contexto + pergunta e escreve a resposta. Ele não pesquisa nada por conta própria."
        />
        <div className="grid items-center gap-3 lg:grid-cols-[1fr_auto_1fr]">
          <div className="space-y-2">
            <PipelineNode label="context" value={`${top.length} chunks selecionados`} icon={Layers} done />
            <PipelineNode label="question" value={question} icon={Search} done />
          </div>
          <div className="flex flex-col items-center">
            <div className="rounded-lg border border-[var(--accent)]/45 bg-[var(--accent)]/10 px-4 py-3 text-center">
              <Bot className="mx-auto mb-1 size-5 text-[var(--accent)]" />
              <p className="font-mono text-[11px] tracking-wider text-[var(--accent)] uppercase">llm</p>
              <p className="mt-1 font-mono text-[10px] text-muted-foreground">
                GPT · Claude · Gemini · Llama · Qwen
              </p>
            </div>
            <PipelineEdge active />
          </div>
          <div className="rounded-lg border border-[var(--signal)]/40 bg-[var(--signal)]/6 p-4">
            <p className="label-mono mb-1.5">answer</p>
            <p className="text-sm leading-relaxed whitespace-pre-line">{answer}</p>
          </div>
        </div>
      </Panel>

      <Panel className="border-[var(--warn)]/40">
        <h3 className="mb-2 text-base font-semibold text-[var(--warn)]">
          O LLM não leu {formatNumber(universe)} chunks.
        </h3>
        <p className="text-sm leading-relaxed text-muted-foreground">
          Ele recebeu apenas os {top.length} trechos selecionados pelo pipeline de retrieval. Toda a
          engenharia de chunking, embeddings, filtros e reranking existe para decidir o que merece
          ocupar espaço na context window. A qualidade da resposta é limitada pela qualidade dessa
          seleção — não pela inteligência do modelo.
        </p>
      </Panel>

      {devMode ? (
        <Panel>
          <p className="label-mono mb-3">developer mode · métricas simuladas</p>
          <div className="grid gap-3 sm:grid-cols-5">
            <Stat label="Query embedding" value={`${lat.embedding} ms`} />
            <Stat label="Retrieval" value={`${lat.retrieval} ms`} />
            <Stat label="Reranking" value={`${lat.reranking} ms`} />
            <Stat label="LLM" value={`${(lat.llm / 1000).toFixed(2)} s`} tone="warn" />
            <Stat label="Total" value={`${(lat.total / 1000).toFixed(2)} s`} tone="signal" />
          </div>
          <JsonBlock
            className="mt-3"
            data={{
              top_k: 20,
              rerank_top_n: 5,
              embedding_dims: 1536,
              distance: "cosine",
              context_tokens: top.reduce((a, c) => a + c.tokens, 0),
              chunk_ids: top.map((c) => c.id),
            }}
          />
          <SimNote>Latências geradas de forma determinística a partir da pergunta.</SimNote>
        </Panel>
      ) : null}
    </div>
  );
}

/* ----------------------------------------------------- 13. FULL PIPELINE */

function StepFullPipeline() {
  const { chunks, scaleMode, question } = useLab();
  const universe = scaleMode ? SCALE.chunks : chunks.length;
  const [selected, setSelected] = useState(0);

  const nodes = [
    { label: "Documentos", value: formatNumber(scaleMode ? SCALE.documents : chunks.length && new Set(chunks.map((c) => c.docId)).size), icon: FileText, detail: "Fontes brutas em PDF, DOCX, HTML, bancos de dados. Nada disso é consultável semanticamente ainda." },
    { label: "Parsing", value: "texto limpo", icon: Layers, detail: "Extrai texto legível preservando estrutura relevante (títulos, tabelas, ordem de leitura)." },
    { label: "Chunks", value: formatNumber(universe), icon: Layers, detail: "Unidades de recuperação. Tamanho e overlap definem precisão e custo." },
    { label: "Embeddings", value: `${formatNumber(universe)} vetores`, icon: Sparkles, detail: "Cada chunk vira um vetor de 1536 dimensões no mesmo espaço semântico." },
    { label: "Vector DB", value: "Qdrant · cosine · HNSW", icon: Database, detail: "Índice aproximado que responde em milissegundos mesmo com milhões de vetores." },
    { label: "Pergunta → query embedding", value: question, icon: Search, detail: "A pergunta entra no mesmo espaço vetorial para poder ser comparada." },
    { label: "Metadata filter", value: "reduz o universo", icon: Filter, detail: "Filtros estruturados (departamento, ano, permissão) cortam candidatos antes da comparação vetorial." },
    { label: "Vector search · Top 20", value: "recall", icon: Search, detail: "Rápido e amplo: prioriza não perder o chunk certo." },
    { label: "Reranker · Top 5", value: "precision", icon: Zap, detail: "Caro e preciso: reordena os finalistas lendo pergunta e chunk juntos." },
    { label: "Context", value: "system + chunks + pergunta", icon: Layers, detail: "O payload final, contado em tokens e limitado pela context window." },
    { label: "LLM", value: "gera a resposta", icon: Bot, detail: "Só enxerga o contexto entregue. Sem pipeline, não há conhecimento." },
    { label: "Resposta", value: "com fontes citadas", icon: Bot, detail: "Idealmente rastreável até documento e página — auditabilidade é requisito corporativo." },
  ];

  return (
    <div className="grid gap-5 lg:grid-cols-[1fr_1fr]">
      <Panel>
        <SectionTitle
          kicker="etapa 13"
          title="Pipeline RAG completo"
          description="Clique em qualquer etapa para abrir os detalhes."
        />
        <PipelineFlow
          steps={nodes.map((n) => ({ label: n.label, value: n.value, icon: n.icon }))}
          activeIndex={selected}
          onSelect={setSelected}
        />
      </Panel>
      <div className="space-y-5">
        <Panel className="glow-rag">
          <p className="label-mono mb-1">detalhe da etapa</p>
          <h3 className="mb-2 text-lg font-semibold">{nodes[selected]?.label}</h3>
          <p className="text-sm leading-relaxed text-muted-foreground">{nodes[selected]?.detail}</p>
        </Panel>
        <Panel>
          <p className="label-mono mb-3">a grande redução</p>
          <FunnelBar
            rows={[
              { label: "Vetores no índice", value: universe },
              { label: "Após metadata filtering", value: Math.max(1, Math.round(universe * 0.1)) },
              { label: "Vector similarity", value: 20 },
              { label: "Reranking", value: 5 },
              { label: "Enviado ao LLM", value: 5 },
            ]}
          />
        </Panel>
      </div>
    </div>
  );
}
