import { TransactionStatus } from '../../../../shared/enums';

export class SendTransactionEmailCommand {
  constructor(
    public readonly transactionId: string,
    public readonly accountId: string,
    public readonly amount: number,
    public readonly currency: string,
    public readonly status: TransactionStatus,
  ) {}
}
