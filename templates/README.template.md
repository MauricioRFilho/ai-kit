# Projeto

Base inicial criada com CadenceCode AI Kit para padronizar documentacao, fluxo de trabalho e colaboracao com agentes de IA.

## Escolha do kit

O `ag-kit` tambem pode ser usado por qualquer pessoa, nao so por quem usa Antigravity:

```bash
npx @vudovn/ag-kit init
```

Se escolher `ag-kit`, basta referenciar o padrao ou pedir ajuste do funcionamento para o seu contexto.

Se a preferencia for manter este kit como base generica de documentacao e guardrails, siga com os arquivos atuais.

## Comeco rapido

1. Preencha `TASK.md` com o problema atual.
2. Gere ou refine `PLAN.md` antes de implementar.
3. Atualize `docs/product.md` e `docs/architecture.md`.
4. Revise `docs/security.md`, variaveis de ambiente e permissoes antes de gerar codigo.
5. Registre decisoes importantes em `ARCH_DECISIONS.md`.

## Antes de implementar

- definir autenticacao, autorizacao e hierarquia de permissao
- revisar `.env`, `.env.example` e variaveis obrigatorias de producao
- mapear riscos de abuso, scripts, bots e cenarios negativos
- validar limites como rate limit, timeout, payload e upload
- confirmar quais dados sensiveis existem e quem pode acessa-los

## Arquivos principais

- `AGENTS.md`: regras operacionais do projeto
- `SYSTEM_PROMPT.md`: prompt base para agentes
- `TASK.md`: pedido atual
- `PLAN.md`: plano de execucao
- `docs/product.md`: contexto de negocio e MVP
- `docs/architecture.md`: visao arquitetural
- `docs/security.md`: requisitos minimos de seguranca
- `docs/backlog.md`: backlog e pos-MVP

## Proximos passos

- definir stack real do projeto
- registrar escopo do MVP
- alinhar backlog inicial
- iniciar implementacao somente depois do plano
