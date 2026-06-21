## Context

A API usa Express + TypeORM + PostgreSQL. Já existem as entidades `User`, `Appointments`, `Availability` e `Services`. Todos os endpoints de agendamento atualmente exigem JWT, e a criação de um agendamento não interage com a tabela `Availability`. O frontend expõe um formulário público onde o cliente informa nome, WhatsApp, serviço, dia e horário — sem fluxo de login.

## Goals / Non-Goals

**Goals:**
- Expor `POST /api/agendamentos/publico` sem autenticação.
- Encontrar ou criar usuário pelo WhatsApp antes de salvar o agendamento.
- Bloquear o slot de `Availability` (`available = false`) ao confirmar o agendamento.
- Liberar o slot (`available = true`) ao cancelar o agendamento.

**Non-Goals:**
- Alterar o fluxo autenticado existente (`POST /api/appointments`).
- Criar novo schema de banco ou migrations.
- Enviar notificações (WhatsApp/e-mail) — pode ser adicionado futuramente.
- Suporte a múltiplos slots por serviço (duração multi-slot).

## Decisions

### 1. Endpoint separado em vez de abrir o existente
`POST /api/agendamentos/publico` é uma rota nova, sem tocar no `POST /api/appointments` autenticado.  
**Alternativa descartada**: remover o middleware `auth` da rota existente — quebraria a resolução de `req.user` usada no controller atual e afetaria o endpoint autenticado.

### 2. Find-or-create de usuário por WhatsApp
Se já existe um `User` com o `whatsapp` informado, reutiliza o `user_id`. Caso contrário, cria um novo com `role = 'client'` e senha aleatória (o cliente nunca usa login direto por esse fluxo).  
**Alternativa descartada**: exigir cadastro prévio — adiciona fricção desnecessária no fluxo de atendente/cliente.

### 3. Bloqueio de slot via look-up por `date` + `time`
Após criar o agendamento, busca o slot em `Availability` onde `date = dia` e `time = hora` e marca `available = false`.  
Se nenhum slot for encontrado para aquele par, a operação continua sem erro (slot pode não ter sido gerado pelo admin ainda).  
**Alternativa descartada**: validar obrigatoriamente a existência do slot — adiciona complexidade desnecessária se o admin configurar slots depois.

### 4. Liberação de slot no cancelamento
`cancelAppointment` em `AppointmentsService` passa a buscar e liberar o slot correspondente ao `dia` + `hora` do agendamento cancelado.  
Isso é feito no mesmo serviço para manter coesão, sem necessidade de transaction explícita (risco de inconsistência é baixo).

### 5. Sem migration
Todas as entidades necessárias já existem. Nenhuma coluna ou tabela nova é criada.

## Risks / Trade-offs

- **Double-booking em condição de corrida** → Sem lock de banco, dois requests simultâneos para o mesmo slot podem ambos passar. Mitigação: risco baixo para o volume atual de uma manicure individual; pode ser resolvido com `SELECT FOR UPDATE` futuramente.
- **Usuário duplicado** → Se dois requests com mesmo WhatsApp chegam simultaneamente antes do registro ser persistido, podem criar dois users. Mitigação: adicionar índice `UNIQUE` na coluna `whatsapp` (já existe pela migration 1780530967991) — o segundo request falhará com erro de constraint e retornará 409.
- **Slot não encontrado** → Se o admin não gerou slots para a data/hora escolhida, o agendamento é criado sem bloquear nada. Mitigação: o frontend valida horários disponíveis antes de submeter via `GET /api/availability?date=`.
