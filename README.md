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


## Solución implementada

### Alcance
Se completó la implementación del endpoint GET /transactions/:id mediante la implementación del método findById en el repositorio de transacciones.

Lo que estaba previo:
- Las 4 funciones de negocio (calculateIgv, calculateTotalWithIgv, isGreaterThanMinimumAmount, reviewTransaction)
- El controller, handler, DTOs y servicios asociados al GET
- Toda la arquitectura, filtros y interceptores

Lo que se implementó:
- Método findById(id: string) en el adapter del repositorio

Archivo modificado:
- src/modules/transactions/shared/adapters/transaction.repository.ts

### Detalle técnico

Se implementó findById(id: string) con TypeORM y mapeo consistente al modelo de dominio (Transaction):

```typescript
async findById(id: string): Promise<Transaction | null> {
  const entity = await this.repo.findOne({ where: { id } });
  
  if (!entity) return null;
  
  return {
    id: entity.id,
    accountId: entity.accountId,
    amount: Money.create(entity.amount, entity.currency),
    type: entity.type,
    status: entity.status,
    externalReference: entity.externalReference,
    igvAmount: Money.create(entity.igvAmount, entity.currency),
    totalAmount: Money.create(entity.totalAmount, entity.currency),
    createdAt: entity.createdAt,
    updatedAt: entity.updatedAt,
  };
}
```

El método:
- Consulta mediante findOne de TypeORM
- Retorna null si no existe el registro
- Mapea campos numéricos a objetos Money (amount, igvAmount, totalAmount)
- Mantiene consistencia con el método save existente
- Incluye campos de auditoría (createdAt, updatedAt)

### Validación funcional

Con la API levantada en http://localhost:3000/docs:

1. POST /transactions crea una transacción:

Solicitud:
```json
{
  "accountId": "acc_123",
  "amount": 100,
  "currency": "PEN",
  "type": "credit",
  "externalReference": "ext_001"
}
```

Respuesta (HTTP 201):
```json
{
  "data": {
    "id": "bba47710-d55b-466f-9b78-17a358b7a143"
  }
}
```

2. GET /transactions/bba47710-d55b-466f-9b78-17a358b7a143 recupera la transacción:

URL: http://localhost:3000/transactions/bba47710-d55b-466f-9b78-17a358b7a143

Respuesta (HTTP 200):
```json
{
  "data": {
    "id": "bba47710-d55b-466f-9b78-17a358b7a143",
    "accountId": "acc_123",
    "amount": 100,
    "currency": "PEN",
    "type": "credit",
    "status": "approved",
    "externalReference": "ext_001",
    "igvAmount": 18,
    "totalAmount": 118,
    "createdAt": "2026-04-09T20:10:37.354Z",
    "updatedAt": "2026-04-09T20:10:37.391Z"
  }
}
```

Notar que:
- El status cambió a "approved" (procesado por el módulo de fraude automáticamente)
- igvAmount es 18 (100 * 0.18)
- totalAmount es 118 (100 + 18)

3. GET /transactions/{id-inexistente} retorna 404:

Respuesta (HTTP 404):
```json
{
  "error": {
    "code": "ENTITY_NOT_FOUND",
    "message": "Transaction not found"
  }
}
```

### Tests unitarios

Se ejecutaron todos los tests con resultado:

```
Test Suites: 4 passed, 4 total
Tests: 8 passed, 8 total
```

Ningún test unitario fue modificado. La implementación cumple con los contratos establecidos.

### Nota de entorno local

Para crear tablas automáticamente desde las entidades en desarrollo local:

```bash
DB_SYNCHRONIZE=true npm run start:dev
```
