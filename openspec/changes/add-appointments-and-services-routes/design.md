## Context

O projeto segue um padrão bem definido: Entity (TypeORM EntitySchema) → Service (repositório + lógica) → Controller (métodos estáticos) → Route (Express Router) → index.js. As entidades `Services` e `Appointments` existem e as migrations já foram aplicadas, mas nenhuma camada de acesso via HTTP foi criada. O token JWT é gerado com payload `{ id, phone }` e assinado com `JWT_SECRET` do `.env`.

## Goals / Non-Goals

**Goals:**
- Expor CRUD completo para `Services` com GET público e mutações protegidas por JWT
- Expor CRUD completo para `Appointments` com todos os endpoints protegidos por JWT e com escopo por `user_id` vindo do token
- Criar middleware de autenticação reutilizável que popula `req.user`
- Manter 100% de compatibilidade com as rotas existentes (`/api/users`, `/api/auth`)

**Non-Goals:**
- Paginação ou filtros avançados nos endpoints de listagem
- Autorização por role (admin vs. cliente) — qualquer usuário autenticado pode criar/editar serviços
- Vínculo entre `Appointments` e `Services` (a entidade não possui `service_id` ainda)
- Upload de imagens ou assets para serviços

## Decisions

**1. Middleware JWT separado em `src/middleware/auth.js`**
Alternativa considerada: inline no route handler. Decisão: middleware separado porque será reutilizado por ambas as rotas e potencialmente por futuras. Extrai `req.user = { id, phone }` do token e chama `next()` ou retorna 401.

**2. `user_id` em Appointments vem do token, não do body**
Alternativa considerada: aceitar `user_id` no body. Decisão: sempre extrair do `req.user.id` para evitar que um usuário crie agendamentos em nome de outro. O body não deve incluir `user_id`.

**3. Validação de ownership em Appointments por query com `user_id`**
Para GET/:id, PUT/:id e DELETE/:id, a query inclui `{ id, user_id }`. Se não encontrar, retorna 404 — sem distinguir "não existe" de "não é seu", para não vazar informação.

**4. Services sem autenticação nos GETs**
Os endpoints `GET /api/services` e `GET /api/services/:id` são públicos para permitir que o front-end exiba o catálogo sem login. POST, PUT e DELETE exigem JWT.

**5. Seguir padrão de resposta existente**
- Sucesso: `res.json(data)` ou `res.status(201).json(data)`
- Erro: `res.status(X).json({ message: '...' })`
- Sem envelope adicional (sem `{ data: ... }` ou `{ success: true }`)

## Risks / Trade-offs

- **[Risco] Qualquer usuário autenticado pode criar/editar/deletar serviços** → Mitigação: documentado como decisão consciente; quando houver role de admin, basta trocar o middleware
- **[Risco] Appointments sem `service_id`** → Sem impacto agora; a entidade pode ser estendida em change futura
- **[Trade-off] 404 genérico em ownership check** → Perde-se observabilidade de erros de ownership, ganha-se segurança contra enumeração de IDs
