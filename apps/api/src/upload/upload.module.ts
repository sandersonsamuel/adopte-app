import { Module } from '@nestjs/common';
import { SupabaseModule } from 'src/supabase/supabase.module';
import { UploadService } from './upload.service';

@Module({
  imports: [SupabaseModule],
  controllers: [],
  providers: [UploadService],
  exports: [UploadService],
})
export class UploadModule {}
