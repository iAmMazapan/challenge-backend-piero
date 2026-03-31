import { TransactionStatus } from '../../../../shared/enums';

const FRAUD_REVIEW_LIMIT = 1000;

export function reviewTransaction(amount: number): TransactionStatus {
  if (amount > FRAUD_REVIEW_LIMIT) {
    return TransactionStatus.Rejected;
  }

  return TransactionStatus.Approved;
}
