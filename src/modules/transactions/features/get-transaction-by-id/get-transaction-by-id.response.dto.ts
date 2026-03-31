import { ApiProperty } from '@nestjs/swagger';
import { TransactionStatus } from '../../../../shared/enums';
import { TransactionType } from '../../shared/enums';
import { GetTransactionByIdResult } from './get-transaction-by-id.result';

export class GetTransactionByIdDataDto {
  @ApiProperty()
  id!: string;

  @ApiProperty()
  accountId!: string;

  @ApiProperty()
  amount!: number;

  @ApiProperty()
  currency!: string;

  @ApiProperty({ enum: TransactionType, example: TransactionType.Credit })
  type!: TransactionType;

  @ApiProperty({ enum: TransactionStatus, example: TransactionStatus.Pending })
  status!: TransactionStatus;

  @ApiProperty({ required: false, nullable: true, type: String, example: 'ext_001' })
  externalReference!: string | null;

  @ApiProperty()
  igvAmount!: number;

  @ApiProperty()
  totalAmount!: number;

  @ApiProperty()
  createdAt!: Date;

  @ApiProperty()
  updatedAt!: Date;

  static from(result: GetTransactionByIdResult): GetTransactionByIdDataDto {
    const dto = new GetTransactionByIdDataDto();
    dto.id = result.transaction.id;
    dto.accountId = result.transaction.accountId;
    dto.amount = result.transaction.amount.amount;
    dto.currency = result.transaction.amount.currency;
    dto.type = result.transaction.type;
    dto.status = result.transaction.status;
    dto.externalReference = result.transaction.externalReference;
    dto.igvAmount = result.transaction.igvAmount.amount;
    dto.totalAmount = result.transaction.totalAmount.amount;
    dto.createdAt = result.transaction.createdAt;
    dto.updatedAt = result.transaction.updatedAt;
    return dto;
  }
}
