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
- [Funcionalidades](#funcionalidades)
- [Tecnologias Utilizadas](#tecnologias-utilizadas)
- [Configuração e Execução](#configuração-e-execução)
- [Documentação](#documentação)
- [Contribuição](#contribuição)
- [Licença](#licença)

---

## Visão Geral

O **JobFit AI** permite que:
- Usuários cadastrem suas habilidades.
- Empresas registrem vagas de emprego e os requisitos de habilidades para cada vaga.
- A análise de compatibilidade entre candidatos e vagas seja realizada utilizando IA (via API Gemini).

---

## Funcionalidades

1. **Gerenciamento de Usuários**:
   - Cadastro de usuários e suas habilidades.
2. **Gerenciamento de Vagas**:
   - Registro de vagas e suas respectivas habilidades necessárias.
3. **Análise de Compatibilidade**:
   - Integração com a API de IA para gerar uma análise detalhada sobre a adequação do candidato a uma vaga.
4. **Persistência de Dados**:
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

## Configuração e Execução

### Pré-requisitos

1. **Node.js**: versão 16 ou superior
2. **npm**: versão 8 ou superior
3. **PostgreSQL**: versão 12 ou superior
4. **Docker** (opcional, para ambiente de desenvolvimento)

### Passos para Executar

1. Clone o repositório:
   ```bash
   git clone https://github.com/matheus-rosa1/jobfit-ai.git
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


2. Instale as depedências (o servidor é iniciado automaticamente)
   ```bash
   docker compose up --build

3. Acesse a API em:

        http://localhost:3000

## Documentação

Para acessar a documentação Swagger da API acesse:

     http://localhost:3000/api

## License

Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).
