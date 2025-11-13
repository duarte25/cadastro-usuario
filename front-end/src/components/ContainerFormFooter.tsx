import { cn } from "@/lib/utils";
import React from "react";

type ContainerFormFooterProps = {
  children: React.ReactNode; // Permite qualquer conteúdo válido dentro do container
  className?: string; // Classes CSS adicionais (opcional)
  [key: string]: unknown; // Permite passar quaisquer outras props para o div
};

export default function ContainerFormFooter({ children, className, ...props }: ContainerFormFooterProps) {
  return (
    <div className={cn("w-full flex justify-end mt-6 gap-2", className)} {...props}>
      {children}
    </div>
  );
}