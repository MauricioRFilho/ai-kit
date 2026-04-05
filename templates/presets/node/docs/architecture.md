# docs/architecture.md

## Visao geral
Aplicacao orientada a servicos em Node.js, com foco em API ou worker backend de baixa complexidade.

## Stack
- runtime: Node.js
- framework: definir entre Fastify, Express ou Nest apenas se houver necessidade real
- banco:
- deploy:

## Modulos principais
- api
- application
- domain
- infra

## Regras arquiteturais
- separar regras de negocio da camada HTTP
- organizar por dominio antes de organizar por tipo tecnico
- evitar acoplamento do dominio com framework
- manter contratos simples entre modulos

## Operacao local
- usar `.nvmrc` para padronizar a versao do Node
- definir scripts minimos de `dev`, `test` e `start`

## Integrações externas
- servico 1
- servico 2

## Trade-offs
- monolito modular antes de extrair servicos
- filas, cache e jobs apenas quando houver gargalo real
