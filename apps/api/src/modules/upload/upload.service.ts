import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as sharp from 'sharp';
import { SupabaseService } from 'src/lib/supabase/supabase.service';

@Injectable()
export class UploadService {
  constructor(private readonly supabaseService: SupabaseService) {}

  async uploadPhoto(
    name: string,
    buffer: Buffer,
    mimetype: string,
  ): Promise<string> {
    const supabase = this.supabaseService.getClient();

    const res = await supabase.storage.from('animals').upload(name, buffer, {
      upsert: true,
      contentType: mimetype,
    });

    if (res.data) {
      const publicUrl = supabase.storage
        .from('animals')
        .getPublicUrl(res.data.path);

      return publicUrl.data.publicUrl;
    }

    throw new HttpException(
      res.error.message,
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
  }

  async deletePhoto(name: string) {
    const supabase = this.supabaseService.getClient();

    const { error } = await supabase.storage.from('animals').remove([name]);

    if (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async updatePhoto(name: string, buffer: Buffer, mimetype: string) {
    const supabase = this.supabaseService.getClient();

    await this.deletePhoto(name);

    const { error } = await supabase.storage
      .from('animals')
      .update(name, buffer, {
        contentType: mimetype,
        cacheControl: '3600',
        upsert: true,
      });

    if (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    const publicUrl = supabase.storage.from('animals').getPublicUrl(name);

    return publicUrl.data.publicUrl;
  }

  async compressToMaxSize(
    buffer: Buffer,
    maxSizeKB: number,
    mimetype: string,
  ): Promise<Buffer> {
    let quality = 90;
    let compressedBuffer = buffer;

    // define a compressao com base no tipo de imagem
    const formatOptions = {
      'image/jpeg': (img: sharp.Sharp) => img.jpeg({ quality }),
      'image/png': (img: sharp.Sharp) =>
        img.png({ quality: Math.max(quality, 10), compressionLevel: 9 }),
      'image/webp': (img: sharp.Sharp) => img.webp({ quality }),
    };

    const compressImage =
      formatOptions[mimetype] || formatOptions['image/jpeg'];

    while (quality > 10) {
      compressedBuffer = await compressImage(
        sharp(buffer).resize({ width: 800 }),
      ).toBuffer();

      if (compressedBuffer.length <= maxSizeKB * 1024) break;

      quality -= 5; // reduz a qualidade a cada loop
    }

    return compressedBuffer;
  }
}
