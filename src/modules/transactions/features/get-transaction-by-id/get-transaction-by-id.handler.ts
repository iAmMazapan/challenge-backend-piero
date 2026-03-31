import { Inject, Injectable, Logger } from '@nestjs/common';
import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { Errors } from '../../../../shared/errors/app.error';
import { ITransactionRepository } from '../../shared/ports/transaction.repository.port';
import { GetTransactionByIdQuery } from './get-transaction-by-id.query';
import { GetTransactionByIdResult } from './get-transaction-by-id.result';

@QueryHandler(GetTransactionByIdQuery)
@Injectable()
export class GetTransactionByIdHandler
  implements IQueryHandler<GetTransactionByIdQuery, GetTransactionByIdResult>
{
  private readonly logger = new Logger(GetTransactionByIdHandler.name);

  constructor(
    @Inject(ITransactionRepository)
    private readonly transactionsRepository: ITransactionRepository,
  ) {}

  async execute(query: GetTransactionByIdQuery): Promise<GetTransactionByIdResult> {
    this.logger.log(`[Handler] GetTransactionById started`);
    const transaction = await this.transactionsRepository.findById(query.id);

    if (!transaction) {
      const error = Errors.NotFound('Transaction not found');
      throw error;
    }

    this.logger.log(`[Handler] GetTransactionById completed`);
    return { transaction };
  }
}
