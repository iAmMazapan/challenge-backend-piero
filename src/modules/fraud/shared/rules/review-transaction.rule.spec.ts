import { TransactionStatus } from '../../../../shared/enums';
import { reviewTransaction } from './review-transaction.rule';

describe('reviewTransaction', () => {
  it('approves amounts at or below the limit', () => {
    expect(reviewTransaction(1000)).toBe(TransactionStatus.Approved);
  });

  it('rejects amounts above the limit', () => {
    expect(reviewTransaction(1001)).toBe(TransactionStatus.Rejected);
  });
});
