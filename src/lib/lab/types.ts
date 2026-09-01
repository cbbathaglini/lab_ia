export type Department = "RH" | "TI" | "Financeiro";
export type DocType = "politica" | "manual" | "procedimento";

export interface LabDoc {
  id: string;
  name: string;
  format: "PDF" | "DOCX" | "TXT" | "HTML" | "MD" | "CSV";
  text: string;
  metadata: {
    departamento: Department;
    ano: 2024 | 2025 | 2026;
    tipo: DocType;
    pagina: number;
  };
}

export interface Chunk {
  id: string;
  docId: string;
  docName: string;
  index: number;
  text: string;
  tokens: number;
  overlapTokens: number;
  metadata: LabDoc["metadata"];
  embedding: number[];
}

export interface ScoredChunk extends Chunk {
  score: number;
  rerankScore?: number;
  previousRank?: number;
}
