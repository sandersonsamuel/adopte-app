import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  Param,
  Patch,
  Post,
  Put,
  Query,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { PhotoDTO } from 'src/modules/upload/dto/photo.dto';
import { UploadService } from 'src/modules/upload/upload.service';
import { AnimalsService } from './animals.service';
import { AnimalPaginateDto } from './dto/animal-paginate.dto';
import { CreateAnimalDto } from './dto/create-animal.dto';
import { UpdateAnimalDto } from './dto/update-animal.dto';
import { AuthGuard } from '../auth/auth.guard';

@Controller('animals')
export class AnimalsController {
  constructor(
    private readonly animalsService: AnimalsService,
    private readonly uploadService: UploadService,
  ) {}

  @Get('/paginate')
  async findAll(@Query() paginationQuery: AnimalPaginateDto) {
    return this.animalsService.findAll(paginationQuery);
  }

  @UseGuards(AuthGuard)
  @UseInterceptors(FileInterceptor('photo'))
  @Post('/create')
  async create(
    @UploadedFile() photo: PhotoDTO,
    @Body() animal: CreateAnimalDto,
  ) {
    const newAnimal = await this.animalsService.create(animal);

    if (!photo) {
      throw new HttpException('A imagem do animal é obrigatória', 400);
    }

    const optimizedBuffer = await this.uploadService.compressToMaxSize(
      photo.buffer,
      500,
      photo.mimetype,
    );

    const photoUrl = await this.uploadService.uploadPhoto(
      newAnimal.id,
      optimizedBuffer,
      photo.mimetype,
    );

    if (!photoUrl) {
      throw new HttpException('Error uploading photo', 500);
    }

    return this.animalsService.updatePhoto(newAnimal.id, photoUrl);
  }

  @UseGuards(AuthGuard)
  @UseInterceptors(FileInterceptor('photo'))
  @Patch('update-photo/:id')
  async updatePhoto(@UploadedFile() photo: PhotoDTO, @Param('id') id: string) {
    if (!photo) {
      throw new HttpException('A imagem do animal é obrigatória', 400);
    }

    const optimizedBuffer = await this.uploadService.compressToMaxSize(
      photo.buffer,
      500,
      photo.mimetype,
    );

    return await this.uploadService.updatePhoto(
      id,
      optimizedBuffer,
      photo.mimetype,
    );
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.animalsService.findOne(id);
  }

  @UseGuards(AuthGuard)
  @Put('update/:id')
  async update(
    @Param('id') id: string,
    @Body() updateAnimalDto: UpdateAnimalDto,
  ) {
    return this.animalsService.update(id, updateAnimalDto);
  }

  @UseGuards(AuthGuard)
  @Patch('adopted/:id')
  async adopted(@Param('id') id: string) {
    return this.animalsService.adopted(id);
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.animalsService.remove(id);
  }
}
