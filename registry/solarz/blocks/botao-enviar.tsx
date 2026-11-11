"use client";

/**
 * Botoes de formulario de server action, para os formularios que nao tem JS proprio.
 *
 * - `BotaoEnviar`: desabilita e troca o texto enquanto a action roda (`useFormStatus`). Sem isso, o
 *   duplo clique em "Lançar despesa" gravava duas despesas e a tela nao mostrava que algo acontecia.
 * - `BotaoConfirmar`: acao irreversivel em dois passos. O primeiro clique abre um modal centralizado
 *   (role alertdialog, fundo escurecido, foco preso, Esc e clique fora cancelam, foco volta ao
 *   botao) com o nome do item e a consequencia; o segundo envia. O modal e portado para um no DENTRO
 *   do form, entao o submit continua sendo o do form e o `useFormStatus` do `BotaoEnviar` funciona.
 *   `exigirCiencia` acrescenta uma caixa obrigatoria ("entendi") dentro do modal.
 */
import { useState, type ComponentProps, type ReactNode } from "react";
import { Dialog as DialogPrimitive } from "radix-ui";
import { useFormStatus } from "react-dom";

import { Button } from "@/components/ui/button";

type PropsDoBotao = Omit<ComponentProps<typeof Button>, "type" | "children">;

export function BotaoEnviar({
  children,
  enviando = "Salvando...",
  disabled,
  ...props
}: PropsDoBotao & { children: ReactNode; enviando?: string }) {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending || disabled} aria-busy={pending || undefined} {...props}>
      {pending ? enviando : children}
    </Button>
  );
}

export function BotaoConfirmar({
  children,
  aviso,
  confirmar,
  enviando = "Aguarde...",
  exigirCiencia,
  variant = "destructive",
  size,
}: {
  /** Texto do primeiro botao (ex.: "Excluir despesa"). */
  children: ReactNode;
  /** O que acontece, com o nome do item (ex.: "A despesa X sai com as parcelas e os anexos."). */
  aviso: ReactNode;
  /** Texto do botao que envia de verdade. */
  confirmar: string;
  enviando?: string;
  /** Rotulo de uma caixa que precisa ser marcada antes de enviar. */
  exigirCiencia?: string;
  variant?: PropsDoBotao["variant"];
  size?: PropsDoBotao["size"];
}) {
  const [aberto, setAberto] = useState(false);
  // No dentro do form que recebe o modal: assim o submit sai do form e nao do body.
  const [alvo, setAlvo] = useState<HTMLElement | null>(null);
  return (
    <DialogPrimitive.Root open={aberto} onOpenChange={setAberto}>
      <DialogPrimitive.Trigger asChild>
        <Button type="button" variant={variant} size={size}>
          {children}
        </Button>
      </DialogPrimitive.Trigger>
      <div ref={setAlvo} className="contents" />
      <DialogPrimitive.Portal container={alvo}>
        <DialogPrimitive.Overlay className="fixed inset-0 z-50 bg-black/50" />
        <DialogPrimitive.Content
          role="alertdialog"
          className="fixed top-1/2 left-1/2 z-50 w-[calc(100%-2rem)] max-w-md -translate-x-1/2 -translate-y-1/2 space-y-4 rounded-lg border bg-popover p-6 text-sm text-popover-foreground shadow-xl outline-none"
        >
          <DialogPrimitive.Title className="text-base font-semibold">{children}</DialogPrimitive.Title>
          <DialogPrimitive.Description asChild>
            <p>{aviso}</p>
          </DialogPrimitive.Description>
          {exigirCiencia && (
            <label className="flex items-start gap-2">
              <input type="checkbox" name="ciencia" value="sim" required className="mt-1" />
              <span>{exigirCiencia}</span>
            </label>
          )}
          <div className="flex flex-wrap justify-end gap-2">
            <DialogPrimitive.Close asChild>
              <Button type="button" variant="outline" size={size}>
                Cancelar
              </Button>
            </DialogPrimitive.Close>
            <BotaoEnviar variant={variant} size={size} enviando={enviando}>
              {confirmar}
            </BotaoEnviar>
          </div>
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}
