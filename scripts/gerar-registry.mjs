// Gera registry.json a partir dos arquivos em registry/solarz.
// Dependencias npm e de registry saem dos imports, para que o JSON nunca divirja do codigo.
import { readFileSync, readdirSync, writeFileSync } from "node:fs";
import { join, basename } from "node:path";

const RAIZ = "registry/solarz";
const NS = "@solarz";
const NPM = ["radix-ui", "lucide-react", "class-variance-authority", "sonner", "next-themes", "clsx", "tailwind-merge"];

const DESCRICAO = {
  "esqueletos": "Esqueletos de carregamento por tipo de tela (painel, lista, detalhe, formulario) com a casca do hub; use no loading.tsx.",
  "botao-enviar": "BotaoEnviar (trava no envio do form) e BotaoConfirmar (acao irreversivel em dois passos, modal).",
  "status-badge": "Selo de status: ok, atencao, neutro, critico, info. Laranja nao e status.",
  "stat-card": "Card de indicador; valor nulo aparece como 'Não medido', nunca zero.",
  "section-card": "Bloco com cabecalho, subtitulo e acoes.",
};

function varsDe(bloco) {
  const out = {};
  for (const m of bloco.matchAll(/--([\w-]+):\s*([^;]+);/g)) out[m[1]] = m[2].trim();
  return out;
}
function bloco(css, seletor) {
  const i = css.indexOf(seletor + " {");
  if (i < 0) throw new Error(`seletor ausente: ${seletor}`);
  return css.slice(i, css.indexOf("}", i));
}

function item(arquivo, tipo) {
  const nome = basename(arquivo).replace(/\.tsx?$/, "");
  const src = readFileSync(arquivo, "utf8");
  const imports = [...src.matchAll(/from\s+"([^"]+)"/g)].map((m) => m[1]);
  const dependencies = [...new Set(imports.filter((i) => NPM.includes(i)))].sort();
  const registryDependencies = [
    ...new Set(
      imports.flatMap((i) => {
        if (i === "@/lib/utils") return [`${NS}/utils`];
        const ui = i.match(/^@\/components\/ui\/(.+)$/);
        return ui ? [`${NS}/${ui[1]}`] : [];
      })
    ),
  ].sort();
  return {
    name: nome,
    type: tipo,
    ...(DESCRICAO[nome] ? { description: DESCRICAO[nome] } : {}),
    ...(dependencies.length ? { dependencies } : {}),
    registryDependencies: [`${NS}/theme`, ...registryDependencies],
    files: [{ path: arquivo.replaceAll("\\", "/"), type: tipo }],
  };
}

const css = readFileSync(join(RAIZ, "theme/solarz.css"), "utf8");
const tema = {
  name: "theme",
  type: "registry:theme",
  description: "Tokens SolarZ: branco, preto e cinza; laranja #FF4D00 so como acento.",
  cssVars: {
    theme: varsDe(bloco(css, "@theme inline")),
    light: varsDe(bloco(css, ":root")),
    dark: varsDe(bloco(css, ".dark")),
  },
};

const lista = (pasta) => readdirSync(join(RAIZ, pasta)).filter((f) => f.endsWith(".tsx")).sort().map((f) => join(RAIZ, pasta, f));

const registry = {
  $schema: "https://ui.shadcn.com/schema/registry.json",
  name: "solarz",
  homepage: "https://github.com/gersonmarcolino/solarz-mkt-ui",
  items: [
    tema,
    { name: "utils", type: "registry:lib", dependencies: ["clsx", "tailwind-merge"], files: [{ path: `${RAIZ}/lib/utils.ts`, type: "registry:lib" }] },
    ...lista("ui").map((f) => item(f, "registry:ui")),
    ...lista("blocks").map((f) => item(f, "registry:component")),
  ],
};

writeFileSync("registry.json", JSON.stringify(registry, null, 2) + "\n");
console.log(`registry.json: ${registry.items.length} itens`);
