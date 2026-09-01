import {
  createContext,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { SEED_DOCS } from "./data";
import { chunkAll } from "./engine";
import type { Chunk, LabDoc } from "./types";

export interface Filters {
  departamento: string;
  ano: string;
  tipo: string;
}

interface LabState {
  docs: LabDoc[];
  setDocs: (d: LabDoc[]) => void;
  resetDocs: () => void;
  chunkSize: number;
  setChunkSize: (n: number) => void;
  overlap: number;
  setOverlap: (n: number) => void;
  question: string;
  setQuestion: (q: string) => void;
  topK: number;
  setTopK: (n: number) => void;
  filters: Filters;
  setFilters: (f: Filters) => void;
  devMode: boolean;
  setDevMode: (v: boolean) => void;
  scaleMode: boolean;
  setScaleMode: (v: boolean) => void;
  chunks: Chunk[];
  filteredChunks: Chunk[];
}

const LabContext = createContext<LabState | null>(null);

export const DEFAULT_QUESTION = "Quantos dias de férias um funcionário possui?";

export function LabProvider({ children }: { children: ReactNode }) {
  const [docs, setDocs] = useState<LabDoc[]>(SEED_DOCS);
  const [chunkSize, setChunkSize] = useState(300);
  const [overlap, setOverlap] = useState(50);
  const [question, setQuestion] = useState(DEFAULT_QUESTION);
  const [topK, setTopK] = useState(5);
  const [filters, setFilters] = useState<Filters>({
    departamento: "todos",
    ano: "todos",
    tipo: "todos",
  });
  const [devMode, setDevMode] = useState(false);
  const [scaleMode, setScaleMode] = useState(false);

  const chunks = useMemo(() => chunkAll(docs, chunkSize, overlap), [docs, chunkSize, overlap]);

  const filteredChunks = useMemo(
    () =>
      chunks.filter(
        (c) =>
          (filters.departamento === "todos" || c.metadata.departamento === filters.departamento) &&
          (filters.ano === "todos" || String(c.metadata.ano) === filters.ano) &&
          (filters.tipo === "todos" || c.metadata.tipo === filters.tipo),
      ),
    [chunks, filters],
  );

  const value: LabState = {
    docs,
    setDocs,
    resetDocs: () => setDocs(SEED_DOCS),
    chunkSize,
    setChunkSize,
    overlap,
    setOverlap,
    question,
    setQuestion,
    topK,
    setTopK,
    filters,
    setFilters,
    devMode,
    setDevMode,
    scaleMode,
    setScaleMode,
    chunks,
    filteredChunks,
  };

  return <LabContext.Provider value={value}>{children}</LabContext.Provider>;
}

export function useLab(): LabState {
  const ctx = useContext(LabContext);
  if (!ctx) throw new Error("useLab must be used inside <LabProvider>");
  return ctx;
}
