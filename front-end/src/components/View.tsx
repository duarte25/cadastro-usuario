"use client";

import { cn } from "@/lib/utils";
// import { handleImagePath } from "@/utils/handleImagePath";
import { Link2 } from "lucide-react";
import React, { ForwardedRef } from "react";

// Definição de tipos genéricos para os componentes com forwardRef
interface ViewProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  children?: React.ReactNode;
}

// Tipo para o arquivo usado no `ViewFile`
interface FileProps {
  nome: string;
  url?: string;
}

// ============================
// COMPONENTES COM FORWARDREF
// ============================

// Container principal da página
const ViewPageContainer = React.forwardRef<HTMLDivElement, ViewProps>(
  ({ className, children, ...props }, ref) => (
    <div ref={ref} className={cn("max-w-screen-xl w-full", className)} {...props}>
      {children}
    </div>
  )
);
ViewPageContainer.displayName = "ViewPageContainer";

// Container para grid
const ViewGridContainer = React.forwardRef<HTMLDivElement, ViewProps>(
  ({ className, children, ...props }, ref) => (
    <div ref={ref} className={cn("min-w-screen-xl w-full", className)} {...props}>
      {children}
    </div>
  )
);
ViewGridContainer.displayName = "ViewGridContainer";

// Grid interno
const ViewGrid = React.forwardRef<HTMLDivElement, ViewProps>(
  ({ className, children, ...props }, ref) => (
    <div ref={ref} className={cn("scroll-smoot py-6 gap-6", className)} {...props}>
      {children}
    </div>
  )
);
ViewGrid.displayName = "ViewGrid";

// Container genérico para informações
const ViewContainer = React.forwardRef<HTMLDivElement, ViewProps>(
  ({ className, children, ...props }, ref) => (
    <div ref={ref} className={cn("flex flex-col space-y-1", className)} {...props}>
      {children}
    </div>
  )
);
ViewContainer.displayName = "ViewContainer";

// Label para títulos dentro do componente
const ViewLabel = React.forwardRef<HTMLSpanElement, ViewProps>(
  ({ className, children, ...props }, ref) => (
    <span ref={ref} className={cn("font-semibold text-sm", className)} {...props}>
      {children}
    </span>
  )
);
ViewLabel.displayName = "ViewLabel";

// Texto informativo dentro do container
const ViewText = React.forwardRef<HTMLParagraphElement, ViewProps>(
  ({ className, children, ...props }, ref) => (
    <p ref={ref} className={cn("text-sm break-words whitespace-normal line-clamp-2", className)} {...props}>
      {children ?? "Não informado"}
    </p>
  )
);
ViewText.displayName = "ViewText";

const ViewParagraph = React.forwardRef<HTMLParagraphElement, ViewProps>(
  ({ className, children, ...props }, ref) => (
    <p
      ref={ref}
      className={cn("text-sm break-words whitespace-pre-line", className)}
      {...props}
    >
      {children ?? "Não informado"}
    </p>
  )
);
ViewParagraph.displayName = "ViewParagraph";

export {
  ViewPageContainer,
  ViewGridContainer,
  ViewContainer,
  ViewGrid,
  ViewLabel,
  ViewText,
  ViewParagraph
};