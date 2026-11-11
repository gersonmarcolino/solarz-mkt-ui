# Histórico, SolarZ MKT UI

- **2026-11-11** — Registry inicial a partir do hub-mkt: tema neutro (branco, preto, cinza; laranja só como acento, foco e gráfico em cinza, atenção em âmbar), 18 componentes de `components/ui`, `botao-enviar`, `status-badge`, `stat-card` e `section-card` desacoplados do hub. `npm run build` verde; instalação provada num projeto vazio servindo `public/r` local (`shadcn add @solarz/botao-enviar @solarz/stat-card @solarz/status-badge` criou 5 arquivos e gravou o tema). Sem hospedagem ainda: o repo é privado.
- **2026-11-11** — Repo público; registry servido por `raw.githubusercontent.com/.../main/public/r/{name}.json`. Instalação provada pela URL pública num projeto vazio: `shadcn add @solarz/theme @solarz/button @solarz/dialog @solarz/stat-card @solarz/section-card` criou 5 arquivos e gravou o tema.
- **2026-11-11** — StatCard: icone sempre laranja; README atualizado (laranja e acento, nunca acao).
- **2026-11-11** — `button` com canto `rounded-lg` (padrao do hub, era pilula); `label` com prop `obrigatorio` (asterisco).
