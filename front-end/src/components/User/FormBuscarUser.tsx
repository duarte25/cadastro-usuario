"use client";

import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { UserSchemas } from "@/schemas/UserSchemas";
import { Input } from "@/components/ui/input";
import Filtros from "@/components/Filtros";
import { useForm } from "react-hook-form";
import z from "zod";

interface FormBuscarUser {
  route: string;
  querys: {
    [key: string]: string;
  };
  hiddenFields?: string[];
}

export default function FormSearchUser({
  route,
  querys,
  hiddenFields = [],
}: FormBuscarUser) {
  const schema = UserSchemas.filtrarUser;
  type FormData = z.infer<typeof schema>;

  const form = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      ...querys, // Garantindo que as queries passem para os valores padrão
      nome: querys.nome || "",
      email: querys.email || "",
    },
  });

  const shouldDisplay = (field: string) => !hiddenFields.includes(field);

  return (
    <Filtros route={route} form={form}>
      {shouldDisplay("nome") && (
        <FormField
          control={form.control}
          name="nome"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="nome" data-test="label-nome">
                Nome
              </FormLabel>
              <FormControl>
                <Input
                  id="nome"
                  placeholder="Nome"
                  value={field.value || ""}
                  onChange={field.onChange}
                  onBlur={field.onBlur}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      )}

      {shouldDisplay("email") && (
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="email" data-test="label-email">
                E-Mail
              </FormLabel>
              <FormControl>
                <Input
                  id="email"
                  placeholder="E-Mail"
                  value={field.value || ""}
                  onChange={(e) => field.onChange(e.target.value.trim())}
                  onBlur={field.onBlur}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      )}
    </Filtros>
  );
}