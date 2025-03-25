import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@adopte/db/generated/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    await this.$connect();
  }
}
