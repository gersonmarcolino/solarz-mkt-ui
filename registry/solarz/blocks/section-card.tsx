import * as React from "react"

import { cn } from "@/lib/utils"

/** Bloco de conteudo com cabecalho (titulo, subtitulo e acoes a direita). */
export function SectionCard({
  title,
  subtitle,
  actions,
  className,
  children,
}: {
  title: string
  subtitle?: string
  actions?: React.ReactNode
  className?: string
  children: React.ReactNode
}) {
  return (
    <section
      data-slot="section-card"
      className={cn(
        "overflow-hidden rounded-xl border bg-card text-card-foreground shadow-[0_1px_2px_rgba(0,0,0,0.03)]",
        className
      )}
    >
      <header className="flex flex-wrap items-center justify-between gap-3 border-b px-5 py-4">
        <div className="min-w-0">
          <h2 className="text-sm font-extrabold tracking-tight">{title}</h2>
          {subtitle ? <p className="mt-0.5 text-xs font-light text-muted-foreground">{subtitle}</p> : null}
        </div>
        {actions ? <div className="flex items-center gap-2">{actions}</div> : null}
      </header>
      {children}
    </section>
  )
}
