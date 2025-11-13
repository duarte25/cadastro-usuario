import { cn } from "@/lib/utils";
import React from "react";

type ContainerFormFieldsProps = {
  children: React.ReactNode; // Permite qualquer conteúdo válido dentro do fieldset
  className?: string; // Classes CSS adicionais (opcional)
};

export default function ContainerFormFields({ children, className }: ContainerFormFieldsProps) {
  return (
    <fieldset className={cn("gap-6 py-6", className)}>
      {children}
    </fieldset>
  );
}