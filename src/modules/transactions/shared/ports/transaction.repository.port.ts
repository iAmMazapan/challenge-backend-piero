export const ITransactionRepository = Symbol('ITransactionRepository');

import { Money } from '../value-objects/money';
import { TransactionType } from '../enums';
import { TransactionStatus } from '../../../../shared/enums';

export type Transaction = {
  id: string;
  accountId: string;
  amount: Money;
  type: TransactionType;
  status: TransactionStatus;
  externalReference: string | null;
  igvAmount: Money;
  totalAmount: Money;
  createdAt: Date;
  updatedAt: Date;
};

export type SaveTransactionParams = {
  id: string;
  accountId: string;
  amount: Money;
  type: TransactionType;
  status: TransactionStatus;
  externalReference: string | null;
  igvAmount: Money;
  totalAmount: Money;
};

export interface ITransactionRepository {
  save(params: SaveTransactionParams): Promise<void>;
  findById(id: string): Promise<Transaction | null>;
}
