# docs/architecture.md

## Visao geral
Resumo da arquitetura atual.

## Stack
- frontend:
- backend:
- banco:
- deploy:

## Modulos principais
- auth
- users
- core domain
- integracoes

## Fronteiras de confianca
- o que roda no client
- o que roda no servidor
- o que vem de integracoes externas
- o que exige autenticacao e autorizacao

## Regras arquiteturais
- monolito modular
- organizacao por dominio
- baixo acoplamento
- dependencias justificadas
- regras sensiveis protegidas no backend ou no servidor

## Autenticacao e autorizacao
- onde acontece autenticacao
- onde a autorizacao e validada
- como funciona hierarquia de papel, tenant, workspace ou conta

## Banco e dados
- como a aplicacao acessa o banco
- quais dados sao sensiveis
- quais servicos ou modulos podem acessar quais dados
- como evitar queries inseguras ou pesadas

## Secrets e configuracao
- onde ficam variaveis de ambiente
- como diferenciar local, staging e producao
- quais configuracoes sao obrigatorias para subir o sistema

## Integrações externas
- servico 1
- servico 2
- riscos, timeout e estrategia de falha

## Observabilidade e operacao
- logs
- auditoria
- monitoramento
- limites operacionais e rate limit

## Trade-offs
- o que foi simplificado
- o que foi adiado
- quais riscos foram aceitos no MVP
