import { TransactionStatus } from '../../../../shared/enums';

export const IFraudTransactionRepository = Symbol('IFraudTransactionRepository');

export type UpdateTransactionStatusParams = {
  id: string;
  status: TransactionStatus;
};

export interface IFraudTransactionRepository {
  updateStatus(params: UpdateTransactionStatusParams): Promise<void>;
}
