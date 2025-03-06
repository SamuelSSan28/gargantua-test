import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { CreateLoanDto } from 'src/dtos/create-loan.dto';
import { LoansService } from 'src/services/loans.service';
 

@Controller('loans')
export class LoansController {
  constructor(private readonly loansService: LoansService) {}

  @Post()
  async create(@Body() dto: CreateLoanDto) {
    const loan = await this.loansService.createLoan(dto);
    return { message: 'Empréstimo criado com sucesso', data: loan };
  }

  @Get()
  async list(@Query('page') page = 1, @Query('limit') limit = 10) {
    return this.loansService.listLoans(Number(page), Number(limit));
  }

  @Get(':id')
  async get(@Param('id') id: number) {
    return this.loansService.getLoanDetails(id);
  }
}
