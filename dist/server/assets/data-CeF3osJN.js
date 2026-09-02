//#region src/lib/lab/data.ts
var SEED_DOCS = [
	{
		id: "doc_ferias",
		name: "politica-ferias.pdf",
		format: "PDF",
		text: "Funcionários possuem direito a 30 dias de férias anuais. O período de férias pode ser dividido em até três partes, sendo que uma delas não pode ser inferior a 14 dias corridos e as demais não podem ser inferiores a 5 dias corridos. A solicitação de férias deverá ser enviada ao gestor imediato com no mínimo 30 dias de antecedência através do portal de RH. Férias não gozadas dentro do período concessivo geram pagamento em dobro conforme legislação vigente. O adiantamento do décimo terceiro salário pode ser solicitado junto com as férias. O gestor deve avaliar conflitos de agenda da equipe antes de aprovar o período solicitado. Alterações de datas já aprovadas precisam ser registradas no portal e comunicadas ao RH com justificativa. Em caso de desligamento, o saldo de férias vencidas ou proporcionais será calculado no termo de rescisão. O colaborador deve confirmar o recibo de férias antes do início do descanso. Durante as férias, acessos a sistemas internos podem ser temporariamente suspensos para reduzir risco operacional. Dúvidas sobre abono pecuniário, venda de um terço das férias ou antecipação salarial devem ser encaminhadas ao atendimento de RH.",
		metadata: {
			departamento: "RH",
			ano: 2026,
			tipo: "politica",
			pagina: 17
		}
	},
	{
		id: "doc_home_office",
		name: "home-office.docx",
		format: "DOCX",
		text: "Funcionários podem trabalhar remotamente até três dias por semana mediante aprovação do gestor. O regime híbrido exige presença obrigatória nas terças-feiras para rituais de time. O colaborador em home office deve manter conexão de internet adequada e ambiente reservado para reuniões. Equipamentos fornecidos pela empresa continuam sendo patrimônio corporativo e devem ser devolvidos no desligamento. Exceções ao limite de três dias precisam de aprovação da diretoria.",
		metadata: {
			departamento: "RH",
			ano: 2025,
			tipo: "politica",
			pagina: 3
		}
	},
	{
		id: "doc_beneficios",
		name: "beneficios.pdf",
		format: "PDF",
		text: "A empresa oferece vale alimentação, plano de saúde e auxílio educação. O vale alimentação é creditado no dia 25 de cada mês e o valor é reajustado anualmente em acordo coletivo. O plano de saúde cobre titular e dependentes diretos com coparticipação de 20% em consultas eletivas. O auxílio educação reembolsa até 50% da mensalidade de cursos relacionados à área de atuação, limitado a um teto anual. O benefício alimentação não pode ser convertido em dinheiro.",
		metadata: {
			departamento: "RH",
			ano: 2026,
			tipo: "manual",
			pagina: 8
		}
	},
	{
		id: "doc_seguranca",
		name: "seguranca.md",
		format: "MD",
		text: "Após cinco tentativas incorretas de senha, a conta do usuário é bloqueada por 30 minutos. O desbloqueio antecipado pode ser solicitado ao service desk mediante validação de identidade em duas etapas. Senhas devem conter no mínimo 12 caracteres e ser trocadas a cada 180 dias. O uso de autenticação multifator é obrigatório para acesso a sistemas financeiros e ao ambiente de produção. Tentativas de acesso suspeitas geram alerta automático para o time de segurança da informação.",
		metadata: {
			departamento: "TI",
			ano: 2026,
			tipo: "procedimento",
			pagina: 42
		}
	},
	{
		id: "doc_viagens",
		name: "viagens.csv",
		format: "CSV",
		text: "Despesas de viagens corporativas devem ser apresentadas até cinco dias úteis após o retorno. Voos nacionais devem ser adquiridos em classe econômica e com antecedência mínima de sete dias. A diária de hotel está limitada a seiscentos reais por noite em capitais. Refeições possuem limite diário e exigem nota fiscal com CNPJ da empresa. O reembolso é processado na folha do mês seguinte após aprovação do gestor e do financeiro.",
		metadata: {
			departamento: "Financeiro",
			ano: 2025,
			tipo: "procedimento",
			pagina: 12
		}
	}
];
var PARSERS = [
	{
		name: "LlamaIndex",
		note: "Orquestra loaders, parsing e criação de nodes/chunks",
		example: "Use para conectar Google Drive/Notion/S3 e já preparar Documents para indexação."
	},
	{
		name: "Docling",
		note: "Converte PDFs complexos em Markdown preservando layout",
		example: "Bom para relatórios com títulos, tabelas e figuras que precisam virar Markdown limpo."
	},
	{
		name: "Unstructured",
		note: "Divide muitos formatos em elementos: Title, NarrativeText, Table",
		example: "Use quando entram PDF, DOCX, HTML e e-mails no mesmo pipeline."
	},
	{
		name: "PyMuPDF",
		note: "Extração rápida e controlada de texto/imagens em PDF",
		example: "Bom para PDFs simples quando você quer velocidade e coordenadas de página."
	}
];
var FORMATS = [
	"PDF",
	"DOCX",
	"TXT",
	"HTML",
	"Markdown",
	"CSV",
	"Banco de dados"
];
var VECTOR_DBS = [
	{
		name: "Qdrant",
		tipo: "Vector DB dedicado",
		forte: "Filtros de metadata rápidos, HNSW, self-host ou cloud",
		atencao: "Mais um serviço para operar"
	},
	{
		name: "PostgreSQL + pgvector",
		tipo: "Extensão em banco relacional",
		forte: "Reaproveita o Postgres existente, SQL + vetores juntos",
		atencao: "Escala menos que engines dedicadas em bilhões de vetores"
	},
	{
		name: "Weaviate",
		tipo: "Vector DB dedicado",
		forte: "Módulos de vetorização e busca híbrida embutidos",
		atencao: "Modelo de dados mais opinativo"
	},
	{
		name: "Milvus",
		tipo: "Vector DB distribuído",
		forte: "Escala massiva, múltiplos índices",
		atencao: "Operação mais complexa"
	},
	{
		name: "Chroma",
		tipo: "Embarcado / leve",
		forte: "Ótimo para protótipos e desenvolvimento local",
		atencao: "Menos indicado para produção pesada"
	}
];
var EMBEDDING_POINTS = [
	{
		text: "férias",
		group: "Férias",
		x: .18,
		y: .78
	},
	{
		text: "descanso anual",
		group: "Férias",
		x: .26,
		y: .85
	},
	{
		text: "período de férias",
		group: "Férias",
		x: .12,
		y: .68
	},
	{
		text: "30 dias de descanso",
		group: "Férias",
		x: .24,
		y: .66
	},
	{
		text: "senha bloqueada",
		group: "Segurança",
		x: .8,
		y: .24
	},
	{
		text: "erro de login",
		group: "Segurança",
		x: .88,
		y: .34
	},
	{
		text: "tentativas de acesso",
		group: "Segurança",
		x: .74,
		y: .14
	},
	{
		text: "vale alimentação",
		group: "Alimentação",
		x: .62,
		y: .82
	},
	{
		text: "benefício alimentação",
		group: "Alimentação",
		x: .72,
		y: .9
	},
	{
		text: "home office",
		group: "Trabalho remoto",
		x: .42,
		y: .36
	},
	{
		text: "trabalho remoto",
		group: "Trabalho remoto",
		x: .5,
		y: .44
	}
];
var GROUP_COLORS = {
	Férias: "var(--chart-1)",
	Segurança: "var(--chart-5)",
	Alimentação: "var(--chart-3)",
	"Trabalho remoto": "var(--chart-2)"
};
var GLOSSARY = [
	{
		term: "Token",
		short: "Unidade mínima que o modelo processa",
		detail: "Modelos não leem letras nem palavras inteiras: leem tokens, pedaços de texto de ~4 caracteres em média. Tudo é cobrado e limitado em tokens.",
		example: "\"férias anuais\" ≈ 4 tokens"
	},
	{
		term: "Chunk",
		short: "Pedaço de documento indexado separadamente",
		detail: "Documentos inteiros não cabem (nem deveriam caber) no contexto. Quebramos em chunks para recuperar apenas as partes relevantes.",
		example: "1 política de 10 páginas → ~20 chunks de 300 tokens"
	},
	{
		term: "Overlap",
		short: "Repetição de texto entre chunks vizinhos",
		detail: "Replica uma parte do fim de um chunk no início do próximo para não perder contexto exatamente na fronteira do corte.",
		example: "chunk size 300 / overlap 50 → 50 tokens repetidos"
	},
	{
		term: "Embedding",
		short: "Representação numérica do significado",
		detail: "Um modelo de embedding transforma texto em um vetor de centenas ou milhares de números. Textos com sentido próximo geram vetores próximos.",
		example: "[0.128, -0.442, 0.831, …] com 1536 dimensões"
	},
	{
		term: "Vector",
		short: "Lista de números com direção no espaço semântico",
		detail: "O vetor é um ponto em um espaço de alta dimensão. A distância entre pontos aproxima a distância de significado.",
		example: "1536 dimensões = 1536 coordenadas"
	},
	{
		term: "Vector DB",
		short: "Banco especializado em busca por similaridade",
		detail: "Guarda vetores + texto + metadata e responde 'quais os N vetores mais parecidos com este?' em milissegundos, usando índices como HNSW.",
		example: "Qdrant, pgvector, Weaviate, Milvus, Chroma"
	},
	{
		term: "Cosine Similarity",
		short: "Mede o ângulo entre dois vetores",
		detail: "Vai de -1 a 1. Perto de 1 significa mesma direção no espaço semântico, ou seja, significado parecido — independentemente do tamanho do texto.",
		example: "'férias' × 'descanso anual' ≈ 0.91"
	},
	{
		term: "Metadata",
		short: "Atributos estruturados anexados ao chunk",
		detail: "Departamento, ano, tipo, autor, permissão. Permite filtrar antes da busca vetorial e reduzir drasticamente o universo pesquisado.",
		example: "{ \"departamento\": \"RH\", \"ano\": 2026 }"
	},
	{
		term: "Retriever",
		short: "Componente que busca os chunks candidatos",
		detail: "Recebe a pergunta, gera o embedding, aplica filtros e devolve os candidatos mais próximos do Vector DB.",
		example: "retriever.retrieve('política de férias')"
	},
	{
		term: "Top K",
		short: "Quantos resultados a busca devolve",
		detail: "K baixo = contexto enxuto e barato, risco de perder informação. K alto = mais recall, mais ruído e mais tokens.",
		example: "Top K = 20 antes do reranker, 5 depois"
	},
	{
		term: "Reranker",
		short: "Reordena candidatos com avaliação mais precisa",
		detail: "Normalmente um cross-encoder que lê pergunta e chunk juntos. É mais caro, então roda só sobre os candidatos já filtrados.",
		example: "Top 20 → reranker → Top 5"
	},
	{
		term: "Context Window",
		short: "Quanto texto cabe em uma chamada ao LLM",
		detail: "Orçamento total de tokens da chamada: system prompt + contexto + pergunta + resposta. É finito e custa dinheiro.",
		example: "128.000 tokens"
	},
	{
		term: "LLM",
		short: "Modelo que gera a resposta em linguagem natural",
		detail: "Recebe apenas o que está no contexto. Ele não consulta seus documentos: ele lê o que o pipeline de retrieval entregou.",
		example: "GPT, Claude, Gemini, Llama, Qwen"
	},
	{
		term: "RAG",
		short: "Retrieval-Augmented Generation",
		detail: "Arquitetura em que a resposta é gerada com base em trechos recuperados de uma base de conhecimento, e não apenas no que o modelo memorizou.",
		example: "Pergunta → busca → contexto → LLM → resposta"
	},
	{
		term: "Agent",
		short: "Sistema que persegue um objetivo em ciclos",
		detail: "Em vez de responder uma pergunta, o agente planeja, escolhe ferramentas, executa, observa o resultado e decide o próximo passo.",
		example: "'Organize uma viagem para São Paulo'"
	},
	{
		term: "Tool",
		short: "Função externa que o modelo pode chamar",
		detail: "Descrita por nome, descrição e schema de argumentos. O modelo escolhe a tool e os argumentos; o seu código executa de verdade.",
		example: "searchFlights({ origin, destination, date })"
	},
	{
		term: "Memory",
		short: "Estado que sobrevive entre passos",
		detail: "Curto prazo: histórico da execução atual. Longo prazo: preferências e fatos persistidos, frequentemente em um Vector DB.",
		example: "'usuário prefere voos pela manhã'"
	},
	{
		term: "Agent Loop",
		short: "Ciclo pensar → agir → observar → decidir",
		detail: "Roda até o objetivo ser atingido ou um limite de passos/custo ser alcançado. É o que diferencia um agente de uma única chamada.",
		example: "6 steps até montar o roteiro completo"
	}
];
var QUIZ = [
	{
		question: "Um documento tem 10.000 tokens e o chunk size é 500 (sem overlap). Aproximadamente quantos chunks serão criados?",
		options: [
			"5",
			"20",
			"200",
			"2.000"
		],
		answer: 1,
		explanation: "10.000 ÷ 500 = 20 chunks. Com overlap, o número sobe um pouco."
	},
	{
		question: "Qual componente encontra semanticamente os chunks relacionados à pergunta?",
		options: [
			"LLM",
			"Vector Database",
			"Frontend",
			"API Gateway"
		],
		answer: 1,
		explanation: "O Vector Database faz a busca por similaridade. O LLM só recebe o resultado dessa busca."
	},
	{
		question: "Para que serve o overlap entre chunks?",
		options: [
			"Reduzir o custo de embeddings",
			"Evitar perda de contexto nas fronteiras do corte",
			"Aumentar a context window do modelo",
			"Deduplicar documentos"
		],
		answer: 1,
		explanation: "O overlap repete um trecho entre chunks vizinhos para que uma frase cortada ao meio continue recuperável."
	},
	{
		question: "O que o metadata filtering faz antes da busca vetorial?",
		options: [
			"Reordena os resultados finais",
			"Reduz o universo de candidatos com filtros estruturados",
			"Gera o embedding da pergunta",
			"Escreve a resposta final"
		],
		answer: 1,
		explanation: "Filtrar por departamento/ano/tipo pode reduzir 1.000.000 de chunks para dezenas de milhares antes de comparar vetores."
	},
	{
		question: "Qual a principal diferença entre reranking e busca vetorial?",
		options: [
			"Reranking é mais rápido e roda em toda a base",
			"Reranking lê pergunta e chunk juntos, com mais precisão, sobre poucos candidatos",
			"Reranking substitui o LLM",
			"Não existe diferença prática"
		],
		answer: 1,
		explanation: "Busca vetorial é barata e ampla (recall). Reranking é cara e precisa (precision), então roda só no Top K."
	},
	{
		question: "O que caracteriza um agente em relação a um pipeline RAG?",
		options: [
			"Usar embeddings",
			"Ter um loop de decisão que escolhe e executa ferramentas até atingir um objetivo",
			"Rodar em GPU",
			"Ter uma context window maior"
		],
		answer: 1,
		explanation: "RAG responde. O agente persegue um objetivo em ciclos, agindo por meio de tools — e RAG pode ser uma delas."
	}
];
//#endregion
export { PARSERS as a, VECTOR_DBS as c, GROUP_COLORS as i, FORMATS as n, QUIZ as o, GLOSSARY as r, SEED_DOCS as s, EMBEDDING_POINTS as t };
