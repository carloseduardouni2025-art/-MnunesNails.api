## ADDED Requirements

### Requirement: Middleware extrai identidade do token JWT
O sistema SHALL verificar o header `Authorization: Bearer <token>` em toda requisição que chegar a uma rota protegida. O token SHALL ser validado com `JWT_SECRET` e, se válido, o payload `{ id, phone }` SHALL ser disponibilizado em `req.user` antes de chamar `next()`.

#### Scenario: Token válido permite acesso
- **WHEN** a requisição contém `Authorization: Bearer <token_válido>`
- **THEN** o middleware popula `req.user` com `{ id, phone }` e chama `next()`

#### Scenario: Token ausente retorna 401
- **WHEN** a requisição não contém o header `Authorization`
- **THEN** o middleware retorna `401` com `{ message: 'Token não fornecido' }`

#### Scenario: Token inválido ou expirado retorna 401
- **WHEN** a requisição contém um token malformado ou expirado
- **THEN** o middleware retorna `401` com `{ message: 'Token inválido' }`
