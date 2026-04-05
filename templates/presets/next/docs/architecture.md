# docs/architecture.md

## Visao geral
Aplicacao full-stack com Next.js App Router, priorizando renderizacao no servidor e simplicidade operacional.

## Stack
- frontend: Next.js
- backend: Route Handlers ou Server Actions quando fizer sentido
- banco:
- deploy:

## Modulos principais
- app
- features
- domain
- shared
- infra

## Regras arquiteturais
- preferir Server Components por padrao
- usar Client Components apenas quando houver interatividade real
- manter fetch e acesso a dados proximos do servidor
- separar UI, regras de negocio e integracoes

## Regras de frontend
- formularios com validacao explicita
- estados locais simples antes de adotar libs globais
- otimizar bundle evitando mover logica desnecessaria para o client

## Integrações externas
- autenticacao
- pagamentos
- analytics

## Trade-offs
- priorizar monolito full-stack enquanto o produto estiver no MVP
- evitar microfrontends e orquestracoes complexas no inicio
