import { IsNotEmpty, IsString } from 'class-validator';

export class PhotoDTO {
  @IsNotEmpty()
  buffer: Buffer<ArrayBufferLike>;

  @IsString()
  @IsNotEmpty()
  mimetype: string;

  @IsString()
  @IsNotEmpty()
  originalname: string;
}
