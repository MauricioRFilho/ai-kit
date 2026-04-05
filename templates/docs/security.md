# docs/security.md

## Objetivo
Este documento existe para reduzir riscos em projetos criados por times que podem usar IA para implementar, inclusive sem experiencia profunda em engenharia de software.

Antes de construir ou revisar qualquer funcionalidade, responder:
- quais dados sensiveis existem neste projeto?
- quem pode ler, criar, editar ou apagar cada recurso?
- o que acontece se uma automacao, script ou usuario malicioso abusar desta funcionalidade?
- quais limites, validacoes e logs existem para conter abuso?

## Modelagem de risco minima

### Ativos sensiveis
- contas de usuario
- sessao, token e credenciais
- dados pessoais
- dados financeiros
- arquivos enviados
- webhooks
- banco de dados e backups

### Atores de risco
- usuario nao autenticado
- usuario autenticado sem permissao suficiente
- automacoes ou bots abusando de endpoints
- integracao externa mal configurada
- operador interno com permissao acima do necessario
- agente de IA gerando codigo inseguro por falta de contexto

### Perguntas obrigatorias por feature
- existe autenticacao?
- existe autorizacao por recurso e por acao?
- existe validacao de input?
- existe rate limit ou algum mecanismo anti abuso?
- existe risco de SQL injection, command injection ou prompt injection?
- existe timeout, limite de payload, limite de upload ou limite de processamento?
- existe logging suficiente para auditar falhas e abuso?

## Autenticacao
- definir estrategia de login e sessao
- expirar sessoes e tokens em tempo razoavel
- invalidar sessao quando houver troca de senha, suspeita de abuso ou logout
- proteger recuperacao de senha, convite e troca de email
- nunca confiar apenas em dados enviados pelo frontend

## Autorizacao
- definir hierarquia de permissao com papeis claros
- checar permissao no backend ou no servidor, nunca apenas na interface
- validar acesso por recurso, tenant, organizacao, workspace ou conta
- aplicar principio do menor privilegio
- separar permissoes de leitura, escrita, exclusao, exportacao e administracao
- revisar fluxos administrativos com cuidado extra

## Banco de dados e queries
- usar queries parametrizadas ou ORM seguro
- nunca concatenar input em SQL
- limitar permissoes do usuario de banco em producao
- evitar usar usuario com privilegio total na aplicacao
- separar credenciais por ambiente quando possivel
- revisar indexes, paginação e filtros para evitar abuso por consultas pesadas
- auditar migracoes que mexem com permissoes ou dados sensiveis

## Secrets e variaveis de ambiente
- usar variaveis de ambiente para secrets
- nunca commitar secrets reais
- manter `.env.example` atualizado com todas as chaves necessarias
- diferenciar claramente variaveis de desenvolvimento, staging e producao
- verificar se variaveis de producao estao presentes antes do deploy ou startup
- rotacionar credenciais quando houver suspeita de vazamento
- nunca expor secrets em logs, erros, frontend ou codigo cliente

## Validacao de input
- validar body, query params, params de rota, headers e cookies
- definir formato, tamanho maximo, valores permitidos e campos obrigatorios
- sanitizar entradas quando houver risco de injecao ou XSS
- limitar tamanho de texto, numero de itens e volume de arquivos enviados
- rejeitar payloads inesperados de forma explicita

## Protecoes contra injecao e abuso
- prevenir SQL injection com queries parametrizadas
- prevenir command injection evitando shell com input nao confiavel
- prevenir XSS tratando HTML e renderizacao dinamica com cuidado
- prevenir CSRF quando houver sessao baseada em cookie
- tratar prompt injection em fluxos com IA, especialmente quando houver arquivos, paginas externas ou input do usuario
- revisar uploads, parsers e webhooks como superficies de ataque

## Anti abuso e limites operacionais
- aplicar rate limit em endpoints publicos, login, reset de senha, webhook e API sensivel
- bloquear ou desacelerar brute force, scraping e scripts repetitivos
- definir timeout para request, query, chamada externa e processamento pesado
- limitar concorrencia e numero de tentativas em operacoes sensiveis
- usar paginação, filtros e limites de resposta
- definir tamanho maximo de upload e tempo maximo de processamento

## Producao e ambientes
- nunca reutilizar credenciais locais em producao
- validar configuracao de CORS, dominio, cookies, HTTPS e proxy
- garantir que modo debug e stack trace detalhado nao vazem em producao
- revisar backups, restauracao e retencao de dados
- conferir se logs, analytics e monitoramento nao vazam dados sensiveis
- garantir segregacao minima entre ambientes

## Logs, auditoria e testes
- registrar eventos criticos como login, falha de login, troca de senha, alteracao de permissao e exclusao
- incluir contexto suficiente para investigacao sem vazar dados sensiveis
- criar testes para autorizacao, validacao, limites e cenarios negativos
- testar falhas comuns: acesso sem login, acesso sem permissao, SQL injection, payload invalido, excesso de requests e segredo ausente
- revisar codigo gerado por IA com foco especial em seguranca e bordas negativas

## Checklist minima antes de subir para producao
- [ ] autenticacao definida
- [ ] autorizacao por papel e recurso definida
- [ ] queries seguras contra SQL injection
- [ ] secrets fora do codigo e `.env.example` atualizado
- [ ] variaveis obrigatorias de producao verificadas
- [ ] rate limit aplicado onde necessario
- [ ] timeouts e limites definidos
- [ ] logs e auditoria para eventos criticos
- [ ] testes cobrindo cenarios negativos e abuso
- [ ] permissoes do banco revisadas

## Riscos conhecidos
- risco 1
- risco 2
