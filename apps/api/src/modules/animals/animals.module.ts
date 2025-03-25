import { Module } from '@nestjs/common';
import { UploadModule } from 'src/upload/upload.module';
import { AnimalsController } from './animals.controller';
import { AnimalsService } from './animals.service';
import { PrismaService } from 'src/lib/prisma/prisma.service';

@Module({
  imports: [UploadModule],
  controllers: [AnimalsController],
  providers: [AnimalsService, PrismaService],
})
export class AnimalsModule {}
