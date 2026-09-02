import { t as LabProvider } from "./store-oMQJaQSS.js";
import { r as TooltipProvider } from "./tooltip-B16Z84u2.js";
import { useEffect } from "react";
import { HeadContent, Link, Outlet, Scripts, createFileRoute, createRootRouteWithContext, createRouter, lazyRouteComponent, useRouter } from "@tanstack/react-router";
import { jsx, jsxs } from "react/jsx-runtime";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
//#region src/styles.css?url
var styles_default = "/assets/styles-STaHG3BR.css";
//#endregion
//#region src/routes/__root.tsx
function NotFoundComponent() {
	return /* @__PURE__ */ jsx("div", {
		className: "flex min-h-screen items-center justify-center bg-background px-4",
		children: /* @__PURE__ */ jsxs("div", {
			className: "max-w-md text-center",
			children: [
				/* @__PURE__ */ jsx("h1", {
					className: "text-7xl font-bold text-foreground",
					children: "404"
				}),
				/* @__PURE__ */ jsx("h2", {
					className: "mt-4 text-xl font-semibold text-foreground",
					children: "Page not found"
				}),
				/* @__PURE__ */ jsx("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "The page you're looking for doesn't exist or has been moved."
				}),
				/* @__PURE__ */ jsx("div", {
					className: "mt-6",
					children: /* @__PURE__ */ jsx(Link, {
						to: "/",
						className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
						children: "Go home"
					})
				})
			]
		})
	});
}
function ErrorComponent({ error, reset }) {
	console.error(error);
	const router = useRouter();
	useEffect(() => {
		console.error("Root error boundary", error);
	}, [error]);
	return /* @__PURE__ */ jsx("div", {
		className: "flex min-h-screen items-center justify-center bg-background px-4",
		children: /* @__PURE__ */ jsxs("div", {
			className: "max-w-md text-center",
			children: [
				/* @__PURE__ */ jsx("h1", {
					className: "text-xl font-semibold tracking-tight text-foreground",
					children: "This page didn't load"
				}),
				/* @__PURE__ */ jsx("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "Something went wrong on our end. You can try refreshing or head back home."
				}),
				/* @__PURE__ */ jsxs("div", {
					className: "mt-6 flex flex-wrap justify-center gap-2",
					children: [/* @__PURE__ */ jsx("button", {
						onClick: () => {
							router.invalidate();
							reset();
						},
						className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
						children: "Try again"
					}), /* @__PURE__ */ jsx("a", {
						href: "/",
						className: "inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent",
						children: "Go home"
					})]
				})
			]
		})
	});
}
var Route$6 = createRootRouteWithContext()({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1"
			},
			{ title: "AI Insight Lab" },
			{
				name: "description",
				content: "Interactive lab for learning AI concepts"
			},
			{
				name: "author",
				content: "AI Insight Lab"
			},
			{
				property: "og:title",
				content: "AI Insight Lab"
			},
			{
				property: "og:description",
				content: "Interactive lab for learning AI concepts"
			},
			{
				property: "og:type",
				content: "website"
			},
			{
				name: "twitter:card",
				content: "summary_large_image"
			}
		],
		links: [{
			rel: "stylesheet",
			href: styles_default
		}, {
			rel: "icon",
			href: "/favicon.ico",
			type: "image/x-icon"
		}]
	}),
	shellComponent: RootShell,
	component: RootComponent,
	notFoundComponent: NotFoundComponent,
	errorComponent: ErrorComponent
});
function RootShell({ children }) {
	return /* @__PURE__ */ jsxs("html", {
		lang: "en",
		children: [/* @__PURE__ */ jsx("head", { children: /* @__PURE__ */ jsx(HeadContent, {}) }), /* @__PURE__ */ jsxs("body", { children: [children, /* @__PURE__ */ jsx(Scripts, {})] })]
	});
}
function RootComponent() {
	const { queryClient } = Route$6.useRouteContext();
	return /* @__PURE__ */ jsx(QueryClientProvider, {
		client: queryClient,
		children: /* @__PURE__ */ jsx(TooltipProvider, {
			delayDuration: 150,
			children: /* @__PURE__ */ jsx(LabProvider, { children: /* @__PURE__ */ jsx(Outlet, {}) })
		})
	});
}
//#endregion
//#region src/routes/index.tsx
var $$splitComponentImporter$5 = () => import("./routes-DFAPNFzu.js");
var TITLE$5 = "AI Lab — RAG & Agents Explorer";
var DESC$5 = "Laboratório interativo para ver, por dentro, como funcionam chunks, embeddings, vector databases, retrieval, reranking, RAG e agentes de IA.";
var Route$5 = createFileRoute("/")({
	head: () => ({ meta: [
		{ title: TITLE$5 },
		{
			name: "description",
			content: DESC$5
		},
		{
			property: "og:title",
			content: TITLE$5
		},
		{
			property: "og:description",
			content: DESC$5
		},
		{
			property: "og:type",
			content: "website"
		},
		{
			name: "twitter:card",
			content: "summary_large_image"
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$5, "component")
});
//#endregion
//#region src/routes/agents.tsx
var $$splitComponentImporter$4 = () => import("./agents-CLCi1P5f.js");
var TITLE$4 = "Agent Lab — loop, tools e RAG como ferramenta | AI Lab";
var DESC$4 = "Simulação passo a passo de um agente de IA: objetivo, planejamento, escolha de tool, execução, observação e nova decisão — incluindo RAG usado como ferramenta.";
var Route$4 = createFileRoute("/agents")({
	head: () => ({ meta: [
		{ title: TITLE$4 },
		{
			name: "description",
			content: DESC$4
		},
		{
			property: "og:title",
			content: TITLE$4
		},
		{
			property: "og:description",
			content: DESC$4
		},
		{
			property: "og:type",
			content: "article"
		},
		{
			name: "twitter:card",
			content: "summary_large_image"
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$4, "component")
});
//#endregion
//#region src/routes/architecture.tsx
var $$splitComponentImporter$3 = () => import("./architecture-DcDBJADv.js");
var TITLE$3 = "Arquitetura real de sistemas RAG e agentes | AI Lab";
var DESC$3 = "Como um pipeline RAG e um agente aparecem em produção: ingestão, parsing, embeddings, vector database, retrieval, orquestração de tools e as ferramentas usadas em cada camada.";
var Route$3 = createFileRoute("/architecture")({
	head: () => ({ meta: [
		{ title: TITLE$3 },
		{
			name: "description",
			content: DESC$3
		},
		{
			property: "og:title",
			content: TITLE$3
		},
		{
			property: "og:description",
			content: DESC$3
		},
		{
			property: "og:type",
			content: "article"
		},
		{
			name: "twitter:card",
			content: "summary_large_image"
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$3, "component")
});
//#endregion
//#region src/routes/glossary.tsx
var $$splitComponentImporter$2 = () => import("./glossary-B-IgWJwD.js");
var TITLE$2 = "Glossário e quiz de RAG e agentes | AI Lab";
var DESC$2 = "Todos os termos do laboratório em linguagem simples — token, chunk, embedding, retrieval, reranking, tool, agent loop — mais um quiz para testar o entendimento.";
var Route$2 = createFileRoute("/glossary")({
	head: () => ({ meta: [
		{ title: TITLE$2 },
		{
			name: "description",
			content: DESC$2
		},
		{
			property: "og:title",
			content: TITLE$2
		},
		{
			property: "og:description",
			content: DESC$2
		},
		{
			property: "og:type",
			content: "article"
		},
		{
			name: "twitter:card",
			content: "summary_large_image"
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$2, "component")
});
//#endregion
//#region src/routes/playground.tsx
var $$splitComponentImporter$1 = () => import("./playground-DW5YGXgL.js");
var TITLE$1 = "Playground — monte seu próprio pipeline RAG | AI Lab";
var DESC$1 = "Escreva seus documentos, gere chunks e embeddings simulados, indexe e faça perguntas: o pipeline RAG inteiro rodando com o seu conteúdo.";
var Route$1 = createFileRoute("/playground")({
	head: () => ({ meta: [
		{ title: TITLE$1 },
		{
			name: "description",
			content: DESC$1
		},
		{
			property: "og:title",
			content: TITLE$1
		},
		{
			property: "og:description",
			content: DESC$1
		},
		{
			property: "og:type",
			content: "article"
		},
		{
			name: "twitter:card",
			content: "summary_large_image"
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$1, "component")
});
//#endregion
//#region src/routes/rag.tsx
var $$splitComponentImporter = () => import("./rag-HEjAiB1c.js");
var TITLE = "RAG Lab — pipeline de retrieval passo a passo | AI Lab";
var DESC = "Percorra documentos, parsing, chunking, embeddings, vector database, similaridade, metadata filter, reranking, context window e LLM em um pipeline RAG interativo.";
var Route = createFileRoute("/rag")({
	head: () => ({ meta: [
		{ title: TITLE },
		{
			name: "description",
			content: DESC
		},
		{
			property: "og:title",
			content: TITLE
		},
		{
			property: "og:description",
			content: DESC
		},
		{
			property: "og:type",
			content: "article"
		},
		{
			name: "twitter:card",
			content: "summary_large_image"
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
//#endregion
//#region src/routeTree.gen.ts
var rootRouteChildren = {
	IndexRoute: Route$5.update({
		id: "/",
		path: "/",
		getParentRoute: () => Route$6
	}),
	AgentsRoute: Route$4.update({
		id: "/agents",
		path: "/agents",
		getParentRoute: () => Route$6
	}),
	ArchitectureRoute: Route$3.update({
		id: "/architecture",
		path: "/architecture",
		getParentRoute: () => Route$6
	}),
	GlossaryRoute: Route$2.update({
		id: "/glossary",
		path: "/glossary",
		getParentRoute: () => Route$6
	}),
	PlaygroundRoute: Route$1.update({
		id: "/playground",
		path: "/playground",
		getParentRoute: () => Route$6
	}),
	RagRoute: Route.update({
		id: "/rag",
		path: "/rag",
		getParentRoute: () => Route$6
	})
};
var routeTree = Route$6._addFileChildren(rootRouteChildren)._addFileTypes();
//#endregion
//#region src/router.tsx
var getRouter = () => {
	const queryClient = new QueryClient();
	return createRouter({
		routeTree,
		context: { queryClient },
		scrollRestoration: true,
		defaultPreloadStaleTime: 0
	});
};
//#endregion
export { getRouter };
