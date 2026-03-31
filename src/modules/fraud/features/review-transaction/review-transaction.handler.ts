import { Injectable, Logger } from '@nestjs/common';
import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { ReviewTransactionCommand } from './review-transaction.command';
import { reviewTransaction } from '../../shared/rules/review-transaction.rule';
import { IFraudTransactionRepository } from '../../shared/ports/transaction.repository.port';

@CommandHandler(ReviewTransactionCommand)
@Injectable()
export class ReviewTransactionHandler implements ICommandHandler<ReviewTransactionCommand, void> {
  private readonly logger = new Logger(ReviewTransactionHandler.name);

  constructor(
    @Inject(IFraudTransactionRepository)
    private readonly transactionsRepository: IFraudTransactionRepository,
  ) {}

  async execute(command: ReviewTransactionCommand): Promise<void> {
    this.logger.log(`[Handler] Fraud review started`);
    const status = reviewTransaction(command.amount);
    this.logger.log(`[Handler] Fraud decision ${status} for transaction ${command.transactionId}`);

    await this.transactionsRepository.updateStatus({
      id: command.transactionId,
      status,
    });

    this.logger.log(`[Handler] Fraud review completed`);
  }
}
