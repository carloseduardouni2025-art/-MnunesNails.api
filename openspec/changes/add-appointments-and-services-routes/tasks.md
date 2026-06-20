## 1. Middleware de Autenticação JWT

- [x] 1.1 Criar `src/middleware/auth.js` que lê `Authorization: Bearer <token>`, verifica com `JWT_SECRET`, popula `req.user = { id, phone }` e retorna 401 em caso de ausência ou token inválido

## 2. Services — Camada de Serviço

- [x] 2.1 Criar `src/services/ServicesService.js` com método `listServices()` que retorna todos os registros da tabela `services`
- [x] 2.2 Adicionar método `findServiceById(id)` que retorna o serviço ou `null`
- [x] 2.3 Adicionar método `createService({ nome, price, description, time })` que persiste e retorna o novo serviço
- [x] 2.4 Adicionar método `updateService(id, data)` que atualiza os campos fornecidos e retorna o serviço atualizado ou `null`
- [x] 2.5 Adicionar método `deleteService(id)` que remove o serviço e retorna boolean indicando sucesso

## 3. Services — Controller e Rotas

- [x] 3.1 Criar `src/controllers/ServicesController.js` com métodos estáticos `list`, `findById`, `create`, `update`, `remove` que delegam ao `ServicesService` e tratam respostas HTTP
- [x] 3.2 Criar `src/routes/servicesRoutes.js` com `GET /` e `GET /:id` públicos, e `POST /`, `PUT /:id`, `DELETE /:id` protegidos pelo middleware `auth`
- [x] 3.3 Registrar `servicesRoutes` em `src/routes/index.js` no path `/api/services`

## 4. Appointments — Camada de Serviço

- [x] 4.1 Criar `src/services/AppointmentsService.js` com método `listByUser(userId)` que retorna agendamentos filtrados por `user_id`
- [x] 4.2 Adicionar método `findByIdAndUser(id, userId)` que retorna o agendamento somente se `user_id` coincidir, ou `null`
- [x] 4.3 Adicionar método `createAppointment({ userId, dia, hora })` que persiste com `user_id = userId` e retorna o agendamento criado
- [x] 4.4 Adicionar método `updateAppointment(id, userId, data)` que atualiza `dia`/`hora` com validação de ownership e retorna o objeto atualizado ou `null`
- [x] 4.5 Adicionar método `deleteAppointment(id, userId)` que remove com validação de ownership e retorna boolean

## 5. Appointments — Controller e Rotas

- [x] 5.1 Criar `src/controllers/AppointmentsController.js` com métodos estáticos `list`, `findById`, `create`, `update`, `remove` que delegam ao `AppointmentsService` e tratam respostas HTTP
- [x] 5.2 Criar `src/routes/appointmentsRoutes.js` com todos os 5 endpoints protegidos pelo middleware `auth`
- [x] 5.3 Registrar `appointmentsRoutes` em `src/routes/index.js` no path `/api/appointments`
