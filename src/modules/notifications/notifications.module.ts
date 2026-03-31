import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TransactionCreatedListener } from './features/send-transaction-email/transaction-created.listener';
import { SendTransactionEmailHandler } from './features/send-transaction-email/send-transaction-email.handler';

@Module({
  imports: [CqrsModule],
  providers: [TransactionCreatedListener, SendTransactionEmailHandler],
})
export class NotificationsModule {}
