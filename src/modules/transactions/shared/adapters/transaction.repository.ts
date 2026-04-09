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
    const entity = await this.repo.findOne({
      where: { id },
    });

    if (!entity) return null;
 
    return {
      id: entity.id,
      accountId: entity.accountId,
      amount: Money.create(entity.amount, entity.currency),
      type: entity.type,
      status: entity.status,
      externalReference: entity.externalReference,
      igvAmount: Money.create(entity.igvAmount, entity.currency),
      totalAmount: Money.create(entity.totalAmount, entity.currency),
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    };
  }
}
