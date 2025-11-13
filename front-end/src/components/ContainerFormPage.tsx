import { cn } from "@/lib/utils";
import React from "react";

type ContainerFormPageProps = {
  children: React.ReactNode; // Permite qualquer conteúdo válido dentro do container
  className?: string; // Classes CSS adicionais (opcional)
};

export default function ContainerFormPage({ children, className }: ContainerFormPageProps) {
  return (
    <div className={cn("min-w-screen-lg w-full", className)}>
      {children}
    </div>
  );
}