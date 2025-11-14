# Desafio Técnico Fullstack - Gerenciamento de Usuários

Este projeto é uma aplicação fullstack que implementa um sistema de gerenciamento de usuários, permitindo operações de CRUD, busca e filtragem.

## 💻 Funcionalidades Implementadas

A aplicação permite realizar as operações de um CRUD completo para usuários e seus perfis:

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
    -   Feedback visual para ações do usuário (loading, sucesso, erro).

## 🚀 Tecnologias Utilizadas

-   **Backend:**
    -   **Express.js:** Framework Node.js para construir APIs.
    -   **TypeScript:** Superset do JavaScript que adiciona tipagem estática.
    -   **Dados em Memória:** Os dados são mockados e gerenciados em memória para simplificar o setup.

-   **Frontend:**
    -   **Next.js:** Framework React para renderização no lado do servidor e geração de sites estáticos.
    -   **React:** Biblioteca para construir interfaces de usuário.
    -   **TypeScript:** Para um desenvolvimento mais seguro e robusto no frontend.
    -   **Tailwind CSS:** Framework de CSS utility-first para estilização rápida.
    -   **shadcn/ui:** Coleção de componentes de UI reutilizáveis.
    -   **TanStack Query (React Query):** Para gerenciamento de estado do servidor, cache e data fetching.

## ✨ Diferenciais

-   **Estrutura Clara:** O projeto é organizado de forma modular, separando claramente as responsabilidades entre frontend e backend, facilitando a manutenção e a evolução.
-   **Boas Práticas de Código:** Adoção de princípios de *Clean Code* e uma arquitetura bem definida em camadas para garantir um código legível, manutenível e de alta qualidade.

## 🧠 Decisões Técnicas e Pontos de Melhoria

### Decisões Tomadas

-   **Dados em Memória no Backend:** Para simplificar a configuração do ambiente de desenvolvimento e focar na lógica de negócio e na interação entre as camadas da aplicação, optei por mockar os dados e mantê-los em memória. Isso elimina a necessidade de configurar um banco de dados externo para a avaliação do desafio.
-   **Next.js com Tailwind CSS e shadcn/ui:** A escolha do Next.js proporciona uma base sólida e performática para o frontend. A combinação com Tailwind CSS e a biblioteca de componentes shadcn/ui permitiu criar uma interface moderna e responsiva.
-   **TanStack Query (React Query):** Utilizado para gerenciar o estado do servidor no frontend, simplificando o data fetching, o cache e a sincronização de dados, além de melhorar a experiência do usuário com features como `loading states` e `refetching`.

### Pontos de Melhoria e Evolução

-   **Persistência de Dados:** Substituir o armazenamento em memória por um banco de dados relacional (como PostgreSQL) ou NoSQL (como MongoDB) para garantir a persistência dos dados.
-   **Autenticação e Autorização:** Implementar um sistema de autenticação com JWT (JSON Web Tokens) para proteger as rotas da API e controlar o acesso com base nos perfis de usuário (Administrador, Usuário).
-   **Testes Automatizados:** Adicionar testes unitários e de integração no backend (com Jest/Supertest) e no frontend (com Cypress) para garantir a qualidade e a estabilidade da aplicação.
-   **Validação de Dados:** Aprimorar a validação dos dados de entrada na API utilizando bibliotecas como Zod para aumentar a segurança.

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
