"use client";

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { ApiErrorQuery, fetchUseQuery } from "@/api/services/fetchUseQuery";
import ContainerPageContent from "@/components/ContainerPageContentProps";
import ContainerFormFields from "@/components/ContainerFormFields";
import ContainerFormFooter from "@/components/ContainerFormFooter";
import { handleErrorMessages } from "@/errors/handleErrorMessage";
import ContainerFormPage from "@/components/ContainerFormPage";
import ComboboxDebounce from "@/components/ComboboxDebounce";
import ButtonLoading from "@/components/ButtonLoading";
import { useParams, useRouter } from "next/navigation";;
import { zodResolver } from "@hookform/resolvers/zod";
import { Separator } from "@/components/ui/separator";
import { DataContext } from "@/contexts/DataContext";
import { useMutation } from "@tanstack/react-query";
import { UserSchemas } from "@/schemas/UserSchemas";
import { Switch } from "@/components/ui/switch";
import { Profile } from "@/api/models/Profile";
import { Input } from "@/components/ui/input";
import SubTitle from "@/components/SubTitle";
import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { User } from "@/api/models/User";
import { toast } from "react-toastify";
import Title from "@/components/Title";
import { z } from "zod";
import actionRevalidateTag from "@/actions/actionRevalidateTag";

export default function EditUserPage() {

  const { slug } = useParams();

  const userData = useContext(DataContext)?.data || null;

  const router = useRouter();

  // Configuração do formulário
  const schema = UserSchemas.alterar;

  const formUser = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      firstName: userData?.firstName,
      lastName: userData?.lastName,
      email: userData?.email,
      isActive: userData?.isActive,
      profileId: userData?.profileId,
    },
  });

  console.log("OLHA O BODY", formUser.getValues())
  // console.log("OLHA O VALOR", estados)

  const [profile, setProfile] = useState<Profile>(userData?.profile);

  const { mutate, isPending } = useMutation({
    mutationFn: async (data: z.infer<typeof schema>) => {
      return await fetchUseQuery<typeof data, User>({
        route: `/users/${slug}`,
        method: "PATCH",
        data,
      });
    },
    onSuccess: async () => {
      await actionRevalidateTag("getUserID");
      toast.success("Usuário atualizado com sucesso!");
      router.replace(`/usuarios/${slug}/informacoes`);
    },
    onError: (error: ApiErrorQuery) => {
      if (Array.isArray(error.errors)) {
        handleErrorMessages(error.errors);
      }
    }
  });

  return (
    <ContainerPageContent>
      <ContainerFormPage>
        <Title className="pb-6">Editar Usuário</Title>
        {/* Formulário */}
        <Form {...formUser}>
          <form onSubmit={formUser.handleSubmit((values) => mutate(values))}>
            {/* Informações da Usuário */}
            <SubTitle>Informações da usuário</SubTitle>
            <Separator />
            <div className="flex flex-col md:flex-row lg:flex-row gap-6 w-full mt-2">
              <ContainerFormFields className={"grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 w-full"}>
                <FormField
                  control={formUser.control}
                  name="firstName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Primeiro nome <span className="text-red-600">*</span></FormLabel>
                      <FormControl>
                        <Input id="firstName" placeholder="Primeiro nome" {...field} value={field.value ?? ""}
                          onChange={(e) => field.onChange(e.target.value === "" ? null : e.target.value)} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={formUser.control}
                  name="lastName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Último nome <span className="text-red-600">*</span></FormLabel>
                      <FormControl>
                        <Input id="lastName" placeholder="Último nome" {...field} value={field.value ?? ""}
                          onChange={(e) => field.onChange(e.target.value === "" ? null : e.target.value)} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={formUser.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email <span className="text-red-600">*</span></FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Digite o email"
                          {...field}
                          onChange={(e) => field.onChange(e.target.value.trim())}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={formUser.control}
                  name="isActive"
                  render={({ field }) => (
                    <FormItem className="flex flex-col justify-center">
                      <FormLabel>Conta ativa <span className="text-red-600">*</span></FormLabel>
                      <FormControl>
                        <Switch checked={field.value} onCheckedChange={field.onChange} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={formUser.control}
                  name="profileId"
                  render={({ field }) => {
                    return (
                      <FormItem>
                        <FormLabel htmlFor="profileId">Profile  <span className="text-red-600">*</span></FormLabel>
                        <FormControl>
                          <ComboboxDebounce
                            route={"/profiles?nome"}
                            queryKey="profile"
                            multipleOption={false}
                            placeholderInputSearch={"Busque por profile"}
                            placeholderUnselected={"Selecione o profile"}
                            selecionado={profile}
                            setSelecionado={(value) => {
                              if (!value) {
                                field.onChange(null);
                                formUser.setValue("profileId", undefined);
                                return;
                              }

                              const body = value as { id: string; name: string };
                              field.onChange(body.id);
                              setProfile(body);
                              formUser.setValue("profileId", body.id);
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

              </ContainerFormFields>
            </div>

            {/* Botões */}
            <ContainerFormFooter>
              {/* <ButtonLink href="/">Voltar</ButtonLink> */}
              <ButtonLoading isLoading={formUser.formState.isSubmitting} type="submit" >
                Editar
              </ButtonLoading>
            </ContainerFormFooter>
          </form>
        </Form>
      </ContainerFormPage>
    </ContainerPageContent>
  );
}