# docs/security.md

## Objetivo
Este projeto Node.js deve assumir que qualquer endpoint pode ser chamado por usuarios, scripts, bots ou integracoes maliciosas.

## Autenticacao
- definir estrategia de login, token e expiracao de sessao
- limitar tentativas de login, reset e confirmacao de conta
- invalidar credenciais quando houver suspeita de abuso

## Autorizacao
- validar permissao no backend em toda rota sensivel
- definir papeis e escopos por recurso
- aplicar menor privilegio para usuarios, servicos e jobs internos

## Banco de dados
- usar query parametrizada ou ORM seguro
- nunca interpolar input em SQL
- revisar permissao do usuario de banco em producao
- evitar credencial com acesso administrativo na aplicacao
- limitar queries caras com filtros, paginação e timeout

## Variaveis de ambiente e producao
- manter `.env.example` atualizado
- validar no startup as variaveis obrigatorias de producao
- separar credenciais por ambiente
- nunca logar secrets, tokens ou dados sensiveis

## Protecoes minimas
- validacao de input no boundary HTTP
- sanitizacao de headers, query params e body
- rate limit quando a API for publica ou sensivel
- timeout para request, query e integracao externa
- limite de payload, upload e processamento
- tratamento de erro sem vazar stack ou detalhes internos

## Anti abuso
- reduzir brute force e scraping com limite por IP, conta ou chave
- proteger webhook com assinatura, replay protection e timeout
- monitorar picos de request, falhas de login e tentativas negadas

## Observabilidade e testes
- logs estruturados com request id
- auditoria para login, alteracao de permissao e exclusao
- testes negativos para autenticacao, autorizacao, SQL injection e excesso de requests

## Riscos conhecidos
- risco 1
- risco 2
