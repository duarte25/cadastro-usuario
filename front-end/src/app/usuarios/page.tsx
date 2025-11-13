
import ContainerPageContent from "@/components/ContainerPageContentProps";
import DataTableUsers from "@/components/User/DataTableUsers";
import FormSearchUser from "@/components/User/FormBuscarUser";
import GetTableData from "@/components/GetTableData";
import { UserSchemas } from "@/schemas/UserSchemas";
import ButtonLink from "@/components/ButtonLink";
import { CirclePlus } from "lucide-react";
import Title from "@/components/Title";

export default async function User({ searchParams }: { searchParams: any }) {

  const querys = await searchParams;

  return (

    <ContainerPageContent>
      <div className="grid sm:flex items-center justify-center sm:justify-between">
        <Title>Usuários</Title>
        <ButtonLink className="bg-green-800" href={"/usuarios/cadastrar"}><CirclePlus /> Novo usuário</ButtonLink>
      </div>

      <FormSearchUser
        route={"/usuarios"}
        querys={querys}
      />

      <GetTableData
        TableComponent={DataTableUsers}
        querys={querys}

        route={"/users"}
        schema={JSON.parse(JSON.stringify(UserSchemas.filtrarUser))}
      />

    </ContainerPageContent>

  );
}