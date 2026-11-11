import * as React from "react"

import { cn } from "@/lib/utils"

/** Tom de status. Laranja nao e status: atencao e ambar. */
export type Tone = "ok" | "atencao" | "neutro" | "critico" | "info"

const TONE_BADGE: Record<Tone, string> = {
  ok: "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950 dark:text-emerald-300 dark:border-emerald-900",
  atencao: "bg-amber-50 text-amber-800 border-amber-200 dark:bg-amber-950 dark:text-amber-300 dark:border-amber-900",
  neutro: "bg-muted text-muted-foreground border-border",
  critico: "bg-red-50 text-red-700 border-red-200 dark:bg-red-950 dark:text-red-300 dark:border-red-900",
  info: "bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950 dark:text-blue-300 dark:border-blue-900",
}

/** Selo de status. Vermelho so em falha de verdade. */
export function StatusBadge({
  tone,
  className,
  children,
  ...props
}: React.ComponentProps<"span"> & { tone: Tone }) {
  return (
    <span
      data-slot="status-badge"
      data-tone={tone}
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium whitespace-nowrap",
        TONE_BADGE[tone],
        className
      )}
      {...props}
    >
      {children}
    </span>
  )
}
