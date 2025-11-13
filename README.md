# Desafio Técnico Fullstack - Gerenciamento de Usuários

Este projeto é uma aplicação fullstack desenvolvida como parte de um desafio técnico. O objetivo é criar um sistema simples para o gerenciamento de usuários e seus perfis.

## 💻 Funcionalidades Implementadas

A aplicação permite realizar as seguintes operações:

-   **Gerenciamento de Usuários:**
    -   Criar, editar e remover usuários.
    -   Listar todos os usuários com paginação.
    -   Ativar e desativar um usuário específico.
-   **Busca e Filtragem:**
    -   Buscar um usuário pelo seu ID.
    -   Filtrar a lista de usuários por nome ou email.
    -   Filtrar usuários com base no seu perfil (ex: Administrador, Usuário).
-   **Interface Intuitiva:**
    -   Frontend reativo que consome a API do backend para exibir e manipular os dados.
    -   Componentes reutilizáveis.

## 🚀 Tecnologias Utilizadas

-   **Backend:**
    -   **Express.js:** Framework Node.js para construir APIs.
    -   **TypeScript:** Superset do JavaScript que adiciona tipagem estática.
    -   **Dados em Memória:** Todos os dados são mockados e gerenciados em memória, sem a necessidade de um banco de dados.

-   **Frontend:**
    -   **Next.js:** Framework React para renderização no lado do servidor e geração de sites estáticos.
    -   **React:** Biblioteca para construir interfaces de usuário.
    -   **TypeScript:** Para um desenvolvimento mais seguro e robusto no frontend.
    -   **Tailwind CSS:** Framework de CSS utility-first para estilização rápida.
    -   **Shadcn/ui:** Coleção de componentes de UI reutilizáveis.
    -   **TanStack Query (React Query):** Para gerenciamento de estado do servidor, cache e data fetching.

## ⚙️ Como Rodar a Aplicação

Para executar o projeto localmente, siga os passos abaixo.

### Pré-requisitos

-   [Node.js](https://nodejs.org/en/) (versão 18.x ou superior)
-   [Yarn](https://yarnpkg.com/) ou [NPM](https://www.npmjs.com/)
-   [Docker](https://www.docker.com/)

###

### 1. Backend

```bash
docker compose up --build -d

# O backend estará rodando em http://localhost:3020
# O frontend estará rodando em http://localhost:3000
