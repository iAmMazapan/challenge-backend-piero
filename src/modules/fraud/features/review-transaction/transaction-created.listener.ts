import { Injectable, Logger } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { OnEvent } from '@nestjs/event-emitter';
import { TransactionCreatedPayload, TransactionEvent } from '../../../../shared/events';
import { ReviewTransactionCommand } from './review-transaction.command';

@Injectable()
export class TransactionCreatedListener {
  private readonly logger = new Logger(TransactionCreatedListener.name);

  constructor(private readonly commandBus: CommandBus) {}

  @OnEvent(TransactionEvent.Created)
  async handle(payload: TransactionCreatedPayload): Promise<void> {
    this.logger.log(`[Listener] Fraud check received`);
    const command = new ReviewTransactionCommand(
      payload.transactionId,
      payload.accountId,
      payload.amount,
      payload.currency,
    );

    await this.commandBus.execute(command);
    this.logger.log(`[Listener] Fraud check dispatched`);
  }
}
