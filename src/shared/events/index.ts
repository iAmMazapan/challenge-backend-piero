import { TransactionStatus } from '../enums';

export const TransactionEvent = {
  Created: 'transaction.created',
} as const;

export type TransactionCreatedPayload = {
  transactionId: string;
  accountId: string;
  amount: number;
  currency: string;
  status: TransactionStatus;
};
