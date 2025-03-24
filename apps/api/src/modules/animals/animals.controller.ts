import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  Param,
  Patch,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadService } from 'src/upload/upload.service';
import { AnimalsService } from './animals.service';
import { UpdateAnimalDto } from './dto/update-animal.dto';
import { PhotoDTO } from 'src/upload/dto/photo.dto';
import { CreateAnimalDto } from './dto/create-animal.dto';
import { PaginationQueryDTO } from 'src/common/dto/pagination-query.dto';

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
    const photoUrl = await this.uploadService.uploadPhoto(
      photo.originalname,
      photo.buffer,
      photo.mimetype,
    );

    if (!photoUrl) {
      throw new HttpException('Error uploading photo', 500);
    }

    return this.animalsService.create(photoUrl, animal);
  }

  @Get('/paginate')
  findAll(@Param() paginationQuery: PaginationQueryDTO) {
    const { page, pageSize } = paginationQuery;
    return this.animalsService.findAll(page, pageSize);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.animalsService.findOne(+id);
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
