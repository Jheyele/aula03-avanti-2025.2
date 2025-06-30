# 🚀 Projeto API - Gerenciamento de Usuários e Tecnologias

Este é um projeto **didático** desenvolvido como parte das aulas do **Avanti Bootcamp DFS-2025.2**.  
Foi utilizado para fins de **demonstração prática** em sala, com foco em construção de APIs com Node.js, autenticação e uso de ORM.

---

## Objetivo

Permitir que usuários sejam cadastrados, listados, atualizados e removidos, bem como associar tecnologias a esses usuários.

---

## Como Rodar o Projeto

### 1. Clone o repositório e instale as dependências:

```bash
git clone git@github.com:Jheyele/aula03-avanti-2025.2.git
cd seu-repo
npm install
```

### 2. Configure o banco de dados:

Crie um arquivo `.env` na raiz com o seguinte conteúdo:

```
DATABASE_URL=postgresql://usuario:senha@localhost:5432/seubanco
SECRET_JWT=sua_chave_secreta
```

### 3. Rode as migrations do Prisma:

```bash
npx prisma migrate dev
npx prisma generate
```

### 4. Inicie o servidor:

```bash
npm start
```

---

## Bootcamp

Projeto de apoio para as aulas práticas do **Avanti Bootcamp DFS-2025.2**.