import { Module } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import databaseConfig from './config/database.config';
import { TransactionsModule } from './modules/transactions/transactions.module';
import { CqrsModule } from '@nestjs/cqrs';

import { EventEmitterModule } from '@nestjs/event-emitter';
import { NotificationsModule } from './modules/notifications/notifications.module';
import { FraudModule } from './modules/fraud/fraud.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [databaseConfig],
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) =>
        configService.get<TypeOrmModuleOptions>('database') as TypeOrmModuleOptions,
    }),
    CqrsModule,
    EventEmitterModule.forRoot(),
    TransactionsModule,
    NotificationsModule,
    FraudModule,
  ],
})
export class AppModule {}
