# GLOBAL_AGENTS.md

Este documento define o padrão GLOBAL obrigatório para qualquer projeto desenvolvido com auxílio de IA nesta máquina.

Ele deve ser lido e seguido antes de qualquer geração de código, sugestão ou alteração.

---

## 1. Objetivo

Criar projetos com:
- baixa complexidade
- alta velocidade de entrega
- segurança mínima garantida
- performance adequada
- fácil manutenção
- suporte eficiente para IA

---

## 2. Regra principal

Sempre priorizar:

> simplicidade + entrega rápida + clareza

Evitar:

> complexidade prematura + overengineering

---

## 3. Bootstrap obrigatório

Ao iniciar qualquer projeto:

1. criar repositório
2. criar estrutura base
3. escolher o kit de bootstrap:

- `npx @vudovn/ag-kit init` pode ser usado por qualquer pessoa, inclusive fora do Antigravity
- se esse kit for escolhido, referenciar o padrao ou pedir ajuste do funcionamento ao contexto do projeto
- se o fluxo for este kit generico, rodar `npm init ai-kit` ou `npx ai-kit init`

4. garantir `.gitignore` com:

```gitignore
.agent
node_modules
dist
build
.env
.env.*
!.env.example
coverage
.cache
.tmp
.DS_Store
*.log
```

---

## 4. Estrutura padrão

```txt
src/
  modules/
  shared/
  infra/
  app/
docs/
tests/
```

Regras:
- organizar por domínio
- evitar arquivos gigantes
- evitar `utils` genérico sem controle
- preferir monólito modular no início

---

## 5. MVP first

Antes de implementar qualquer coisa, validar:
- isso resolve o problema principal?
- isso é necessário para vender ou testar?
- isso pode ser feito manualmente?
- isso adiciona complexidade permanente?

Se não for essencial, não implementar no MVP.

---

## 6. Proibições no MVP

Não usar sem justificativa explícita:
- microsserviços
- event-driven complexo
- filas
- múltiplos bancos
- abstrações genéricas
- sistemas complexos de permissão
- arquitetura enterprise
- otimizações prematuras

---

## 7. Segurança obrigatória

Sempre:
- validar inputs
- usar `.env`
- nunca confiar no frontend
- hash de senha forte
- autenticação obrigatória quando necessário
- não expor secrets
- logs sem dados sensíveis
- rate limit quando público
- autorização explícita em ações sensíveis

---

## 8. Performance pragmática

Sempre:
- paginação
- evitar N+1
- queries simples
- carregar só o necessário
- logs e métricas mínimas

Nunca:
- otimizar sem métrica
- usar cache sem necessidade real

---

## 9. Regras para IA

Antes de gerar código:
1. entender o problema
2. ler docs do projeto
3. identificar fluxo principal
4. propor solução simples
5. explicar trade-offs

Depois:
- gerar código limpo
- listar arquivos alterados
- sugerir melhorias sem inflar escopo

---

## 10. IA não deve

- adicionar libs sem justificar
- criar abstrações desnecessárias
- complicar arquitetura
- reescrever código estável sem motivo
- ignorar segurança
- expandir escopo por conta própria

---

## 11. Documentação mínima

Todo projeto deve ter:
- `README.md`
- `AGENTS.md`
- `docs/product.md`
- `docs/architecture.md`
- `docs/backlog.md`
- `docs/security.md`

---

## 12. Stack padrão default

- Frontend: React / Next.js
- Backend: Node.js
- Banco: PostgreSQL
- Arquitetura: monólito modular

---

## 13. Critério de qualidade

Código deve ser:
- legível
- previsível
- simples
- sem mágica
- fácil de alterar

---

## 14. Regra de ouro

Se houver duas opções:
- uma elegante e complexa
- uma simples e funcional

Escolher a simples.

---

## 15. Regra final

A IA deve agir como:

> engenheiro sênior pragmático focado em entrega real

E não como:

> arquiteto acadêmico criando complexidade desnecessária
