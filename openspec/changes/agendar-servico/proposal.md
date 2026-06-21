## Why

O frontend de agendamento expõe um formulário público (nome, WhatsApp, serviço, dia, horário, observações) para clientes marcarem um atendimento sem precisar de login. Atualmente, todos os endpoints de agendamento exigem autenticação JWT e criar um agendamento não bloqueia automaticamente o slot de disponibilidade correspondente — criando risco de double-booking.

## What Changes

- Novo endpoint público `POST /api/agendamentos/publico` que recebe nome, WhatsApp, service_id, dia, hora e notas sem autenticar o cliente.
- O endpoint encontra ou cria automaticamente um usuário com role `client` pelo número de WhatsApp antes de criar o agendamento.
- Ao confirmar o agendamento, o slot de `Availability` correspondente (por `date` + `time`) é marcado como `available: false` para evitar double-booking.
- Ao cancelar um agendamento, o slot vinculado é devolvido como `available: true`.

## Capabilities

### New Capabilities

- `agendamento-publico`: Booking flow público — encontrar/criar usuário por WhatsApp, criar agendamento e bloquear slot de disponibilidade em uma única transação.

### Modified Capabilities

- `agendamento`: O fluxo de cancelamento passa a liberar o slot de disponibilidade vinculado ao agendamento cancelado.

## Impact

- **Novo**: `src/services/AgendamentoPublicoService.js` — orquestra find-or-create usuário + create appointment + block slot.
- **Novo**: `src/controllers/AgendamentoPublicoController.js` — handler HTTP para o endpoint público.
- **Novo**: `src/routes/agendamentoPublicoRoutes.js` + registro em `src/routes/index.js`.
- **Modificado**: `src/services/AppointmentsService.js` — `cancelAppointment` libera slot.
- **Sem migrations**: nenhuma coluna nova; integração usa entidades existentes (`Appointments`, `Availability`, `User`).
