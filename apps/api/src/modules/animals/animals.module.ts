import { Module } from '@nestjs/common';
import { UploadModule } from 'src/modules/upload/upload.module';
import { AnimalsController } from './animals.controller';
import { AnimalsService } from './animals.service';
import { PrismaService } from 'src/lib/prisma/prisma.service';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [UploadModule, AuthModule],
  controllers: [AnimalsController],
  providers: [AnimalsService, PrismaService],
})
export class AnimalsModule {}
