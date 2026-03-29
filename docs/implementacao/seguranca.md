---
title: Segurança
sidebar_position: 2
---

# Segurança

## 🔐 Estratégia de Segurança

### 1. Autenticação

#### JWT (JSON Web Tokens)
- **Access Token**: 24 horas de validade
- **Refresh Token**: 7 dias de validade
- **Secret Key**: Variável de ambiente

```javascript
const token = jwt.sign(
  { userId, perfil },
  process.env.JWT_SECRET,
  { expiresIn: '24h' }
);
```

#### Perfis de Acesso
- **ADMIN**: Acesso total
- **GERENTE**: Gestão e relatórios
- **RECEPCIONISTA**: Atendimento ao cliente
- **MECANICO**: Execução de serviços
- **ESTOQUISTA**: Gestão de estoque
- **FINANCEIRO**: Pagamentos e faturamento

### 2. Autorização

#### RBAC (Role-Based Access Control)
```javascript
const permissions = {
  ADMIN: ['*'],
  GERENTE: ['os:*', 'relatorios:*', 'usuarios:read'],
  MECANICO: ['os:read', 'os:update', 'servicos:*'],
  RECEPCIONISTA: ['clientes:*', 'os:create', 'os:read']
};
```

#### Middleware de Verificação
```javascript
const authorize = (requiredPermission) => {
  return (req, res, next) => {
    const userPermissions = getUserPermissions(req.user);
    if (!hasPermission(userPermissions, requiredPermission)) {
      return res.status(403).json({ error: 'Acesso negado' });
    }
    next();
  };
};
```

### 3. Validação de Dados

#### Input Validation
- **CPF/CNPJ**: Validação por algoritmo
- **Placa**: Formato Mercosul
- **Email**: RFC 5322 compliance
- **Telefone**: Formato E.164

#### Sanitização
- XSS Protection
- SQL Injection Prevention
- CSRF Tokens

### 4. Criptografia

#### Senhas
```javascript
const bcrypt = require('bcrypt');
const saltRounds = 12;

const hashSenha = await bcrypt.hash(senha, saltRounds);
const validSenha = await bcrypt.compare(senha, hashSenha);
```

#### Dados Sensíveis
- Criptografia de dados pessoais
- Mascaramento de informações
- Log sem dados sensíveis

### 5. Rate Limiting

```javascript
const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 100, // limite por IP
  message: 'Muitas requisições, tente novamente'
});
```

### 6. Monitoramento e Logs

#### Auditoria
- Registro de todas as ações
- Timestamp e usuário
- IP e dispositivo

#### Alertas
- Tentativas de invasão
- Acessos suspeitos
- Erros de autenticação

## 🛡️ Best Practices

1. **Princípio do Menor Privilégio**
2. **Validação em múltiplas camadas**
3. **Logs de segurança centralizados**
4. **Atualizações regulares de dependências**
5. **Testes de penetração periódicos**

---

*Esta seção será detalhada com implementações específicas e checklists de segurança.*
