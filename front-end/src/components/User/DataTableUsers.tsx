"use client";

import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger, DropdownMenuItem } from "../ui/dropdown-menu";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { ApiErrorQuery, fetchUseQuery } from "@/api/services/fetchUseQuery";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { handleErrorMessages } from "@/errors/handleErrorMessage";
import { useMutation } from "@tanstack/react-query";
import { Eye, MoreHorizontal } from "lucide-react";
import { ApiResponse } from "@/types/api";
import { User } from "@/api/models/User";
import { toast } from "react-toastify";
import IconLink from "../IconLink";
import { useState } from "react";

interface DataTableUsersProps {
  dados: ApiResponse<User>;
  onUpdate: () => void;
}

export default function DataTableUsers({ dados, onUpdate }: DataTableUsersProps) {
  const [open, setOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState<User | null>(null);

  const { mutate, isPending } = useMutation({
    mutationFn: async (userId: string) => {
      return await fetchUseQuery<any, User>({
        route: `/users/${userId}`,
        method: "DELETE",
      });
    },

    onSuccess: async (licenseCriada) => {
      toast.success("Usuário deletado.");
      onUpdate();
    },
    onError: (error: ApiErrorQuery) => {
      if (Array.isArray(error.errors)) {
        handleErrorMessages(error.errors);
      }
    }
  });

  const handleOpenDeleteDialog = (user: User) => {
    setUserToDelete(user);
    setOpen(true);
  };

  return (
    <div>
      <Table data-test="tabela-users">
        <TableHeader>
          <TableRow>
            <TableHead data-test="coluna-foto">Foto</TableHead>
            <TableHead data-test="coluna-nome">Nome</TableHead>
            <TableHead data-test="coluna-email">E-mail</TableHead>
            <TableHead data-test="coluna-profile">Profile</TableHead>
            <TableHead></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {Array.isArray(dados) &&
            dados.map((user: User) => (
              <TableRow key={user?.id} data-test={`linha-board-${user?.id}`}>
                <TableCell data-test={"tableCellFoto"} className="w-[115px] p-2">
                  <Avatar className={"border-x border-green-ninth rounded-full transition-all duration-300 h-12 w-12"}>
                    <AvatarImage src={"https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png"} alt={"Usuário"} className="object-cover" />
                    <AvatarFallback className="rounded-full"></AvatarFallback>
                  </Avatar>
                </TableCell>
                <TableCell data-test="celula-nome">{user?.firstName}</TableCell>
                <TableCell data-test="celula-responsavel">{user?.email}</TableCell>
                <TableCell data-test="celula-responsavel">{user?.profile?.name}</TableCell>
                <TableCell data-test="celula-acoes" className="flex items-center space-x-2">
                  <TooltipProvider delayDuration={100}>
                    <Tooltip>
                      <TooltipTrigger>
                        <IconLink data-test="link-informacoes" href={`/usuarios/${user?.id}/informacoes`}>
                          <Eye className="w-4 h-4" />
                        </IconLink>
                      </TooltipTrigger>
                      <TooltipContent>Informações</TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <button className="p-1 rounded hover:bg-gray-200 focus:outline-none">
                        <MoreHorizontal className="w-4 h-4" />
                      </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent side="right" align="start">
                      <DropdownMenuItem>
                        <span className="cursor-pointer text-red-500" onClick={() => handleOpenDeleteDialog(user)}>
                          Deletar usuário
                        </span>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>

      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Tem certeza?</AlertDialogTitle>
            <AlertDialogDescription>
              Você realmente deseja deletar o usuário <strong>{userToDelete?.firstName}</strong>? Esta ação não pode ser desfeita.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setOpen(false)}>Cancelar</AlertDialogCancel>
            <AlertDialogAction className="bg-green-800" onClick={() => userToDelete && mutate(userToDelete?.id)}>Sim, deletar</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}