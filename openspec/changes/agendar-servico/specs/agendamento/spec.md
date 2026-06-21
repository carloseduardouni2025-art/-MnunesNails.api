## MODIFIED Requirements

### Requirement: Cancelamento libera slot de disponibilidade
Ao cancelar um agendamento via `POST /api/appointments/:id/cancel`, o sistema SHALL atualizar o status do agendamento para `cancelado` E SHALL liberar o slot de `Availability` correspondente (`date = dia`, `time = hora`) marcando-o como `available = true`.

#### Scenario: Slot liberado ao cancelar agendamento com slot vinculado
- **WHEN** um agendamento com `dia` e `hora` válidos é cancelado e existe slot em `Availability` para aquele par
- **THEN** o sistema muda o status do agendamento para `cancelado` e atualiza `Availability.available = true` para o slot correspondente

#### Scenario: Cancelamento bem-sucedido mesmo sem slot vinculado
- **WHEN** um agendamento é cancelado mas não existe slot em `Availability` para aquele `dia` + `hora`
- **THEN** o sistema muda o status do agendamento para `cancelado` e retorna 200 sem erro
