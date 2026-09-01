export interface AgentTool {
  id: string;
  name: string;
  label: string;
  description: string;
  kind: "action" | "knowledge" | "read";
}

export const AGENT_TOOLS: AgentTool[] = [
  {
    id: "calendar",
    name: "checkCalendar",
    label: "CALENDAR",
    description: "Consulta janelas livres na agenda do colaborador",
    kind: "read",
  },
  {
    id: "policy",
    name: "searchCompanyPolicy",
    label: "COMPANY POLICY (RAG)",
    description: "Busca semântica nos documentos internos via Vector DB",
    kind: "knowledge",
  },
  {
    id: "flights",
    name: "searchFlights",
    label: "FLIGHTS",
    description: "Busca voos disponíveis por origem, destino e data",
    kind: "read",
  },
  {
    id: "hotels",
    name: "searchHotels",
    label: "HOTELS",
    description: "Busca hotéis por cidade, período e teto de diária",
    kind: "read",
  },
  {
    id: "weather",
    name: "getWeather",
    label: "WEATHER",
    description: "Previsão do tempo para o período da viagem",
    kind: "read",
  },
  {
    id: "email",
    name: "sendEmail",
    label: "EMAIL",
    description: "Envia o resumo da viagem — ação com efeito no mundo real",
    kind: "action",
  },
];

export interface AgentStep {
  n: number;
  plan: string;
  toolId: string | null;
  call: Record<string, unknown> | null;
  observation: Record<string, unknown> | string;
  decision: string;
  latencyMs: number;
}

export const AGENT_GOAL = "Organize uma viagem de trabalho para São Paulo.";

export const AGENT_STEPS: AgentStep[] = [
  {
    n: 1,
    plan: "Preciso descobrir quais datas estão livres antes de cotar qualquer coisa.",
    toolId: "calendar",
    call: { tool: "checkCalendar", arguments: { user: "carine", range: "2026-09-01..2026-09-30" } },
    observation: { available: ["2026-09-15", "2026-09-16", "2026-09-17"], conflicts: 0 },
    decision: "Janela de 15 a 17 de setembro está livre. Seguir com as restrições da empresa.",
    latencyMs: 120,
  },
  {
    n: 2,
    plan: "Antes de cotar, preciso saber o que a política de viagens permite.",
    toolId: "policy",
    call: {
      tool: "searchCompanyPolicy",
      arguments: { query: "limites de voo e hotel em viagem corporativa", top_k: 5 },
    },
    observation: {
      chunks: 3,
      rules: ["voos em classe econômica", "hotel até R$ 600/noite em capitais", "prestação em 5 dias úteis"],
      sources: ["viagens.txt"],
    },
    decision: "Restrições capturadas. Aplicar como filtro nas próximas buscas.",
    latencyMs: 340,
  },
  {
    n: 3,
    plan: "Buscar voos POA → SAO respeitando classe econômica.",
    toolId: "flights",
    call: {
      tool: "searchFlights",
      arguments: { origin: "POA", destination: "SAO", date: "2026-09-15", cabin: "economy" },
    },
    observation: { flights: 3, cheapest: "R$ 612", earliest: "06:20" },
    decision: "3 opções válidas. Guardar e cotar hospedagem.",
    latencyMs: 480,
  },
  {
    n: 4,
    plan: "Buscar hotéis dentro do teto de R$ 600 por noite.",
    toolId: "hotels",
    call: {
      tool: "searchHotels",
      arguments: { city: "São Paulo", checkin: "2026-09-15", checkout: "2026-09-17", maxNightly: 600 },
    },
    observation: { hotels: 5, within_policy: 5, best_rated: "Hotel Paulista Centro — R$ 540" },
    decision: "5 opções dentro da política. Combinar com o voo mais eficiente.",
    latencyMs: 410,
  },
  {
    n: 5,
    plan: "Verificar clima para orientar bagagem e deslocamento.",
    toolId: "weather",
    call: { tool: "getWeather", arguments: { city: "São Paulo", from: "2026-09-15", to: "2026-09-17" } },
    observation: { forecast: "chuva leve", temp_c: [16, 23] },
    decision: "Clima não invalida o plano. Selecionar a melhor combinação.",
    latencyMs: 90,
  },
  {
    n: 6,
    plan: "Consolidar voo + hotel e enviar o resumo para aprovação.",
    toolId: "email",
    call: {
      tool: "sendEmail",
      arguments: {
        to: "gestor@empresa.com",
        subject: "Viagem SP · 15–17/09",
        body: "Voo 06:20 POA→SAO (R$ 612) + Hotel Paulista Centro (R$ 540/noite). Dentro da política.",
      },
    },
    observation: { status: "enviado", requires_approval: true },
    decision: "Objetivo atingido: roteiro montado dentro da política e enviado para aprovação.",
    latencyMs: 260,
  },
];
