import { Database } from "lucide-react";
import { useMemo, useState } from "react";
import { VECTOR_DBS } from "@/lib/lab/data";
import { formatNumber } from "@/lib/lab/engine";
import type { Chunk } from "@/lib/lab/types";
import { JsonBlock } from "./primitives";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export function VectorDatabaseViewer({
  chunks,
  totalVectors,
}: {
  chunks: Chunk[];
  totalVectors?: number;
}) {
  const [openId, setOpenId] = useState<string | null>(chunks[0]?.id ?? null);
  const open = chunks.find((c) => c.id === openId) ?? chunks[0];
  const docsIndexed = useMemo(() => new Set(chunks.map((c) => c.docId)).size, [chunks]);
  const visibleChunks = chunks.slice(0, 10);

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-lg border border-[var(--rag)]/35 bg-[var(--rag)]/6 px-4 py-3">
        <div className="flex items-center gap-3">
          <Database className="size-5 text-[var(--rag)]" />
          <div>
            <p className="font-mono text-sm font-semibold text-[var(--rag)]">QDRANT</p>
            <p className="text-xs text-muted-foreground">collection: company_docs</p>
          </div>
        </div>
        <div className="flex gap-6 font-mono text-xs">
          <span>
            <span className="text-muted-foreground">vectors: </span>
            {formatNumber(totalVectors ?? chunks.length)}
          </span>
          <span>
            <span className="text-muted-foreground">dims: </span>1536
          </span>
          <span>
            <span className="text-muted-foreground">metric: </span>cosine
          </span>
        </div>
      </div>

      <div className="grid gap-3 md:grid-cols-3">
        <div className="rounded-md border border-border bg-[var(--surface)]/70 p-3">
          <p className="label-mono mb-1">o que entra</p>
          <p className="text-xs text-muted-foreground">
            Chunks de texto, não o PDF/DOCX inteiro.
          </p>
        </div>
        <div className="rounded-md border border-[var(--rag)]/35 bg-[var(--rag)]/6 p-3">
          <p className="label-mono mb-1">o que vira vetor</p>
          <p className="text-xs text-muted-foreground">
            Cada chunk gera 1 embedding com 1536 dimensões.
          </p>
        </div>
        <div className="rounded-md border border-[var(--accent)]/35 bg-[var(--accent)]/6 p-3">
          <p className="label-mono mb-1">o que fica no payload</p>
          <p className="text-xs text-muted-foreground">
            Texto original, documento, página, departamento, ano e tipo.
          </p>
        </div>
      </div>

      <div className="grid gap-3 sm:grid-cols-3">
        <div className="rounded-md border border-border bg-[var(--surface)]/70 p-3">
          <p className="label-mono">documentos indexados</p>
          <p className="mt-1 font-mono text-2xl text-foreground">{formatNumber(docsIndexed)}</p>
        </div>
        <div className="rounded-md border border-border bg-[var(--surface)]/70 p-3">
          <p className="label-mono">registros/vetores</p>
          <p className="mt-1 font-mono text-2xl text-[var(--rag)]">{formatNumber(totalVectors ?? chunks.length)}</p>
        </div>
        <div className="rounded-md border border-border bg-[var(--surface)]/70 p-3">
          <p className="label-mono">1 registro contém</p>
          <p className="mt-1 font-mono text-sm text-muted-foreground">id + vector + payload</p>
        </div>
      </div>

      <div className="overflow-x-auto rounded-lg border border-border">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead className="font-mono text-[11px] uppercase">vector_id</TableHead>
              <TableHead className="font-mono text-[11px] uppercase">vector</TableHead>
              <TableHead className="font-mono text-[11px] uppercase">payload.text</TableHead>
              <TableHead className="font-mono text-[11px] uppercase">payload.metadata</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {visibleChunks.map((c) => (
              <TableRow
                key={c.id}
                onClick={() => setOpenId(c.id)}
                className="cursor-pointer"
                data-state={c.id === open?.id ? "selected" : undefined}
              >
                <TableCell className="font-mono text-[11px] text-[var(--rag)]">{c.id}</TableCell>
                <TableCell className="font-mono text-[11px] text-muted-foreground">
                  [{c.embedding.slice(0, 3).map((v) => v.toFixed(2)).join(", ")}, ... 1536d]
                </TableCell>
                <TableCell className="max-w-[380px] truncate text-xs">{c.text}</TableCell>
                <TableCell className="font-mono text-[11px] text-muted-foreground">
                  {c.docName} · p.{c.metadata.pagina} · {c.metadata.departamento} · {c.metadata.tipo}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <p className="text-xs text-muted-foreground">
        Na prática, a busca vetorial consulta a coluna <span className="font-mono text-[var(--rag)]">vector</span>.
        Depois que encontra os IDs mais próximos, a aplicação usa o <span className="font-mono text-[var(--accent)]">payload</span>
        para montar contexto, citar fonte e aplicar filtros.
      </p>

      {open ? (
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <p className="label-mono mb-1.5">Registro selecionado</p>
            <JsonBlock
              data={{
                id: open.id,
                vector: [...open.embedding.slice(0, 4).map((v) => Number(v.toFixed(3))), "... 1536 dims"],
                payload: {
                  text: open.text.slice(0, 90) + "...",
                  doc_name: open.docName,
                },
              }}
            />
          </div>
          <div>
            <p className="label-mono mb-1.5">Metadata (payload)</p>
            <JsonBlock
              data={{
                departamento: open.metadata.departamento,
                ano: open.metadata.ano,
                tipo: open.metadata.tipo,
                pagina: open.metadata.pagina,
                doc_id: open.docId,
              }}
            />
          </div>
        </div>
      ) : null}
    </div>
  );
}

export function VectorDbComparison() {
  return (
    <div className="overflow-x-auto rounded-lg border border-border">
      <Table>
        <TableHeader>
          <TableRow className="hover:bg-transparent">
            <TableHead>Opção</TableHead>
            <TableHead>Tipo</TableHead>
            <TableHead>Forte em</TableHead>
            <TableHead>Atenção</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {VECTOR_DBS.map((db) => (
            <TableRow key={db.name}>
              <TableCell className="font-mono text-xs font-semibold text-[var(--rag)]">
                {db.name}
              </TableCell>
              <TableCell className="text-xs">{db.tipo}</TableCell>
              <TableCell className="text-xs text-muted-foreground">{db.forte}</TableCell>
              <TableCell className="text-xs text-muted-foreground">{db.atencao}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
