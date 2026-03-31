import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TransactionEntity } from '../../../../shared/entities/transaction.entity';
import {
  IFraudTransactionRepository,
  UpdateTransactionStatusParams,
} from '../ports/transaction.repository.port';

@Injectable()
export class TransactionRepository implements IFraudTransactionRepository {
  constructor(
    @InjectRepository(TransactionEntity)
    private readonly repo: Repository<TransactionEntity>,
  ) {}

  async updateStatus(params: UpdateTransactionStatusParams): Promise<void> {
    await this.repo.update(
      { id: params.id },
      {
        status: params.status,
      },
    );
  }
}
