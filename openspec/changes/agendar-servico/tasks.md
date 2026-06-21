## 1. Serviço de Agendamento Público

- [ ] 1.1 Criar `src/services/AgendamentoPublicoService.js` com função `bookPublic({ name, whatsapp, service_id, dia, hora, notas })` que: (a) verifica se `service_id` é de serviço ativo, (b) faz find-or-create de `User` pelo `whatsapp`, (c) cria o `Appointment`, (d) bloqueia o slot de `Availability`
- [ ] 1.2 Implementar lógica find-or-create: buscar `User` por `whatsapp`; se não encontrado, criar com `name`, `whatsapp`, `phone = whatsapp`, `role = 'client'` e senha aleatória via `crypto.randomBytes`
- [ ] 1.3 Implementar bloqueio de slot: após criar appointment, buscar `Availability` por `{ date: dia, time: hora }` e atualizar `available = false` (sem erro se slot não existir)

## 2. Controller e Rota Pública

- [ ] 2.1 Criar `src/controllers/AgendamentoPublicoController.js` com handler `book(req, res)` que valida campos obrigatórios (`name`, `whatsapp`, `service_id`, `dia`, `hora`) e chama `AgendamentoPublicoService.bookPublic`
- [ ] 2.2 Retornar 400 se algum campo obrigatório estiver ausente, 404 se serviço não encontrado, 201 com DTO do agendamento em caso de sucesso
- [ ] 2.3 Criar `src/routes/agendamentoPublicoRoutes.js` com `POST /` sem middleware de auth
- [ ] 2.4 Registrar a rota em `src/routes/index.js` no prefixo `/api/agendamentos`

## 3. Integração de Cancelamento com Disponibilidade

- [ ] 3.1 Modificar `cancelAppointment(id)` em `src/services/AppointmentsService.js` para, após mudar status para `cancelado`, buscar o slot em `Availability` pelo `dia` + `hora` do agendamento e atualizar `available = true` (sem erro se slot não existir)

## 4. Validação Manual

- [ ] 4.1 Testar `POST /api/agendamentos/publico` com payload completo e verificar criação do agendamento e bloqueio do slot
- [ ] 4.2 Testar `POST /api/agendamentos/publico` com whatsapp já cadastrado e verificar reuso do usuário
- [ ] 4.3 Testar `POST /api/agendamentos/publico` com `service_id` inválido e verificar retorno 404
- [ ] 4.4 Testar `POST /api/appointments/:id/cancel` e verificar que o slot é liberado (`available = true`)
- [ ] 4.5 Testar `GET /api/availability?date=YYYY-MM-DD` e verificar que slot bloqueado não aparece como disponível
