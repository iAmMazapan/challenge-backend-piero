import { Controller, Get, Logger, Param } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { ApiTags } from '@nestjs/swagger';
import { ApiEnvelopeResponse } from '../../../../shared/swagger/api-envelope-response.decorator';
import { GetTransactionByIdQuery } from './get-transaction-by-id.query';
import { GetTransactionByIdDataDto } from './get-transaction-by-id.response.dto';

@ApiTags('Transactions')
@Controller('transactions')
export class GetTransactionByIdController {
  private readonly logger = new Logger(GetTransactionByIdController.name);

  constructor(private readonly queryBus: QueryBus) {}

  @Get(':id')
  @ApiEnvelopeResponse(GetTransactionByIdDataDto)
  async handle(@Param('id') id: string): Promise<GetTransactionByIdDataDto> {
    this.logger.log(`[Controller] GetTransactionById`);
    const query = new GetTransactionByIdQuery(id);
    const result = await this.queryBus.execute(query);
    this.logger.log(`[Controller] GetTransactionById completed`);
    return GetTransactionByIdDataDto.from(result);
  }
}
