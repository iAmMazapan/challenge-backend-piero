import { IsString, IsNumber, IsOptional, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { TransactionType } from '../../shared/enums';

export class CreateTransactionRequestDto {
  @ApiProperty({ example: 'acc_123' })
  @IsString()
  accountId: string;

  @ApiProperty({ example: 100 })
  @IsNumber()
  @Min(1)
  amount: number;

  @ApiProperty({ example: 'PEN', default: 'PEN' })
  @IsString()
  currency: string;

  @ApiProperty({ enum: TransactionType, example: TransactionType.Credit })
  @IsString()
  type: TransactionType;

  @ApiProperty({ required: false, nullable: true, type: String, example: 'ext_001' })
  @IsString()
  externalReference: string | null = null;
}
