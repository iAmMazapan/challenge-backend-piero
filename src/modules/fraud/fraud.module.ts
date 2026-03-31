import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReviewTransactionHandler } from './features/review-transaction/review-transaction.handler';
import { TransactionCreatedListener } from './features/review-transaction/transaction-created.listener';
import { TransactionEntity } from '../../shared/entities/transaction.entity';
import { TransactionRepository } from './shared/adapters/transaction.repository';
import { IFraudTransactionRepository } from './shared/ports/transaction.repository.port';

@Module({
  imports: [CqrsModule, TypeOrmModule.forFeature([TransactionEntity])],
  providers: [
    TransactionCreatedListener,
    ReviewTransactionHandler,
    {
      provide: IFraudTransactionRepository,
      useClass: TransactionRepository,
    },
  ],
})
export class FraudModule {}
