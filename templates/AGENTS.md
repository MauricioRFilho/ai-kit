# AGENTS.md — Padrão Base por Projeto

Este documento define o contrato operacional para agentes de IA e colaboradores humanos dentro deste repositório.

---

## 1. Princípios

- simplicidade primeiro
- clareza vence esperteza
- segurança desde o início
- performance pragmática
- documentação viva
- escopo controlado

---

## 2. Ordem de leitura obrigatória

Antes de sugerir qualquer mudança, ler nesta ordem:
1. `README.md`
2. `GLOBAL_AGENTS.md` se existir na máquina
3. `AGENTS.md`
4. `docs/product.md`
5. `docs/architecture.md`
6. `docs/backlog.md`
7. `docs/security.md`

Se não leu contexto, a resposta é incompleta.

---

## 3. Fluxo obrigatório

Toda execução deve seguir:

```txt
TASK.md -> PLAN.md -> implementação -> documentação -> ARCH_DECISIONS.md
```

---

## 4. Regras de implementação

### Deve
- resolver primeiro o fluxo principal
- propor a solução mais simples que funcione
- manter coesão por domínio
- tratar erros de forma previsível
- atualizar docs quando mudar estrutura ou fluxo
- respeitar padrões já existentes no projeto

### Não deve
- adicionar dependência sem justificativa
- reescrever código estável sem necessidade
- criar abstrações “para o futuro”
- introduzir infraestrutura complexa sem gargalo real
- aumentar escopo sem aprovação explícita

---

## 5. Dependências

Nunca adicionar dependência sem:
1. justificar necessidade
2. comparar com solução nativa
3. explicar impacto em manutenção, bundle, segurança e lock-in

---

## 6. Commits

Formato obrigatório:

```txt
feat: ...
fix: ...
refactor: ...
perf: ...
docs: ...
test: ...
chore: ...
```

---

## 7. Segurança mínima

Checklist:
- [ ] entradas validadas
- [ ] autenticação adequada
- [ ] autorização explícita
- [ ] hierarquia de permissao definida por papel e recurso
- [ ] secrets em variáveis de ambiente
- [ ] variaveis obrigatorias de producao verificadas
- [ ] logs sem dados sensíveis
- [ ] `.env.example` atualizado
- [ ] queries protegidas contra SQL injection
- [ ] rate limit ou mecanismo anti abuso aplicado
- [ ] timeouts e limites de payload definidos
- [ ] permissao do banco revisada com menor privilegio
- [ ] cenarios negativos e de abuso testados
- [ ] upload e webhook tratados com cuidado

Antes de considerar uma task pronta, revisar tambem:
- se a IA recebeu contexto suficiente de seguranca para implementar sem inventar defaults perigosos
- se a funcionalidade poderia ser abusada por script, bot ou usuario autenticado sem permissao
- se producao usa secrets, banco e configuracoes diferentes do ambiente local

---

## 8. Performance mínima

Checklist:
- [ ] paginação em listagens
- [ ] evitar N+1
- [ ] carregar apenas colunas necessárias
- [ ] medir antes de otimizar
- [ ] evitar trabalho duplicado no runtime

---

## 9. Critério de pronto

Uma entrega só está pronta quando:
- resolve o fluxo principal
- roda localmente
- está documentada
- tem tratamento de erro aceitável
- não depende de conhecimento escondido
- atende segurança mínima
- atende performance mínima do cenário atual
