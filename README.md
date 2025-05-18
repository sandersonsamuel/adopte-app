# Adote.me Monorepo 🐾

Este é um monorepo gerenciado com [Turborepo](https://turbo.build/repo), contendo uma aplicação web em **Next.js** e uma API backend em **NestJS**, com banco de dados gerenciado via **Prisma ORM**.

## 📁 Estrutura do Projeto

```
adote.me/
├── apps/
│   ├── web/         # Frontend com Next.js
│   └── api/         # Backend com NestJS
├── packages/
│   └── database/    # Módulo compartilhado com Prisma (schema.prisma)
├── turbo.json       # Configurações do Turborepo
├── package.json     # Configuração raiz e comandos
```

## 🚀 Tecnologias Utilizadas

- [Turborepo](https://turbo.build/)
- [Next.js](https://nextjs.org/)
- [NestJS](https://nestjs.com/)
- [Prisma ORM](https://www.prisma.io/)
- [PNPM](https://pnpm.io/)

## 📦 Instalação

```bash
# Instale as dependências
pnpm install
```

## 🔧 Scripts Disponíveis

```bash
# Iniciar ambiente de desenvolvimento
pnpm dev

# Gerar artefatos do Prisma (cliente)
pnpm db:generate

# Executar migrações no ambiente de desenvolvimento
pnpm db:migrate

# Aplicar migrações no ambiente de produção
pnpm db:deploy

# Abrir o Prisma Studio (GUI para o banco)
pnpm db:studio
```

## 🛠 Turborepo

As tarefas definidas no `turbo.json` incluem:

- `build`: compila os apps respeitando dependências.
- `dev`: inicia ambos os apps em modo desenvolvimento.
- `check-types`: checagem de tipos com TypeScript.
- Comandos relacionados ao banco (`db:*`): não usam cache, permitindo sempre ações atualizadas.

## ✅ Requisitos

- Node.js 18+
- PNPM 10+
- Banco de dados configurado (ver `schema.prisma` em `packages/database`)
- Docker (opcional, se usar banco em contêiner)

## 🐘 Banco de Dados com Docker

O projeto inclui um arquivo `docker-compose.yml` que sobe um serviço PostgreSQL para uso com a aplicação:

```yaml
services:
  db:
    image: postgres
    container_name: adopte-me
    env_file:
      - .env
    ports:
      - "5432:5432"
    volumes:
      - pg_data:/var/lib/postgresql/data

volumes:
  pg_data:
```

### 🔐 Variáveis de Ambiente

Antes de rodar a aplicação com o banco de dados, copie o arquivo `.env.example` para `.env` e configure os valores conforme necessário:

```env
POSTGRES_PASSWORD=postgres
POSTGRES_USER=postgres
POSTGRES_HOST=localhost
POSTGRES_DB=postgres

DATABASE_URL="postgresql://postgres:postgres@localhost:5432/postgres"
SUPABASE_KEY=
SUPABASE_URL=
PASSWORD_SUPABASE_ADOPTE=

NEXT_PUBLIC_SUPABASE_KEY=
NEXT_PUBLIC_SUPABASE_URL=

NEXT_PUBLIC_API_URL=http://localhost:5400
CLIENT_URL=http://localhost:3000

JWT_SECRET=
JWT_EXPIRATION_TIME=3600
```

## ✨ Contribuindo

Sinta-se à vontade para abrir issues ou pull requests com sugestões, correções ou melhorias!

---

Feito com 💙 para ajudar animais a encontrarem um lar.
