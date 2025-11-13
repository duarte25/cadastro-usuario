import ContainerPageContent from "@/components/ContainerPageContentProps";
import { DataContextProvider } from "@/contexts/DataContext";
import { UserSchemas } from "@/schemas/UserSchemas";
import { fetchApi } from "@/api/services/fetchApi";
import ButtonLink from "@/components/ButtonLink";
import TabsLink from "@/components/TabsLink";
import Title from "@/components/Title";

// Defina a interface para os parâmetros esperados
interface LayoutUsuarioPageProps {
  children: React.ReactNode;
  params: Promise<{ slug: string }>; 
}

export default async function LayoutUsuarioPage({
  children,
  params,
}: LayoutUsuarioPageProps) {

  // Resolva a Promise `params` para acessar o `slug`
  const { slug } = await params;

  // Chamada à API para obter os dados do usuário com base no `slug`
  const response = await fetchApi<null, typeof UserSchemas.buscarUser>({
    route: `/users/${slug}`,
    method: "GET",
    data: null,
    nextOptions: {
      tags: ["getUserID"],
    },
  });

  if (response.error) {
    throw new Error("Falha ao buscar dados do usuário.");
  }

  // Criação da URL do link dinâmico para o usuário
  const link = `/users/${slug}`;

  // Definição dos triggers para a navegação nas tabs
  const triggers = [
    { id: 1, href: `${link}/informacoes`, value: "informacoes", label: "Informações" },
  ];

  return (
    <ContainerPageContent>
      <div className="w-full flex">
        <ButtonLink showIcon={true} data-test="botao-voltar">
          Voltar
        </ButtonLink>
      </div>

      <div className="flex flex-col gap-2" data-test="usuario-informacoes">
        <Title data-test="usuario-model">Usuário</Title>
      </div>

      {/* Exibindo os links de navegação das tabs */}
      <TabsLink triggers={triggers} />

      {/* Passando os dados do usuário para os filhos */}
      <DataContextProvider data={response.data}>
        {children}
      </DataContextProvider>
    </ContainerPageContent>
  );
}