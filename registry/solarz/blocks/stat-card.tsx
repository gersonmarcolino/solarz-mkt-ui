import * as React from "react"
import { ArrowDownRight, ArrowUpRight, Minus, type LucideIcon } from "lucide-react"

import { cn } from "@/lib/utils"

/** Espaco inquebravel entre o simbolo da moeda e o numero: "R$ 2.800,00" fica numa linha so. */
export function colarMoeda(valor: string): string {
  return valor.replace(/(R\$|US\$)\s+(?=[\d-])/g, (_, moeda: string) => `${moeda} `)
}

export type StatDelta = { value: string; direction: "up" | "down" | "flat" }

/**
 * Card de indicador. `value` nulo vira "Não medido": dado que nao foi medido nunca vira zero.
 * `highlight` (no maximo um por linha) usa o canto assimetrico e e o unico ponto laranja do card.
 */
export function StatCard({
  label,
  value,
  icon: Icon,
  delta,
  hint,
  highlight = false,
  className,
}: {
  label: string
  value: string | null
  icon?: LucideIcon
  delta?: StatDelta
  hint?: string
  highlight?: boolean
  className?: string
}) {
  const Delta = delta?.direction === "up" ? ArrowUpRight : delta?.direction === "down" ? ArrowDownRight : Minus

  return (
    <div
      data-slot="stat-card"
      className={cn(
        "flex flex-col gap-3 border bg-card p-5 text-card-foreground shadow-[0_1px_2px_rgba(0,0,0,0.03)]",
        highlight ? "rounded-tl-sm rounded-tr-2xl rounded-br-sm rounded-bl-2xl" : "rounded-xl",
        className
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <span className="text-xs font-medium tracking-wide text-muted-foreground uppercase">{label}</span>
        {Icon ? (
          <span
            className={cn(
              "flex size-8 shrink-0 items-center justify-center rounded-lg",
              highlight ? "bg-brand-soft text-brand" : "bg-muted text-foreground"
            )}
          >
            <Icon className="size-4" />
          </span>
        ) : null}
      </div>
      <div className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
        {value === null ? (
          <span className="text-base font-medium text-muted-foreground">Não medido</span>
        ) : (
          <span className="min-w-0 text-3xl font-extrabold tracking-tight tabular-nums">{colarMoeda(value)}</span>
        )}
        {delta ? (
          <span
            className={cn(
              "inline-flex items-center gap-0.5 text-xs font-medium",
              delta.direction === "up" && "text-emerald-600",
              delta.direction === "down" && "text-red-600",
              delta.direction === "flat" && "text-muted-foreground"
            )}
          >
            <Delta className="size-3.5" />
            {delta.value}
          </span>
        ) : null}
      </div>
      {hint ? <span className="text-xs font-light text-muted-foreground">{hint}</span> : null}
    </div>
  )
}
