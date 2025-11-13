"use client";

import { Tabs, TabsList, TabsTrigger } from "./ui/tabs";
import { usePathname } from "next/navigation";
import { toast } from "react-toastify";
import React from "react";
import Link from "next/link";

interface Permission {
  permission: string;
  action: string;
  nivel: string;
  secretariaId?: string;
  validateField?: boolean;
}

interface Trigger {
  id: number;
  href: string;
  value: string;
  label: string;
  validate?: boolean;
  permission?: Permission;
}

// Mapa de bloqueios (opcional)
interface BlockedTab {
  status: string[];
  message: string;
}

interface TabsLinkProps {
  triggers: Trigger[];
  defaultValue?: string;
  statusBlock?: string; // status atual do relatório (opcional)
  blockedTabs?: Record<string, BlockedTab>; // ex: { elaborar: { status: ['ASSINADO'], message: '...' } }
}

export default function TabsLink({
  triggers,
  defaultValue = "informacoes",
  statusBlock,
  blockedTabs,
}: TabsLinkProps) {
  const pathname = usePathname();
  const activeTab = triggers.find((trigger) => pathname.includes(trigger.value));

  const handleBlockedClick = (message: string) => {
    toast.error(message);
  };

  return (
    <Tabs value={activeTab ? activeTab.value : defaultValue}>
      <TabsList className="w-full h-auto flex justify-start flex-wrap">
        {triggers.map((trigger) => {
          if ("validate" in trigger && !trigger.validate) return null;

          // Verifica se a tab atual está bloqueada pelo status
          const blockedRule = blockedTabs?.[trigger.value];
          const isBlocked =
            statusBlock && blockedRule?.status.includes(statusBlock);

          if (isBlocked) {
            return (
              <button
                key={trigger.id}
                type="button"
                onClick={() =>
                  handleBlockedClick(blockedRule?.message || "Ação não permitida.")
                }
                className="px-3 py-2 rounded-lg text-gray-400 cursor-not-allowed bg-gray-100 hover:bg-gray-100"
              >
                {trigger.label}
              </button>
            );
          }

          return (
            <Link key={trigger.id} href={trigger.href} replace>
              <TabsTrigger value={trigger.value}>{trigger.label}</TabsTrigger>
            </Link>
          );
        })}
      </TabsList>
    </Tabs>
  );
}