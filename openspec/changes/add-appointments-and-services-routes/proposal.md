## Why

O projeto MnunesNails já possui as entidades `Appointments` e `Services` com migrations aplicadas, mas não há rotas, controllers ou service layer para essas entidades — tornando-as inacessíveis via API. Essa lacuna impede que o front-end gerencie serviços do salão e que clientes criem agendamentos.

## What Changes

- Criar middleware JWT (`src/middleware/auth.js`) para proteger rotas que exigem autenticação
- Criar `ServicesService.js` com operações CRUD sobre a entidade `Services`
- Criar `ServicesController.js` com métodos estáticos para lidar com as requisições HTTP
- Criar `servicesRoutes.js` com 5 endpoints REST (GET público, mutações protegidas por JWT)
- Criar `AppointmentsService.js` com operações CRUD com escopo por `user_id`
- Criar `AppointmentsController.js` com métodos estáticos
- Criar `appointmentsRoutes.js` com 5 endpoints REST, todos protegidos por JWT
- Registrar as novas rotas em `src/routes/index.js`

## Capabilities

### New Capabilities

- `services-crud`: Gerenciamento de serviços do salão — listagem pública e criação/edição/exclusão protegidas por JWT
- `appointments-crud`: Gerenciamento de agendamentos por usuário autenticado — criação, listagem própria, edição e cancelamento com validação de ownership
- `jwt-auth-middleware`: Middleware de autenticação que extrai `userId` e `phone` do token JWT e disponibiliza em `req.user`

### Modified Capabilities

## Impact

- **Novos arquivos**: `src/middleware/auth.js`, `src/services/ServicesService.js`, `src/controllers/ServicesController.js`, `src/routes/servicesRoutes.js`, `src/services/AppointmentsService.js`, `src/controllers/AppointmentsController.js`, `src/routes/appointmentsRoutes.js`
- **Arquivo modificado**: `src/routes/index.js` (registro das novas rotas)
- **APIs expostas**: `/api/services` (5 endpoints) e `/api/appointments` (5 endpoints)
- **Sem breaking changes**: rotas existentes de `/api/users` e `/api/auth` não são afetadas
