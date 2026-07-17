# MiaDota – Sistema de Adoção Responsável de Animais

## Sobre o projeto

O **MiaDota** é uma aplicação Web desenvolvida com o objetivo de auxiliar o processo de adoção responsável de animais. O sistema permite o cadastro e gerenciamento de animais, organizações de proteção animal e visitas de possíveis adotantes, simulando o fluxo de adoção de forma simples e organizada.

O projeto foi desenvolvido para a disciplina de **Programação Back-end**, utilizando **NestJS** para a construção da API REST e uma interface Web em HTML, CSS e JavaScript para consumo dos serviços.

---

## Objetivos

- Facilitar o gerenciamento de animais disponíveis para adoção.
- Organizar visitas de interessados.
- Demonstrar o desenvolvimento de uma API REST utilizando NestJS.
- Aplicar boas práticas de organização em módulos, DTOs e validação de dados.

---

## Funcionalidades

### Adoção
- Cadastrar pedidos de adoção
- Listar processos de adoção
- Aprovar uma doção
- Rejeitar uma adoção

### Animais
- Cadastrar animais
- Listar animais cadastrados
- Buscar animal por ID
- Atualizar dados do animal
- Remover animal

### Organizações
- Cadastrar organizações de proteção animal
- Listar organizações
- Buscar organização por ID
- Atualizar dados
- Remover organização

### Visitas
- Agendar visitas para conhecer um animal
- Listar visitas
- Buscar visita por ID
- Atualizar informações da visita
- Cancelar visita
- Aprovar visita
- Rejeitar visita
- Concluir visita

### Health Check
- Endpoint para verificar se a API está em funcionamento.

---

## Tecnologias utilizadas

### Back-end

- NestJS
- TypeScript
- Node.js
- Docker

### Front-end

- HTML5
- CSS3
- JavaScript

---

## Estrutura do projeto

```
mia-dota/
│
├── backend/
│ ├── src/
│ │ ├── modules/
│ │ │ ├── animals/
│ │ │ ├── organizations/
│ │ │ ├── visits/
│ │ │ └── health/
│ │ ├── app.module.ts
│ │ └── main.ts
│ ├── Dockerfile
│ └── package.json
│
├── frontend/
│
└── docker-compose.yml
```

---

## Executando o projeto

### Instalar dependências

```bash
npm install
```

### Executar em desenvolvimento

```bash
npm run start:dev
```

### Executar com Docker

```bash
docker compose up --build
```

---

## API publicada

**Base URL**

```
https://mia-dota-syqr.onrender.com
```

### Health Check

```
https://mia-dota-syqr.onrender.com/health
```

### Endpoints principais

```
GET /adoptions
POST /adoption
PUT /adoptions/:id
PATCH /adoptions/:id
DELETE /adoptions/:id
```

```
GET /animals
POST /animals
PUT /animals/:id
PATCH /animals/:id
DELETE /animals/:id
```

```
GET /organizations
POST /organizations
PUT /organizations/:id
PATCH /organizations/:id
DELETE /organizations/:id
```

```
GET /visits
POST /visits
PUT /visits/:id
PATCH /visits/:id
DELETE /visits/:id
PATCH /visits/:id/aprovar
PATCH /visits/:id/rejeitar
PATCH /visits/:id/concluir
```

---

## Interface Web

A aplicação pode ser acessada em:

**Frontend**

```
https://mia-dota-front.onrender.com
```

---

## Integrantes

- Évelin de Souza Batista Silva (Responsável pelo backend)
- Janyelice Viviane Dantas Soares (Responsável pelo frontend)
- Maria Alice Medeiros Silva (Responsável pelo backend e deploy)

---
