import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { Loan } from 'src/entities/loan.entity';
import { LoansModule } from './modules/loans.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      expandVariables: true,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,

      synchronize: process.env.DB_SYNCHRONIZE === 'true' || true,
      entities: [Loan],
    }),
    LoansModule,
  ],
  providers: [],
})
export class AppModule {}
