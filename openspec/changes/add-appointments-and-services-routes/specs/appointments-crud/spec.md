## ADDED Requirements

### Requirement: Listar agendamentos do usuário autenticado
O sistema SHALL retornar apenas os agendamentos cujo `user_id` corresponde ao `id` do usuário extraído do token JWT.

#### Scenario: Listagem com agendamentos existentes
- **WHEN** `GET /api/appointments` é chamado com token válido
- **THEN** o sistema retorna `200` com array de agendamentos do usuário autenticado

#### Scenario: Listagem sem agendamentos
- **WHEN** `GET /api/appointments` é chamado e o usuário não tem agendamentos
- **THEN** o sistema retorna `200` com array vazio `[]`

#### Scenario: Requisição sem autenticação
- **WHEN** `GET /api/appointments` é chamado sem token
- **THEN** o sistema retorna `401`

### Requirement: Buscar agendamento por ID com validação de ownership
O sistema SHALL retornar um agendamento específico somente se ele pertencer ao usuário autenticado.

#### Scenario: Agendamento encontrado e pertence ao usuário
- **WHEN** `GET /api/appointments/:id` é chamado com token válido e `id` de um agendamento do usuário
- **THEN** o sistema retorna `200` com o objeto do agendamento

#### Scenario: Agendamento não encontrado ou não pertence ao usuário
- **WHEN** `GET /api/appointments/:id` é chamado com `id` inexistente ou de outro usuário
- **THEN** o sistema retorna `404` com `{ message: 'Agendamento não encontrado' }`

### Requirement: Criar agendamento com user_id do token
O sistema SHALL criar um agendamento vinculando automaticamente o `user_id` do token JWT, ignorando qualquer `user_id` enviado no body.

#### Scenario: Criação bem-sucedida
- **WHEN** `POST /api/appointments` é chamado com token válido e body `{ dia, hora }`
- **THEN** o sistema persiste o agendamento com `user_id` do token e retorna `201` com o objeto criado

#### Scenario: Criação sem autenticação
- **WHEN** `POST /api/appointments` é chamado sem token
- **THEN** o sistema retorna `401`

### Requirement: Atualizar agendamento com validação de ownership
O sistema SHALL permitir a atualização de `dia` e `hora` de um agendamento somente se ele pertencer ao usuário autenticado.

#### Scenario: Atualização bem-sucedida
- **WHEN** `PUT /api/appointments/:id` é chamado com token válido, `id` pertencente ao usuário e campos no body
- **THEN** o sistema atualiza o agendamento e retorna `200` com o objeto atualizado

#### Scenario: Agendamento não pertence ao usuário
- **WHEN** `PUT /api/appointments/:id` é chamado com `id` de outro usuário
- **THEN** o sistema retorna `404` com `{ message: 'Agendamento não encontrado' }`

### Requirement: Cancelar agendamento com validação de ownership
O sistema SHALL remover um agendamento somente se ele pertencer ao usuário autenticado.

#### Scenario: Cancelamento bem-sucedido
- **WHEN** `DELETE /api/appointments/:id` é chamado com token válido e `id` pertencente ao usuário
- **THEN** o sistema remove o agendamento e retorna `200` com `{ message: 'Agendamento cancelado com sucesso' }`

#### Scenario: Agendamento não pertence ao usuário
- **WHEN** `DELETE /api/appointments/:id` é chamado com `id` de outro usuário ou inexistente
- **THEN** o sistema retorna `404` com `{ message: 'Agendamento não encontrado' }`
