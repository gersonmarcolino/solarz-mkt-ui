# SolarZ MKT UI

Design system do time de marketing para sistemas e plataformas internas (hub-mkt, Galaxy dashboard, sz-leads e o que vier). É um **registry do shadcn**: cada projeto instala o componente com o CLI e o código passa a ser dele.

- Base dos componentes: [ui.shadcn.com](https://ui.shadcn.com) (oficial, Radix, Tailwind v4).
- Fonte de blocos prontos: [shadcn.io](https://www.shadcn.io). Bloco de lá só entra aqui depois de revisado e trocado para os tokens deste tema.
- Ponto de partida: o tema e os componentes do `hub-mkt/hub-web` em 11/11/2026.

## Regra de cor

A interface é **branca, preta e cinza**. O laranja `#FF4D00` é acento, não cor de ação.

| Uso | Cor |
|---|---|
| Fundo e cards | branco; fundo de página `surface` `#F6F6F6` |
| Texto | preto `foreground`; apoio `muted-foreground` |
| Botão principal | preto, hover preto mais claro, **nunca laranja** |
| Foco (ring) | cinza escuro |
| Navegação lateral | preta |
| Status | verde ok, âmbar atenção, vermelho crítico, azul info |
| Laranja (`brand`) | só acento, nunca ação: ícone dos cards de indicador (`StatCard`), indicador do item ativo da navegação, badge `brand`, série em destaque de gráfico, logo |

Vermelho só para `destructive`. Laranja nunca é status nem erro.

## Instalar num projeto

1. O projeto precisa de Tailwind v4 e de `components.json` do shadcn (`npx shadcn init`).
2. Registre o namespace no `components.json`:

```json
"registries": { "@solarz": "https://raw.githubusercontent.com/gersonmarcolino/solarz-mkt-ui/main/public/r/{name}.json" }
```

O registry é servido direto do `main` deste repo (público). Mudança só chega aos projetos depois de `npm run build` + commit + push dos `public/r/*.json`.

3. Instale: `npx shadcn add @solarz/theme @solarz/button @solarz/stat-card`

O `theme` grava os tokens no `globals.css`; todo componente já depende dele.

## Itens

| Item | Tipo | O que é |
|---|---|---|
| `theme` | tema | tokens de cor, raio, navegação, gráfico, claro e escuro |
| `utils` | lib | `cn()` |
| `avatar` `badge` `button` `card` `checkbox` `dialog` `dropdown-menu` `input` `label` `select` `separator` `skeleton` `slider` `sonner` `switch` `table` `tabs` `textarea` | ui | componentes do hub; `button` sem hover laranja, `badge` com variante `brand` |
| `botao-enviar` | componente | `BotaoEnviar` trava o form no envio; `BotaoConfirmar` pede confirmação em modal para ação irreversível |
| `status-badge` | componente | selo de status por tom |
| `stat-card` | componente | indicador; valor nulo aparece "Não medido", nunca zero |
| `section-card` | componente | bloco com cabeçalho e ações |

## Desenvolver

```bash
npm install
npm run build   # gera registry.json, roda typecheck e escreve public/r/*.json
```

- Componente novo: arquivo em `registry/solarz/ui` (primitivo) ou `registry/solarz/blocks` (da casa). Dependências e `registryDependencies` saem dos imports (`scripts/gerar-registry.mjs`); não edite o `registry.json` à mão.
- Token novo: `registry/solarz/theme/solarz.css`.
- Imports dentro do registry usam `@/components/ui/*` e `@/lib/utils`; o CLI reescreve para os aliases do projeto que instala.
