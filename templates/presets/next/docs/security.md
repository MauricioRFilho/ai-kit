# docs/security.md

## Objetivo
Em Next.js, toda regra sensivel deve ser protegida no servidor. Interface e client component ajudam a UX, mas nao valem como controle de seguranca.

## Autenticacao
- definir login, sessao e expiracao de sessao
- proteger fluxo de reset, convite e troca de email
- revisar cookies, dominio, secure flag e same-site em producao

## Autorizacao
- validar permissao no servidor, em route handlers, server actions e loaders de dados
- nunca confiar apenas em esconder botao ou rota no frontend
- definir papeis, escopos e isolamento por tenant ou workspace

## Variaveis de ambiente e secrets
- separar variaveis server-only das expostas ao client
- manter `.env.example` atualizado
- verificar variaveis obrigatorias antes de subir producao
- nunca importar secret em componente client

## Banco e dados
- usar query parametrizada ou ORM seguro
- evitar SQL injection e filtros dinamicos inseguros
- limitar acesso a dados pelo usuario autenticado e pelo tenant correto
- revisar exportacoes, buscas e dashboards para nao expor dados em excesso

## Protecoes minimas
- validar inputs em forms, server actions e route handlers
- limitar tamanho de payload e upload
- aplicar rate limit em login, reset, endpoints publicos e integracoes sensiveis
- definir timeout para chamadas externas e operacoes pesadas
- evitar expor stack trace, token ou segredo em erro renderizado

## Anti abuso
- reduzir automacao maliciosa em formularios e endpoints
- revisar upload, rich text, markdown, preview e arquivos externos com cautela
- tratar prompt injection quando houver IA lendo input do usuario ou conteudo externo

## Logs e testes
- registrar eventos criticos no servidor
- monitorar falhas de autenticacao, autorizacao, pagamento e webhook
- testar acesso sem login, acesso sem permissao, payload invalido e excesso de requests

## Riscos conhecidos
- risco 1
- risco 2
