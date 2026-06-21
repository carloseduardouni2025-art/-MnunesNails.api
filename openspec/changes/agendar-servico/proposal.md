## Why

O frontend de agendamento expõe um formulário público (nome, WhatsApp, serviço, dia, horário, observações) para clientes marcarem um atendimento. Clientes sem cadastro são redirecionados para a tela de login/registro antes de confirmar. Ao criar o agendamento, o `user_id` do cliente autenticado é vinculado ao registro, permitindo que cada cliente veja apenas seus próprios agendamentos na página de conta.

## What Changes

- O endpoint `POST /api/appointments` já exige autenticação JWT — nenhuma rota pública é criada.
- O frontend verifica se o usuário está logado ao submeter o formulário; se não estiver, salva o rascunho em `sessionStorage` e redireciona para `login.html?mode=register&next=booking`.
- Após login ou cadastro, o usuário é devolvido para `index.html#agendamento` e o rascunho é restaurado automaticamente.
- O agendamento é sempre criado com `user_id` = ID do usuário autenticado (`req.user.id`).
- A listagem `GET /api/appointments` retorna apenas os agendamentos do próprio cliente para usuários com `role = 'client'`; admins veem todos.

## Capabilities

### New Capabilities

- `agendamento-autenticado`: Booking flow com autenticação — rascunho persistido, redirecionamento para login/cadastro e restauração pós-autenticação.

### Modified Capabilities

- `agendamento`: Agendamentos são sempre vinculados ao `user_id` do cliente autenticado; a listagem filtra por `user_id` para clientes.

## Impact

- **Sem arquivos novos**: toda a lógica já existe nos arquivos atuais.
- **Entity** `src/entities/Appointments.js` — coluna `user_id NOT NULL` com relação a `User` (já implementado).
- **Service** `src/services/AppointmentsService.js` — `createAppointment({ userId, ... })` e `listByUser(userId)` (já implementado).
- **Controller** `src/controllers/AppointmentsController.js` — `create` usa `req.user.id`; `list` usa `listByUser` para não-admins (já implementado).
- **Frontend** `script.js` — `requireAuthenticatedUser()`, `redirectToRegister()`, `restoreBookingDraft()` (já implementado).
- **Frontend** `login.js` — trata `mode=register` e `next=booking` com redirecionamento correto (já implementado).
- **Frontend** `agendamentos.js` — `loadSession()` redireciona para login se não autenticado; mostra apenas agendamentos do cliente (já implementado).
