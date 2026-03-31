import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TransactionEntity } from '../../shared/entities/transaction.entity';
import { OutboxEventEntity } from '../../shared/entities/outbox-event.entity';
import { TransactionRepository } from './shared/adapters/transaction.repository';
import { ITransactionRepository } from './shared/ports/transaction.repository.port';

import { CreateTransactionController } from './features/create-transaction/create-transaction.controller';
import { CreateTransactionHandler } from './features/create-transaction/create-transaction.handler';
import { CqrsModule } from '@nestjs/cqrs';
import { GetTransactionByIdController } from './features/get-transaction-by-id/get-transaction-by-id.controller';
import { GetTransactionByIdHandler } from './features/get-transaction-by-id/get-transaction-by-id.handler';

@Module({
  imports: [
    CqrsModule,
    TypeOrmModule.forFeature([TransactionEntity, OutboxEventEntity]),
  ],
  controllers: [
    CreateTransactionController,
    GetTransactionByIdController,
  ],
  providers: [
    {
      provide: ITransactionRepository,
      useClass: TransactionRepository,
    },
    CreateTransactionHandler,
    GetTransactionByIdHandler,
  ],
  exports: [ITransactionRepository],
})
export class TransactionsModule {}
