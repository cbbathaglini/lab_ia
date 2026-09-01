import type { Filters } from "@/lib/lab/store";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const FIELDS: { key: keyof Filters; label: string; options: string[] }[] = [
  { key: "departamento", label: "Departamento", options: ["todos", "RH", "TI", "Financeiro"] },
  { key: "ano", label: "Ano", options: ["todos", "2024", "2025", "2026"] },
  { key: "tipo", label: "Tipo", options: ["todos", "manual", "politica", "procedimento"] },
];

export function MetadataFilter({
  filters,
  onChange,
}: {
  filters: Filters;
  onChange: (f: Filters) => void;
}) {
  return (
    <div className="grid gap-3 sm:grid-cols-3">
      {FIELDS.map((f) => (
        <div key={f.key}>
          <p className="label-mono mb-1.5">{f.label}</p>
          <Select
            value={filters[f.key]}
            onValueChange={(v) => onChange({ ...filters, [f.key]: v })}
          >
            <SelectTrigger className="font-mono text-xs">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {f.options.map((o) => (
                <SelectItem key={o} value={o} className="font-mono text-xs">
                  {o}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      ))}
    </div>
  );
}
