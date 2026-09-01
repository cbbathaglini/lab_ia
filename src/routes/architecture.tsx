import { createFileRoute } from "@tanstack/react-router";
import {
  Boxes,
  Bot,
  Cloud,
  Database,
  FileText,
  Layers,
  MessagesSquare,
  Search,
  Server,
  Sparkles,
} from "lucide-react";
import { AppShell } from "@/components/lab/AppShell";
import { Panel, SectionTitle, SimNote } from "@/components/lab/primitives";
import { PipelineEdge, PipelineNode } from "@/components/lab/Pipeline";
import { PARSERS, VECTOR_DBS } from "@/lib/lab/data";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const TITLE = "Arquitetura real de sistemas RAG e agentes | AI Lab";
const DESC =
  "Como um pipeline RAG e um agente aparecem em produção: ingestão, parsing, embeddings, vector database, retrieval, orquestração de tools e as ferramentas usadas em cada camada.";

export const Route = createFileRoute("/architecture")({
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
  component: ArchitecturePage,
});

const STACK = [
  { layer: "Ingestão", tools: "Airflow, cron jobs, webhooks, filas", role: "Traz documentos novos e atualizados para o pipeline" },
  { layer: "Parsing", tools: "Docling, Unstructured, LlamaIndex, PyMuPDF", role: "Converte PDF/DOCX/HTML em texto limpo e estruturado" },
  { layer: "Chunking", tools: "LangChain splitters, LlamaIndex node parsers", role: "Divide o texto em blocos com tamanho e overlap controlados" },
  { layer: "Embeddings", tools: "Modelos de embedding hospedados ou locais", role: "Transforma cada chunk em um vetor numérico" },
  { layer: "Vector DB", tools: "Qdrant, pgvector, Weaviate, Milvus, Chroma", role: "Armazena vetores + metadata e responde buscas por similaridade" },
  { layer: "Retrieval", tools: "Busca vetorial, híbrida (BM25 + vetores), filtros", role: "Seleciona os candidatos mais relevantes para a pergunta" },
  { layer: "Reranking", tools: "Cross-encoders e rerankers dedicados", role: "Reordena os candidatos com um julgamento mais caro e preciso" },
  { layer: "Orquestração", tools: "LangGraph, LlamaIndex, AI SDK, código próprio", role: "Monta o prompt, chama o modelo e coordena o loop de tools" },
  { layer: "Observabilidade", tools: "Traces, logs de tool call, avaliação offline", role: "Mede qualidade de retrieval, custo, latência e falhas" },
];

function ArchitecturePage() {
  return (
    <AppShell>
      <div className="mb-6">
        <p className="label-mono mb-1">mundo real</p>
        <h1 className="text-2xl font-semibold sm:text-3xl">Como isso é construído de verdade</h1>
        <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
          As simulações do laboratório rodam no navegador. Em produção, cada etapa vira um serviço,
          um job ou uma biblioteca. Este é o mapa.
        </p>
      </div>

      <div className="grid gap-5 lg:grid-cols-2">
        <Panel className="border-[var(--rag)]/30">
          <SectionTitle kicker="pipeline offline" title="Indexação (roda em background)" />
          <PipelineNode label="Fontes" value="Drive, S3, CMS, banco, tickets" icon={FileText} tone="rag" />
          <PipelineEdge active />
          <PipelineNode label="Parsing" value="PDF/DOCX/HTML → texto" icon={Layers} tone="rag" />
          <PipelineEdge active />
          <PipelineNode label="Chunking" value="size + overlap" icon={Layers} tone="rag" />
          <PipelineEdge active />
          <PipelineNode label="Embedding model" value="chunk → vetor" icon={Sparkles} tone="rag" />
          <PipelineEdge active />
          <PipelineNode label="Vector Database" value="vetor + metadata + texto" icon={Database} tone="rag" />
          <SimNote>
            Esta parte não acontece durante a pergunta do usuário. Ela roda quando documentos são
            criados ou atualizados.
          </SimNote>
        </Panel>

        <Panel className="border-[var(--signal)]/30">
          <SectionTitle kicker="pipeline online" title="Consulta (roda por pergunta)" />
          <PipelineNode label="Usuário" value="pergunta em linguagem natural" icon={MessagesSquare} />
          <PipelineEdge active />
          <PipelineNode label="API / backend" value="autenticação, filtros por permissão" icon={Server} />
          <PipelineEdge active />
          <PipelineNode label="Embedding da query" value="mesma família de modelo da indexação" icon={Sparkles} />
          <PipelineEdge active />
          <PipelineNode label="Vector search + filtros" value="top-K candidatos" icon={Search} />
          <PipelineEdge active />
          <PipelineNode label="Reranking" value="top-N final" icon={Boxes} />
          <PipelineEdge active />
          <PipelineNode label="LLM" value="prompt + contexto → resposta" icon={Cloud} />
          <SimNote>
            Latência e custo da experiência vêm quase todos daqui — por isso o vector search é feito
            em milissegundos e o reranking só sobre poucos candidatos.
          </SimNote>
        </Panel>
      </div>

      <Panel className="mt-5">
        <SectionTitle
          kicker="agentes"
          title="Arquitetura de um agente em produção"
          description="O agente é um orquestrador com estado: memória, catálogo de tools, política de parada e logs."
        />
        <div className="grid gap-4 lg:grid-cols-3">
          <div className="rounded-lg border border-[var(--agent)]/35 bg-[var(--agent)]/6 p-4">
            <Bot className="mb-2 size-5 text-[var(--agent)]" />
            <p className="text-sm font-medium">Núcleo do agente</p>
            <ul className="mt-2 space-y-1 text-xs text-muted-foreground">
              <li>· prompt de sistema e objetivo</li>
              <li>· loop com limite de steps e custo</li>
              <li>· política de aprovação para ações sensíveis</li>
            </ul>
          </div>
          <div className="rounded-lg border border-border p-4">
            <Boxes className="mb-2 size-5 text-[var(--signal)]" />
            <p className="text-sm font-medium">Camada de tools</p>
            <ul className="mt-2 space-y-1 text-xs text-muted-foreground">
              <li>· schema de entrada validado</li>
              <li>· APIs internas e externas</li>
              <li>· RAG exposto como uma tool de busca</li>
            </ul>
          </div>
          <div className="rounded-lg border border-border p-4">
            <Database className="mb-2 size-5 text-[var(--rag)]" />
            <p className="text-sm font-medium">Memória e estado</p>
            <ul className="mt-2 space-y-1 text-xs text-muted-foreground">
              <li>· histórico da conversa (curto prazo)</li>
              <li>· fatos persistidos do usuário (longo prazo)</li>
              <li>· resultados de tools já executadas</li>
            </ul>
          </div>
        </div>
      </Panel>

      <Panel className="mt-5">
        <SectionTitle kicker="stack" title="Camada por camada" />
        <div className="overflow-x-auto rounded-lg border border-border">
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent">
                <TableHead>Camada</TableHead>
                <TableHead>Ferramentas típicas</TableHead>
                <TableHead>Responsabilidade</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {STACK.map((s) => (
                <TableRow key={s.layer}>
                  <TableCell className="font-mono text-xs whitespace-nowrap text-[var(--rag)]">
                    {s.layer}
                  </TableCell>
                  <TableCell className="text-xs">{s.tools}</TableCell>
                  <TableCell className="text-xs text-muted-foreground">{s.role}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </Panel>

      <div className="mt-5 grid gap-5 lg:grid-cols-2">
        <Panel>
          <SectionTitle kicker="parsing" title="Bibliotecas de parsing" />
          <div className="grid gap-3 sm:grid-cols-2">
            {PARSERS.map((p) => (
              <div key={p.name} className="rounded-md border border-border p-3">
                <p className="font-mono text-sm">{p.name}</p>
                <p className="mt-1 text-xs text-muted-foreground">{p.note}</p>
              </div>
            ))}
          </div>
        </Panel>
        <Panel>
          <SectionTitle kicker="armazenamento" title="Escolhendo o Vector Database" />
          <div className="space-y-3">
            {VECTOR_DBS.map((db) => (
              <div key={db.name} className="rounded-md border border-border p-3">
                <div className="flex flex-wrap items-baseline gap-2">
                  <p className="font-mono text-sm">{db.name}</p>
                  <span className="label-mono">{db.tipo}</span>
                </div>
                <p className="mt-1 text-xs text-muted-foreground">
                  <span className="text-[var(--signal)]">Forte:</span> {db.forte}
                </p>
                <p className="mt-0.5 text-xs text-muted-foreground">
                  <span className="text-[var(--warn,var(--chart-5))]">Atenção:</span> {db.atencao}
                </p>
              </div>
            ))}
          </div>
        </Panel>
      </div>
    </AppShell>
  );
}
