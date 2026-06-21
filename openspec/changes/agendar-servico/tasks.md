## 1. Vinculação de user_id no Agendamento

- [x] 1.1 Entity `Appointments` tem coluna `user_id NOT NULL` com relação `many-to-one` para `User`
- [x] 1.2 `createAppointment({ userId, ... })` em `AppointmentsService` persiste `user_id` do usuário autenticado
- [x] 1.3 Controller `create` passa `req.user.id` como `userId`

## 2. Listagem por Cliente

- [x] 2.1 `listByUser(userId)` em `AppointmentsService` filtra agendamentos pelo `user_id`
- [x] 2.2 Controller `list` usa `listByUser(req.user.id)` para usuários com `role !== 'admin'`
- [x] 2.3 `agendamentos.html` exige autenticação via `loadSession()` — redireciona para `login.html` se sem token ou inválido
- [x] 2.4 Admins são redirecionados para `admin.html`; clientes ficam na página e veem apenas seus agendamentos

## 3. Fluxo de Redirecionamento para Login

- [x] 3.1 `requireAuthenticatedUser()` em `script.js` verifica `currentUser` antes de submeter
- [x] 3.2 `redirectToRegister()` salva rascunho em `sessionStorage` e redireciona para `login.html?mode=register&next=booking`
- [x] 3.3 `login.js` detecta `mode=register` e abre o formulário de cadastro automaticamente
- [x] 3.4 Após login/cadastro com `next=booking`, `login.js` redireciona para `index.html#agendamento`
- [x] 3.5 `restoreBookingDraft()` em `script.js` restaura o rascunho após autenticação

## 4. Validação Manual

- [ ] 4.1 Acessar `index.html` sem estar logado, preencher formulário e tentar confirmar — verificar redirecionamento para login/cadastro
- [ ] 4.2 Após cadastrar, verificar que o formulário é restaurado com dados do rascunho
- [ ] 4.3 Confirmar agendamento logado e verificar que aparece em `agendamentos.html` com os dados corretos
- [ ] 4.4 Verificar que dois clientes diferentes não veem os agendamentos um do outro
