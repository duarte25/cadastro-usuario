"use client";

import React, { ReactNode, useTransition } from "react";
import { createURLSearch } from "@/utils/createURLSearch";
import { useRouter } from "next/navigation";
import ButtonLoading from "./ButtonLoading";
import { Search } from "lucide-react";
import { Form } from "./ui/form";

interface FiltrosProps {
  route: string;
  form: any; // Defina o tipo do 'form' conforme necessário
  children: ReactNode;
}

export default function Filtros({ route, form, children }: FiltrosProps) {
  const router = useRouter();
  const [isSearching, startSearching] = useTransition();

  const filter = (data: unknown) => {

    if (data) {
      const urlSearch = createURLSearch({
        route: `${route}`, // A rota onde você quer gerar a URL
        data: {
          querys: { ...data, pagina: 1 },  // Dados de query dentro de 'querys'
          hiddenQuerys: {},  // Caso tenha querys ocultas
        },
      });
      router.replace(urlSearch);
    } else {
      console.log("Nenhum dado recebido para a busca");
    }
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();  // Não faça isso, o handleSubmit já lida com o preventDefault

    // Usando form.getValues() para pegar os dados do formulário
    const data = form.getValues();  // Captura os dados do formulário

    filter(data);  // Passa os dados para a função filter
  };

  return (
    <Form {...form} data-test="form-filtros">
      <form onSubmit={onSubmit}>
        <section className="w-full p-4 shadow border rounded-md bg-blue-100/10">
          <div className="grid grid-cols-1 2xl:grid-cols-4 xl:grid-cols-3 md:grid-cols-2 gap-2 text-primaryDark">
            {children}
            <div className="grid items-end justify-self-end cold-end-auto md:col-end-3 xl:col-end-4 mt-2 2xl:col-end-5">
              <ButtonLoading
                isLoading={isSearching}
                className="bg-green-seventh"
                title={"Realizar busca"}
                data-test="botao-filtrar"
                size="default"
              >
                <Search className='mr-2 h-4 w-4' />
                Pesquisar
              </ButtonLoading>
            </div>
          </div>
        </section>
      </form>
    </Form>
  );
}