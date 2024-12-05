# Projeto Wopus To-do (Avaliação Técnica)

Este projeto é uma aplicação full-stack composta por um **frontend** desenvolvido com **Next.js**, um **backend** criado com **NestJS**, e um banco de dados **PostgreSQL**.

## Tecnologias Utilizadas

- **Frontend**:
  - [Next.js](https://nextjs.org/): Framework React para construção de interfaces do usuário.
  - [React](https://reactjs.org/): Biblioteca JavaScript para construção de interfaces de usuário.
  - [Tailwind CSS](https://tailwindcss.com/): Framework CSS utilitário para estilização rápida e responsiva.
  - [ShadCN](https://github.com/shadcn/ui): Biblioteca de componentes de UI para criação rápida e moderna de interfaces.
  - [TypeScript](https://www.typescriptlang.org/): Superset do JavaScript para tipagem estática.
- **Backend**:
  - [NestJS](https://nestjs.com/): Framework para construção de aplicações escaláveis e eficientes com Node.js.
  - [Prisma](https://www.prisma.io/): ORM (Object-Relational Mapper) moderno e eficiente para integração com o PostgreSQL.
  - [class-validator](https://github.com/typestack/class-validator): Biblioteca para validar objetos, especialmente útil para validação de DTOs no NestJS.
  - [bcrypt](https://github.com/kelektiv/bcrypt.js): Biblioteca para criptografar e comparar senhas de usuários.
  - [jsonwebtoken (JWT)](https://github.com/auth0/node-jsonwebtoken): Biblioteca para gerar e validar tokens JWT para autenticação e proteção de rotas.
  - [Axios](https://axios-http.com/ptbr/docs/intro): Cliente HTTP baseado em Promises, usado para fazer requisições HTTP assíncronas para o backend.
- **Banco de Dados**:
  - [PostgreSQL](https://www.postgresql.org/): Banco de dados relacional robusto e de código aberto.

## Estrutura do Projeto

### Frontend (Next.js)

- O frontend é construído utilizando o Next.js, que fornece funcionalidades como renderização do lado do servidor (SSR), roteamento dinâmico e otimização automática de imagens.
- A interface de usuário é construída com React e estilizada com Tailwind CSS.
- Componentes da interface são criados utilizando a biblioteca **ShadCN** para garantir uma experiência de usuário moderna e responsiva.
- TypeScript é utilizado para fornecer tipagem estática e melhorar a manutenção do código.

### Backend (NestJS)

- O backend é desenvolvido usando o NestJS, um framework inspirado no Angular que facilita a criação de APIs escaláveis e organizadas.
- O NestJS é integrado com o PostgreSQL utilizando o Prisma, que é um ORM moderno e eficiente para interagir com o banco de dados.
- **class-validator** é utilizado para validar os DTOs, garantindo que os dados enviados nas requisições sejam corretos e no formato esperado.
- **bcrypt** é utilizado para criptografar as senhas dos usuários antes de armazená-las no banco de dados, além de ser utilizado para realizar comparações ao autenticar os usuários.
- **jsonwebtoken (JWT)** é utilizado para gerar tokens de autenticação para os usuários e proteger rotas sensíveis da API.

### Banco de Dados (PostgreSQL)

- O banco de dados PostgreSQL é utilizado para armazenar os dados da aplicação de forma segura e escalável.
- O Prisma gerencia as interações com o banco de dados de maneira eficiente.

## Como Rodar o Projeto

### 1. Configuração do Backend (NestJS)

#### Passos:

1. Clone o repositório do backend:

   ```bash
   git clone <repositório-backend-url>
   cd <pasta-backend>
   ```

2. Instale as dependências:

   ```bash
   npm install
   ```

3. Crie seu arquivo `.env` e adicione as seguintes credenciais:

- JWT_SECRET: Chave secreta para o JWT (use uma chave forte e segura)

- JWT_EXPIRATION_TIME: Tempo de expiração do JWT (exemplo: 1h para uma hora)

- DATABASE_URL: URL de conexão com o banco de dados PostgreSQL

- O Arquivo deve ficar na seguinte forma

  ```env
  JWT_SECRET=chavesecreta
  JWT_EXPIRATION_TIME=3600
  DATABASE_URL="postgresql://usuario:senha@localhost:5432/nome-do-banco?schema=public"
  ```

4. Execute as migrations com o Prisma:

   ```bash
   npx prisma migrate dev
   ```

   - Após isso será criado um usuário e tarefa associada a esse usuário. Também é possivel acessar
     a aplicação, cadastrando um novo usuário, caso seja preferível.

5. Inicie o servidor:
   ```bash
   npm run start:dev
   ```

O backend estará rodando em `http://localhost:3000`.

### 2. Configuração do Frontend (Next.js)

#### Passos:

1. Clone o repositório do frontend:

   ```bash
   git clone <repositório-frontend-url>
   cd <pasta-frontend>
   ```

2. Instale as dependências:

   ```bash
   npm install
   ```

3. Crie seu arquivo `.env` e adicione as seguintes credenciais:

- NEXT_PUBLIC_API_URL: url customizado para que o axios execute as requisicoes

- O Arquivo deve ficar na seguinte forma

  ```env
  NEXT_PUBLIC_API_URL=http://localhost:3000
  ```

4. Inicie o servidor de desenvolvimento:
   ```bash
   npm run dev
   ```

O frontend estará rodando em `http://localhost:3001`.

### 3. Configuração do Banco de Dados (PostgreSQL)

Caso você ainda não tenha o PostgreSQL configurado:

1. Instale o PostgreSQL em sua máquina ou use um serviço em nuvem (como o [ElephantSQL](https://www.elephantsql.com/)).
2. Crie um banco de dados e configure as credenciais no arquivo `.env` do backend.
3. As migrations serão aplicadas automaticamente ao rodar o backend.
