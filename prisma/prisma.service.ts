// src/prisma/prisma.service.ts
import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

// PrismaClient é o cliente gerado pelo Prisma
@Injectable()
export class PrismaService extends PrismaClient {
  constructor() {
    super();
  }
}
