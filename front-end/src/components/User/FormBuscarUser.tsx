"use client";

import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { UserSchemas } from "@/schemas/UserSchemas";
import ComboboxDebounce from "../ComboboxDebounce";
import { Profile } from "@/api/models/Profile";
import { Input } from "@/components/ui/input";
import Filtros from "@/components/Filtros";
import { useForm } from "react-hook-form";
import { useState } from "react";
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
      profileId: querys.profileId || "",
    },
  });

  const shouldDisplay = (field: string) => !hiddenFields.includes(field);

  const [profile, setProfile] = useState<Profile>();

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

      {shouldDisplay("profileId") && (
        <FormField
          control={form.control}
          name="profileId"
          render={({ field }) => {
            return (
              <FormItem>
                <FormLabel htmlFor="profileId">Profile</FormLabel>
                <FormControl>
                  <ComboboxDebounce
                    route={"/profiles?nome"}
                    queryKey="profile"
                    multipleOption={false}
                    removeOneOption={true}
                    placeholderInputSearch={"Busque por profile"}
                    placeholderUnselected={"Selecione o profile"}
                    selecionado={profile}
                    setSelecionado={(value) => {
                      if (!value) {
                        field.onChange(null);
                        setProfile(undefined);
                        return;
                      }

                      const body = value as { id: string; name: string };
                      field.onChange(body.id);
                      setProfile(body);
                    }}

                    selectedField={(selecionado) => {
                      const body = selecionado as unknown as { name: string };
                      return typeof selecionado === 'string' ? selecionado : body.name || "";
                    }}

                    visualizacao={profile?.name}

                    renderOption={(dados) => (
                      <span key={(dados as unknown as { id: string; name: string }).id}>
                        {typeof dados === 'string' ? dados : dados?.name}
                      </span>
                    )}
                  />
                </FormControl>
              </FormItem>
            );
          }}
        />
      )}
    </Filtros>
  );
}