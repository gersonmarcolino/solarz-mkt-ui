"use client"

import * as React from "react"
import { Label as LabelPrimitive } from "radix-ui"

import { cn } from "@/lib/utils"

function Label({
  className,
  obrigatorio = false,
  children,
  ...props
}: React.ComponentProps<typeof LabelPrimitive.Root> & {
  /** Asterisco visual; o campo continua precisando de `required` para validar e ser anunciado. */
  obrigatorio?: boolean
}) {
  return (
    <LabelPrimitive.Root
      data-slot="label"
      className={cn(
        "flex items-center gap-2 text-sm leading-none font-medium select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50",
        className
      )}
      {...props}
    >
      {children}
      {obrigatorio ? (
        <span aria-hidden className="-ml-1.5 text-destructive">
          *
        </span>
      ) : null}
    </LabelPrimitive.Root>
  )
}

export { Label }
