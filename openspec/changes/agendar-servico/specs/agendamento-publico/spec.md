## ADDED Requirements

### Requirement: Booking público sem autenticação
O sistema SHALL aceitar requisições de agendamento via `POST /api/agendamentos/publico` sem exigir token JWT. O corpo da requisição MUST conter: `name` (string), `whatsapp` (string), `service_id` (number), `dia` (string YYYY-MM-DD), `hora` (string HH:MM), `notas` (string opcional).

#### Scenario: Agendamento criado com sucesso para cliente novo
- **WHEN** o cliente envia nome, whatsapp, service_id, dia e hora válidos e não existe usuário com aquele whatsapp
- **THEN** o sistema cria um novo `User` com role `client`, cria o `Appointment` vinculado a esse usuário, retorna 201 com os dados do agendamento

#### Scenario: Agendamento criado com sucesso para cliente existente
- **WHEN** o cliente envia um whatsapp que já está cadastrado no banco
- **THEN** o sistema reutiliza o `User` existente, cria o `Appointment` vinculado a ele, retorna 201 com os dados do agendamento

#### Scenario: Slot de disponibilidade bloqueado ao agendar
- **WHEN** existe um slot em `Availability` com `date = dia` e `time = hora`
- **THEN** o sistema atualiza esse slot para `available = false` após criar o agendamento

#### Scenario: Slot inexistente não impede o agendamento
- **WHEN** não existe slot em `Availability` para o par `dia` + `hora` informado
- **THEN** o sistema cria o agendamento normalmente e retorna 201 sem erro

#### Scenario: Campos obrigatórios ausentes
- **WHEN** `name`, `whatsapp`, `service_id`, `dia` ou `hora` estiver ausente no corpo da requisição
- **THEN** o sistema retorna 400 com mensagem descrevendo o campo faltante

#### Scenario: Serviço inexistente
- **WHEN** o `service_id` informado não corresponde a nenhum serviço ativo no banco
- **THEN** o sistema retorna 404 com mensagem `"Serviço não encontrado"`

### Requirement: Consulta de horários disponíveis por data
O sistema SHALL permitir que o cliente consulte horários disponíveis via `GET /api/availability?date=YYYY-MM-DD` sem autenticação, retornando apenas slots onde `available = true`.

#### Scenario: Slots disponíveis retornados por data
- **WHEN** o cliente faz GET em `/api/availability?date=2026-06-25`
- **THEN** o sistema retorna array de slots com `available = true` para aquela data, ordenados por `time`

#### Scenario: Nenhum slot disponível na data
- **WHEN** não existem slots cadastrados para a data informada ou todos estão com `available = false`
- **THEN** o sistema retorna array vazio `[]`
