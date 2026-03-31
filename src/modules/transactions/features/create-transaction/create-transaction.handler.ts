import { Inject, Logger } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { randomUUID } from 'crypto';
import { CreateTransactionCommand } from './create-transaction.command';
import { ITransactionRepository } from '../../shared/ports/transaction.repository.port';
import { calculateIgv } from '../../shared/rules/calculate-igv.rule';
import { calculateTotalWithIgv } from '../../shared/rules/calculate-total-with-igv.rule';
import { isGreaterThanMinimumAmount } from '../../shared/rules/is-greater-than-minimum-amount.rule';
import { Errors } from '../../../../shared/errors/app.error';
import { CreateTransactionResult } from './create-transaction.result';
import { Money } from '../../shared/value-objects/money';
import { TransactionStatus } from '../../../../shared/enums';
import { TransactionEvent, TransactionCreatedPayload } from '../../../../shared/events';

@CommandHandler(CreateTransactionCommand)
export class CreateTransactionHandler
  implements ICommandHandler<CreateTransactionCommand, CreateTransactionResult>
{
  private readonly logger = new Logger(CreateTransactionHandler.name);

  constructor(
    @Inject(ITransactionRepository)
    private readonly transactionsRepository: ITransactionRepository,
    private readonly eventEmitter: EventEmitter2,
  ) {}

  async execute(command: CreateTransactionCommand): Promise<CreateTransactionResult> {
    this.logger.log(`[Handler] CreateTransaction started`);
    const { accountId, amount, currency, type, externalReference } = command;

    if (!isGreaterThanMinimumAmount(amount, 0)) {
      const error = Errors.BusinessRuleViolation('Amount must be greater than 0');
      throw error;
    }

    const igvAmount = calculateIgv(amount);
    const totalAmount = calculateTotalWithIgv(amount, igvAmount);
    const id = randomUUID();
    const amountMoney = Money.create(amount, currency);
    const igvMoney = Money.create(igvAmount, currency);
    const totalMoney = Money.create(totalAmount, currency);

    await this.transactionsRepository.save({
      id,
      accountId,
      amount: amountMoney,
      type,
      status: TransactionStatus.Pending,
      externalReference,
      igvAmount: igvMoney,
      totalAmount: totalMoney,
    });

    // Emitir evento para notificaciones
    const payload: TransactionCreatedPayload = {
      transactionId: id,
      accountId,
      amount,
      currency,
      status: TransactionStatus.Pending,
    };

    this.eventEmitter.emit(TransactionEvent.Created, payload);
    this.logger.log(`[Handler] CreateTransaction completed`);

    return { id };
  }
}
