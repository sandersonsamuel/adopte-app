import { Injectable } from '@nestjs/common';
import { SupabaseService } from 'src/supabase/supabase.service';

@Injectable()
export class UploadService {
  constructor(private readonly supabaseService: SupabaseService) {}

  async uploadPhoto(name: string, buffer: Buffer, mimetype: string): Promise<string> {
    const supabase = this.supabaseService.getClient();

    const res = await supabase.storage.from('animals').upload(name, buffer, {
      upsert: true,
      contentType: mimetype
    });

    if (res.data) {
      const publicUrl = supabase.storage
        .from('animals')
        .getPublicUrl(res.data.path);

      return publicUrl.data.publicUrl
    }

    throw new Error('Erro inesperado ao processar o arquivo.');
  }
}
