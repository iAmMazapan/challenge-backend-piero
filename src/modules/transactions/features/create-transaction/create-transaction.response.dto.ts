import { ApiProperty } from '@nestjs/swagger';
import { CreateTransactionResult } from './create-transaction.result';

export class CreateTransactionDataDto {
  @ApiProperty()
  id!: string;

  static from(result: CreateTransactionResult): CreateTransactionDataDto {
    const dto = new CreateTransactionDataDto();
    dto.id = result.id;
    return dto;
  }
}
