/**
 * Esqueletos de carregamento, um por tipo de tela.
 *
 * O `loading.tsx` aparece ANTES da pagina montar a casca (a casca vem da propria pagina, com o
 * usuario lido do banco), entao o esqueleto desenha a casca tambem: sidebar preta, barra do topo e
 * o miolo no formato da tela que vai chegar. Sem isso o clique mostrava uma tela branca com
 * "Carregando a tela..." e o layout pulava quando a pagina chegava.
 *
 * Tipos: `painel` (indicadores, grafico e tabela), `lista` (indicadores e tabela), `detalhe`
 * (cabecalho com voltar, indicadores e blocos), `formulario` (cartoes com campos).
 */
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

export type TipoDeEsqueleto = "painel" | "lista" | "detalhe" | "formulario";

/** Bloco de texto/linha: cinza com canto pequeno (o Skeleton padrao e arredondado demais para linha). */
function Linha({ className }: { className?: string }) {
  return <Skeleton className={cn("rounded-md", className)} />;
}

function Casca({ children }: { children: React.ReactNode }) {
  return (
    <div role="status" aria-live="polite" aria-busy="true" className="flex h-dvh overflow-hidden bg-surface">
      <span className="sr-only">Carregando a tela...</span>
      <aside aria-hidden className="flex h-dvh w-64 shrink-0 flex-col bg-black px-5 py-6">
        <Skeleton className="h-6 w-28 rounded-md bg-white/15" />
        <Skeleton className="mt-2 h-3 w-24 rounded-md bg-white/10" />
        <div className="mt-8 space-y-3">
          {Array.from({ length: 6 }, (_, i) => (
            <div key={i} className="flex items-center gap-3 py-1">
              <Skeleton className="size-4 rounded-md bg-white/10" />
              <Skeleton className="h-3.5 w-28 rounded-md bg-white/10" />
            </div>
          ))}
        </div>
      </aside>
      <div aria-hidden className="flex min-w-0 flex-1 flex-col">
        <header className="shrink-0 border-b border-gray-200 bg-white px-8 pt-5">
          <Linha className="h-3 w-48" />
          <div className="mt-5 flex gap-6 pb-3">
            <Linha className="h-4 w-20" />
            <Linha className="h-4 w-24" />
            <Linha className="h-4 w-16" />
          </div>
        </header>
        <main className="min-h-0 flex-1 overflow-hidden px-8 py-7">{children}</main>
      </div>
    </div>
  );
}

function Cabecalho({ voltar = false, acao = false }: { voltar?: boolean; acao?: boolean }) {
  return (
    <div className="mb-6 flex items-end justify-between gap-4">
      <div className="space-y-2">
        {voltar ? <Linha className="mb-3 h-3.5 w-20" /> : null}
        <Linha className="h-7 w-64" />
        <Linha className="h-4 w-96 max-w-full" />
      </div>
      {acao ? <Skeleton className="h-9 w-32 rounded-lg" /> : null}
    </div>
  );
}

export function EsqueletoCards({ quantos = 4 }: { quantos?: number }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {Array.from({ length: quantos }, (_, i) => (
        <div
          key={i}
          className={cn(
            "flex flex-col gap-3 border border-gray-200 bg-white p-5",
            i === 0 ? "rounded-tl-sm rounded-tr-2xl rounded-br-sm rounded-bl-2xl" : "rounded-xl",
          )}
        >
          <div className="flex items-start justify-between">
            <Linha className="h-3 w-24" />
            <Skeleton className="size-8 rounded-lg" />
          </div>
          <Linha className="h-8 w-20" />
          <Linha className="h-3 w-32" />
        </div>
      ))}
    </div>
  );
}

export function EsqueletoTabela({ linhas = 8, colunas = 5 }: { linhas?: number; colunas?: number }) {
  return (
    <section className="overflow-hidden rounded-xl border border-gray-200 bg-white">
      <div className="border-b border-gray-200 px-5 py-4">
        <Linha className="h-4 w-40" />
        <Linha className="mt-2 h-3 w-64" />
      </div>
      <div className="flex gap-6 border-b border-gray-200 bg-surface-2 px-5 py-3">
        {Array.from({ length: colunas }, (_, c) => (
          <Linha key={c} className="h-3 flex-1" />
        ))}
      </div>
      {Array.from({ length: linhas }, (_, l) => (
        <div key={l} className="flex gap-6 border-b border-gray-100 px-5 py-3.5 last:border-0">
          {Array.from({ length: colunas }, (_, c) => (
            <Linha key={c} className={cn("h-4 flex-1", c === 0 ? "max-w-48" : "max-w-32")} />
          ))}
        </div>
      ))}
    </section>
  );
}

export function EsqueletoGrafico() {
  // Alturas fixas (nao aleatorias): o esqueleto renderiza no servidor e no cliente igual.
  const alturas = [40, 65, 50, 80, 55, 70, 45, 90, 60, 75, 50, 85, 65, 70];
  return (
    <section className="rounded-xl border border-gray-200 bg-white p-5">
      <Linha className="h-4 w-48" />
      <div className="mt-6 flex h-40 items-end gap-2">
        {alturas.map((h, i) => (
          <Skeleton key={i} className="flex-1 rounded-t-md rounded-b-none" style={{ height: `${h}%` }} />
        ))}
      </div>
    </section>
  );
}

/** Cartao de formulario: rotulo + campo, e o botao no fim. */
export function EsqueletoFormulario({ campos = 6 }: { campos?: number }) {
  return (
    <section className="rounded-xl border border-gray-200 bg-white p-5">
      <Linha className="h-5 w-40" />
      <Linha className="mt-2 h-3.5 w-72 max-w-full" />
      <div className="mt-6 grid gap-x-4 gap-y-6 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: campos }, (_, i) => (
          <div key={i} className="flex flex-col gap-2">
            <Linha className={cn("h-3.5", i % 2 ? "w-24" : "w-20")} />
            <Skeleton className="h-9 w-full rounded-lg" />
          </div>
        ))}
      </div>
      <Skeleton className="mt-7 h-9 w-28 rounded-lg" />
    </section>
  );
}

export function Esqueleto({ tipo }: { tipo: TipoDeEsqueleto }) {
  return (
    <Casca>
      {tipo === "painel" ? (
        <div className="space-y-6">
          <Cabecalho />
          <EsqueletoCards />
          <EsqueletoGrafico />
          <EsqueletoTabela linhas={5} />
        </div>
      ) : tipo === "lista" ? (
        <div className="space-y-6">
          <Cabecalho acao />
          <EsqueletoCards />
          <EsqueletoTabela />
        </div>
      ) : tipo === "detalhe" ? (
        <div className="space-y-6">
          <Cabecalho voltar acao />
          <EsqueletoCards />
          <div className="grid gap-6 lg:grid-cols-2">
            <EsqueletoTabela linhas={4} colunas={3} />
            <EsqueletoTabela linhas={4} colunas={3} />
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          <Cabecalho />
          <EsqueletoFormulario />
          <EsqueletoFormulario campos={3} />
        </div>
      )}
    </Casca>
  );
}
