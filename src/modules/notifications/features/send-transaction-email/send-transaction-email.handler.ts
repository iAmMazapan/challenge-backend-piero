import { Injectable, Logger } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { SendTransactionEmailCommand } from './send-transaction-email.command';

@CommandHandler(SendTransactionEmailCommand)
@Injectable()
export class SendTransactionEmailHandler
  implements ICommandHandler<SendTransactionEmailCommand, void>
{
  private readonly logger = new Logger(SendTransactionEmailHandler.name);

  async execute(command: SendTransactionEmailCommand): Promise<void> {
    this.logger.log(`[Handler] SendTransactionEmail started`);
    const payload = {
      transactionId: command.transactionId,
      accountId: command.accountId,
      amount: command.amount,
      currency: command.currency,
      status: command.status,
    };

    this.logger.log(JSON.stringify(payload, null, 2));
    this.logger.log(`[Handler] SendTransactionEmail completed`);
  }
}
