<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg" alt="Donate us"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow" alt="Follow us on Twitter"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

# JobFit AI

JobFit AI é uma aplicação back-end que integra inteligência artificial para ajudar candidatos e empresas a encontrar a combinação ideal de habilidades e oportunidades de emprego. Este projeto utiliza tecnologias modernas como NestJS, TypeORM, PostgreSQL e uma API de IA para análise de compatibilidade.

## Índice

- [Visão Geral](#visão-geral)
- [Status do Projeto](#status-do-projeto)
- [Funcionalidades](#funcionalidades)
- [Tecnologias Utilizadas](#tecnologias-utilizadas)
- [Configuração da API Key](#configuração-da-api-key)
- [Configuração e Execução](#configuração-e-execução)
- [Autenticação JWT](#autenticação-jwt)
- [Documentação](#documentação)
- [Contribuição](#contribuição)
- [Licença](#licença)
- [Autor](#autor)

---

## Visão Geral

O **JobFit AI** permite que:
- Usuários cadastrem suas habilidades.
- Empresas registrem vagas de emprego e os requisitos de habilidades para cada vaga.
- A análise de compatibilidade entre candidatos e vagas seja realizada utilizando IA (via API Gemini).

---

## Status do Projeto

O projeto **JobFit-AI** encontra-se em constante desenvolvimento, com novas funcionalidades sendo implementadas regularmente. Atualmente, a funcionalidade de análise de habilidades com integração de inteligência artificial está totalmente funcional, permitindo avaliar as compatibilidades entre candidatos e vagas com base nos dados fornecidos.


---

## Funcionalidades

1. **Autenticação JWT**:
   - Sistema de autenticação segura utilizando tokens JWT
2. **Gerenciamento de Usuários**:
   - Cadastro de usuários e suas habilidades.
3. **Gerenciamento de Vagas**:
   - Registro de vagas e suas respectivas habilidades necessárias.
4. **Análise de Compatibilidade**:
   - Integração com a API de IA para gerar uma análise detalhada sobre a adequação do candidato a uma vaga.
5. **Persistência de Dados**:
   - Todas as análises são salvas no banco de dados para consultas futuras.

---

## Tecnologias Utilizadas

- **Framework**: [NestJS](https://nestjs.com/)
- **Banco de Dados**: PostgreSQL
- **ORM**: TypeORM
- **Linguagem**: TypeScript
- **Integração de IA**: API Gemini
- **Gerenciamento de Dependências**: npm
- **Ferramentas de Teste**: Jest (em desenvolvimento)

---

## Configuração da API Key

- **Por que é necessário?**  
  O projeto utiliza a **Gemini AI** para análise de habilidades. Para que as requisições à API sejam processadas, é necessário obter uma API Key válida.

- **Como gerar sua API Key?**  
  1. Acesse [Google AI Studio](https://aistudio.google.com/app/apikey?hl=pt-br).
  2. Crie uma conta Google ou faça login.
  3. Clique em **Generate New Key**.
  4. Copie a chave gerada e cole no arquivo `.env` na variável `GEMINI_API_KEY`.

---

## Configuração e Execução

### Pré-requisitos

1. **Node.js**: versão 16 ou superior
2. **npm**: versão 8 ou superior
3. **PostgreSQL**: versão 12 ou superior
4. **Docker** (opcional, para ambiente de desenvolvimento)


### Passos para Executar

#### 1. Usando Docker (Recomendado)

1. Clone o repositório:
   ```bash
   git clone git@github.com:matheusrosa1/jobfit-ai.git
   cd jobfit-ai

2. Configure o arquivo .env na raiz do projeto com as seguintes variáveis:
   ```bash
    DB_USER=
    DB_PASSWORD=
    DB_HOST=
    DB_PORT=5432
    DB_NAME=
    PORT=
    GEMINI_API_KEY=

3. Rode o comando:

        docker-compose up --build

Esse comando vai criar e rodar o contêiner com as dependências do projeto configuradas. Após a execução, a API estará disponível em http://localhost:3000.
 
#### 2. Instalação Manual

Se preferir não usar Docker, siga os passos abaixo para configurar o ambiente manualmente:

1. Clone o repositório:
   ```bash
   git clone git@github.com:matheusrosa1/jobfit-ai.git
   cd jobfit-ai

2. Instale as depedências (o servidor é iniciado automaticamente)
   ```bash
   npm install

3. Configure o banco de dados (PostgreSQL)

- Siga as instruções completas de configuração do PostgreSQL no [guia de instalação do PostgreSQL](https://www.postgresql.org/download/).
- Crie um banco de dados `jobfit_ai` e um usuário com permissões.


4. Configure o arquivo .env na raiz do projeto com as seguintes variáveis:
   ```bash
    DB_USER=
    DB_PASSWORD=
    DB_HOST=
    DB_PORT=5432
    DB_NAME=
    PORT=
    GEMINI_API_KEY=


5. Inicie o servidor
    ```bash
    npm run start:dev

A API por padrão estará disponível em http://localhost:3000.

---

## Autenticação JWT

O **JobFit AI** utiliza autenticação baseada em **JSON Web Tokens (JWT)** para proteger as rotas da API.

### Funcionamento

1. Usuários podem obter um token de autenticação realizando login no endpoint `POST /auth` com um e-mail e senha válidos.
   - **E-mail e senha** devem ser de um usuário previamente cadastrado no sistema ou definido através das migrations.
2. O token retornado deve ser utilizado no cabeçalho `Authorization` para acessar as rotas protegidas.
3. O token é validado automaticamente em cada requisição protegida.

---

### Endpoint `POST /auth`

- **Descrição**: Realiza a autenticação do usuário e retorna um token JWT.
- **Requisição**:
  - **Método**: `POST`
  - **URL**: `/auth`
  - **Body** (JSON):
    ```json
    {
      "email": "user@example.com",
      "password": "password123"
    }
    ```
  - **Headers**: Não requer cabeçalhos adicionais na requisição inicial.

- **Resposta**:
  - **Status 200**: Login bem-sucedido, retorna o token JWT:
    ```json
    {
      "token": "eyJhbGciOiJIUzI1NiIsInR..."
    }
    ```

---

### Configuração do JWT

1. No arquivo `.env`, configure as seguintes variáveis:
   ```bash
   JWT_SECRET=<sua_chave_secreta>
   JWT_EXPIRATION=3600 # Tempo de expiração em segundos

2. O sistema verifica automaticamente a validade do token JWT nas rotas protegidas

### Requisição com Token

Exemplo de requisição a uma rota protegida com o token JWT:

- Cabeçalho da Requisição:
    ```bash
    Authorization: Bearer <seu_token_jwt>

---

## Documentação

Para acessar a documentação **Swagger** da API e verificar os endpoints disponíveis, acesse:

    http://localhost:3000/api

---

## Contribuição

Contribuições são bem-vindas! Siga os passos abaixo para contribuir:

1. Faça um fork do repositório


2. Crie uma branch para sua feature:

    ```bash
    git checkout -b minha-feature

3. Faça as alterações e comite

   ```bash
   git commit -m "Adiciona minha nova feature"

4. Envie as alterações

   ```bash
   git push origin minha-feature

5. Abra um Pull Request no repositório original.

  No título e na descrição do Pull Request, inclua detalhes sobre a mudança ou funcionalidade adicionada para facilitar a revisão.

---

## Licença

Esse projeto possui Licença [MIT](https://github.com/matheusrosa1/jobfit-ai?tab=MIT-1-ov-file).

---

## Autor

Esse projeto foi desenvolvido por Matheus Rosa.

Linkedin: https://www.linkedin.com/in/matheus-rosa-dev/

E-mail para contato: matheusrosataxa@gmail.com
