import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  Param,
  Patch,
  Post,
  Query,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { PhotoDTO } from 'src/modules/upload/dto/photo.dto';
import { UploadService } from 'src/modules/upload/upload.service';
import { AnimalsService } from './animals.service';
import { AnimalPaginateDto } from './dto/animal-paginate.dto';
import { CreateAnimalDto } from './dto/create-animal.dto';
import { UpdateAnimalDto } from './dto/update-animal.dto';

@Controller('animals')
export class AnimalsController {
  constructor(
    private readonly animalsService: AnimalsService,
    private readonly uploadService: UploadService,
  ) {}

  @UseInterceptors(FileInterceptor('photo'))
  @Post('/create')
  async create(
    @UploadedFile() photo: PhotoDTO,
    @Body() animal: CreateAnimalDto,
  ) {
    const photoName = photo.originalname
      .toLowerCase()
      .normalize('NFD') // Remove acentos (ex: "ã" → "a")
      .replace(/[\u0300-\u036f]/g, '') // Remove marcas de acentuação
      .replace(/\s+/g, '_') // Substitui espaços por "_"
      .replace(/[^\w.-]/g, '') // Remove caracteres especiais, mantendo apenas letras, números, "_" e "."
      .replace(/_{2,}/g, '_'); // Evita múltiplos underscores seguidos

    const optimizedBuffer = await this.uploadService.compressToMaxSize(
      photo.buffer,
      500,
      photo.mimetype,
    );

    const photoUrl = await this.uploadService.uploadPhoto(
      photoName,
      optimizedBuffer,
      photo.mimetype,
    );

    if (!photoUrl) {
      throw new HttpException('Error uploading photo', 500);
    }

    return this.animalsService.create(photoUrl, animal);
  }

  @Get('/paginate')
  findAll(@Query() paginationQuery: AnimalPaginateDto) {
    const { page, pageSize, category } = paginationQuery;
    return this.animalsService.findAll(page, pageSize, category);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.animalsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAnimalDto: UpdateAnimalDto) {
    return this.animalsService.update(+id, updateAnimalDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.animalsService.remove(+id);
  }
}
