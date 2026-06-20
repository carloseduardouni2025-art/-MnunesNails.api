## ADDED Requirements

### Requirement: Listar todos os serviços (público)
O sistema SHALL retornar todos os registros da tabela `services` sem exigir autenticação.

#### Scenario: Listagem com serviços cadastrados
- **WHEN** `GET /api/services` é chamado sem token
- **THEN** o sistema retorna `200` com array de objetos `{ id, nome, price, description, time, createdAt, updatedAt }`

#### Scenario: Listagem com tabela vazia
- **WHEN** `GET /api/services` é chamado e não há serviços cadastrados
- **THEN** o sistema retorna `200` com array vazio `[]`

### Requirement: Buscar serviço por ID (público)
O sistema SHALL retornar um serviço específico pelo `id` sem exigir autenticação.

#### Scenario: Serviço encontrado
- **WHEN** `GET /api/services/:id` é chamado com um `id` existente
- **THEN** o sistema retorna `200` com o objeto do serviço

#### Scenario: Serviço não encontrado
- **WHEN** `GET /api/services/:id` é chamado com um `id` inexistente
- **THEN** o sistema retorna `404` com `{ message: 'Serviço não encontrado' }`

### Requirement: Criar serviço (autenticado)
O sistema SHALL criar um novo serviço quando o usuário estiver autenticado e os campos obrigatórios forem fornecidos.

#### Scenario: Criação bem-sucedida
- **WHEN** `POST /api/services` é chamado com token válido e body `{ nome, price, description, time }`
- **THEN** o sistema persiste o serviço e retorna `201` com o objeto criado

#### Scenario: Criação sem autenticação
- **WHEN** `POST /api/services` é chamado sem token
- **THEN** o sistema retorna `401`

### Requirement: Atualizar serviço (autenticado)
O sistema SHALL atualizar os dados de um serviço existente quando o usuário estiver autenticado.

#### Scenario: Atualização bem-sucedida
- **WHEN** `PUT /api/services/:id` é chamado com token válido e campos a atualizar no body
- **THEN** o sistema atualiza o serviço e retorna `200` com o objeto atualizado

#### Scenario: Serviço não encontrado
- **WHEN** `PUT /api/services/:id` é chamado com `id` inexistente
- **THEN** o sistema retorna `404` com `{ message: 'Serviço não encontrado' }`

### Requirement: Deletar serviço (autenticado)
O sistema SHALL remover permanentemente um serviço quando o usuário estiver autenticado.

#### Scenario: Deleção bem-sucedida
- **WHEN** `DELETE /api/services/:id` é chamado com token válido e `id` existente
- **THEN** o sistema remove o serviço e retorna `200` com `{ message: 'Serviço removido com sucesso' }`

#### Scenario: Serviço não encontrado
- **WHEN** `DELETE /api/services/:id` é chamado com `id` inexistente
- **THEN** o sistema retorna `404` com `{ message: 'Serviço não encontrado' }`
