# Reto Técnico

Reto técnico backend construido con **NestJS + TypeORM + PostgreSQL**.

## Requisitos

- Node.js 20 LTS

## Qué es este repositorio

Este repositorio simula un backend pequeño orientado a eventos y dividido por contextos:

- `transactions` crea y obtiene transacciones por id
- `fraud` escucha la creación de transacciones y decide si se aprueban o rechazan
- `notifications` escucha eventos de transacción y simula el flujo de notificación por correo

## Objetivo del reto

La persona que resuelve debe implementar las siguientes funciones de negocio:

- 🔢 `calculateIgv`: calcula el 18% del monto y redondea a 2 decimales. - 2 pts
- ➕ `calculateTotalWithIgv`: suma el monto más el IGV y redondea a 2 decimales. - 2 pts
- ✅ `isGreaterThanMinimumAmount`: valida que el monto sea mayor que `0`. - 2 pts
- 🕵️ `reviewTransaction`: aprueba si el monto es menor o igual a `1000` y rechaza si lo supera. - 2 pts

Además:

- importante: no debes modificar las pruebas unitarias, porque tu implementación será validada con ellas

## Lo que ya está implementado

- `transactions`
  - `POST /transactions`
- `fraud`
  - consume eventos de transacción y decide si se aprueban o rechazan
- `notifications`
  - consume eventos de transacción y simula el envío de correo

## Lo que debes completar

- 🌐 implementar `GET /transactions/:id` - 10 pts
- 🧩 completar el adapter de `findById` en transactions - 6 pts
- 🛡️ mantener la respuesta y el manejo de errores como ya está planteado - 6 pts

## Reglas fijadas por tests

Estos tests unitarios forman parte del contrato del reto y no deberían modificarse:

- `calculateIgv`
- `calculateTotalWithIgv`
- `isGreaterThanMinimumAmount`
- `reviewTransaction`

## Cómo ejecutar

```bash
npm install
npm run db:up
npm run start:dev
```

## Tests

```bash
npm run test
npm run test:cov
```

Al finalizar, la forma de validar la solución es ejecutar las pruebas unitarias.  
Si todas pasan, es muy probable que las funciones pedidas hayan quedado implementadas correctamente.

## Swagger

Con la API levantada:

- `http://localhost:3000/docs`
