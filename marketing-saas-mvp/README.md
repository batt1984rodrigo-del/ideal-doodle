# Marketing SaaS MVP

MVP em **Next.js + Prisma + SQLite + OpenAI** para vender uma primeira versão de um SaaS de diagnóstico e geração de estratégia de marketing.

## O que já vem pronto

- landing simples
- login básico de admin
- dashboard
- criação de projetos
- geração com OpenAI via backend
- saída estruturada em JSON
- histórico das execuções
- banco local com Prisma

## Stack

- Next.js App Router
- TypeScript
- Prisma
- SQLite
- OpenAI API

## 1) Configuração

Copie o arquivo de ambiente:

```bash
cp .env.example .env
```

Preencha:

- `OPENAI_API_KEY`
- `OPENAI_MODEL`
- `ADMIN_EMAIL`
- `ADMIN_PASSWORD`
- `SESSION_SECRET`

## 2) Instalar dependências

```bash
npm install
```

## 3) Preparar banco

```bash
npx prisma generate
npx prisma db push
```

## 4) Rodar local

```bash
npm run dev
```

Abra:

```bash
http://localhost:3000
```

## Fluxo de uso

1. Faça login com o admin configurado no `.env`
2. Crie um projeto
3. Clique em **Gerar estratégia**
4. O sistema salva a execução e mostra a saída no dashboard

## Estrutura do MVP

```text
app/
  api/
    generate/route.ts
    login/route.ts
    logout/route.ts
  dashboard/
  login/
components/
lib/
prisma/schema.prisma
```

## O que eu recomendo como próximo upgrade para vender melhor

### Upgrade de produto
- auth multiusuário com Clerk ou Supabase Auth
- cobrança com Stripe
- onboarding por plano
- limite de execuções por assinatura
- exportar resposta em PDF / DOCX
- templates por nicho

### Upgrade técnico
- trocar SQLite por Postgres
- adicionar observabilidade
- registrar custo estimado por execução
- streaming de resposta
- fila para tarefas pesadas

## Modelo de venda inicial

**Promessa:**
Transforme briefing solto em diagnóstico, estratégia e conteúdo pronto para executar.

**Público inicial:**
- agências pequenas
- consultores
- times comerciais
- infoprodutores

**Planos sugeridos:**
- Starter
- Pro
- Agency

## Observação importante

Este MVP é o caminho mais curto para ir ao ar rápido.
Ele é ótimo para:
- validar demanda
- demonstrar para leads
- fechar os primeiros clientes
- aprender o que vender

Para produção real multiusuário, faça a próxima versão com:
- Postgres
- auth por usuário
- Stripe
- rate limiting
- logs por conta
