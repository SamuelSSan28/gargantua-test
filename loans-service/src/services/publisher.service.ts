import { Injectable, Inject, OnModuleInit } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class PublisherService implements OnModuleInit {
  constructor(
    @Inject('RABBITMQ_PUBLISHER') private readonly client: ClientProxy,
  ) {}

  async onModuleInit() {
    await this.client.connect();
  }

  publishLoanCreated(payload: any) {
    this.client.emit('loan.created', payload);
  }
}
