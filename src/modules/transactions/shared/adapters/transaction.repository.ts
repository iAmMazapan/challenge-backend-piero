import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TransactionEntity } from '../../../../shared/entities/transaction.entity';
import {
  ITransactionRepository,
  Transaction,
  SaveTransactionParams,
} from '../ports/transaction.repository.port';
import { Money } from '../value-objects/money';

@Injectable()
export class TransactionRepository implements ITransactionRepository {
  constructor(
    @InjectRepository(TransactionEntity)
    private readonly repo: Repository<TransactionEntity>,
  ) {}

  async save(params: SaveTransactionParams): Promise<void> {
    const entity = this.repo.create({
      id: params.id,
      accountId: params.accountId,
      amount: params.amount.amount,
      currency: params.amount.currency,
      type: params.type,
      status: params.status,
      externalReference: params.externalReference,
      igvAmount: params.igvAmount.amount,
      totalAmount: params.totalAmount.amount,
    });

    await this.repo.save(entity);
  }

  async findById(id: string): Promise<Transaction | null> {
    // TODO: Implement the lookup for the challenge.
    // Keep the mapping consistent with the rest of the repository.
    throw new Error('TODO: implement findById');
  }
}
