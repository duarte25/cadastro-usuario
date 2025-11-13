"use client"

import { ViewContainer, ViewGrid, ViewGridContainer, ViewLabel, ViewText } from "@/components/View";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import SkeletonInformation from "@/components/Skeletons/SkeletonInformation";
import { DataContext } from "@/contexts/DataContext";
import ButtonLink from "@/components/ButtonLink";
import SubTitle from "@/components/SubTitle";
import { User } from "@/api/models/User";
import { useContext } from "react";

export default function InformationUser() {

  const context = useContext(DataContext);
  const user: User = context?.data;

  if (!user) {
    return <SkeletonInformation />;
  }

  return (
    <ViewGridContainer>

      {/* <Separator /> */}
      <div className="flex flex-col gap-4 sm:justify-between sm:flex-row">
        <SubTitle data-test="titulo-user">Informações do usuário</SubTitle>
        <ButtonLink
          href={"editar"}
          data-test="botao-editar-usuario"
        >
          Editar dados
        </ButtonLink>
      </div>

      <ViewGrid className="grid grid-cols-1 lg:grid-cols-3 xl:grid-cols-4 md:grid-cols-2" data-test="grid-usuario">
        <Avatar className={"border-x border-green-ninth rounded-full transition-all duration-300 h-48 w-48"}>
          <AvatarImage src={"https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png"} alt={"Usuário"} className="object-cover" />
          <AvatarFallback className="rounded-full"></AvatarFallback>
        </Avatar>

        <ViewContainer data-test="container-nome">
          <ViewLabel data-test="label-first-name">Primeiro nome</ViewLabel>
          <ViewText data-test="texto-first-name">{user.firstName}</ViewText>
        </ViewContainer>

          <ViewContainer data-test="container-nome">
          <ViewLabel data-test="label-last-name"> Último nome</ViewLabel>
          <ViewText data-test="texto-last-name">{user.lastName}</ViewText>
        </ViewContainer>

        <ViewContainer data-test="container-email">
          <ViewLabel data-test="label-email">E-Mail</ViewLabel>
          <ViewText data-test="texto-email">{user.email}</ViewText>
        </ViewContainer>

        <ViewContainer data-test="container-conta-ativa">
          <ViewLabel data-test="label-conta-ativa">Conta ativa</ViewLabel>
          <ViewText data-test="texto-conta-ativa">
            {user.isActive ? 'Sim' : 'Não'}
          </ViewText>
        </ViewContainer>

         <ViewContainer data-test="container-profile">
          <ViewLabel data-test="label-profile">Profile</ViewLabel>
          <ViewText data-test="texto-profile">{user?.profile?.name}</ViewText>
        </ViewContainer>
      </ViewGrid>
    </ViewGridContainer>
  );

}