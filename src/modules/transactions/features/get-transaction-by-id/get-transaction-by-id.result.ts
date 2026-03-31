import { Transaction } from '../../shared/ports/transaction.repository.port';

export type GetTransactionByIdResult = {
  transaction: Transaction;
};
