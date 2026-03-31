import { Body, Controller, Logger, Post } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { CreateTransactionCommand } from './create-transaction.command';
import { CreateTransactionRequestDto } from './create-transaction.request.dto';
import { ApiTags, ApiResponse } from '@nestjs/swagger';
import { ApiEnvelopeResponse } from '../../../../shared/swagger/api-envelope-response.decorator';
import { CreateTransactionDataDto } from './create-transaction.response.dto';

@ApiTags('Transactions')
@Controller('transactions')
export class CreateTransactionController {
  private readonly logger = new Logger(CreateTransactionController.name);

  constructor(private readonly commandBus: CommandBus) {}

  @Post()
  @ApiEnvelopeResponse(CreateTransactionDataDto, { status: 201 })
  async handle(@Body() dto: CreateTransactionRequestDto): Promise<CreateTransactionDataDto> {
    this.logger.log(`[Controller] CreateTransaction`);
    const command = new CreateTransactionCommand(
      dto.accountId,
      dto.amount,
      dto.currency,
      dto.type,
      dto.externalReference ?? null,
    );
    const result = await this.commandBus.execute(command);
    this.logger.log(`[Controller] CreateTransaction completed`);
    return CreateTransactionDataDto.from(result);
  }
}
