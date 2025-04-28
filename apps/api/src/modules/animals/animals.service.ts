import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateAnimalDto } from './dto/create-animal.dto';
import { UpdateAnimalDto } from './dto/update-animal.dto';
import { PrismaService } from 'src/lib/prisma/prisma.service';
import { AnimalPaginateDto } from './dto/animal-paginate.dto';
import { UploadService } from '../upload/upload.service';
@Injectable()
export class AnimalsService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly uploadService: UploadService,
  ) {}

  async create(createAnimalDto: CreateAnimalDto) {
    return await this.prismaService.animals.create({
      data: {
        ...createAnimalDto,
      },
    });
  }

  async findAll({
    page,
    pageSize,
    category,
    sex,
    name,
    age,
    adopted,
  }: AnimalPaginateDto) {
    const data = await this.prismaService.animals.findMany({
      where: {
        category: {
          name: category || undefined,
          deletedAt: null,
        },
        deletedAt: null,
        adopted: !!adopted,
        sex,
        name: {
          contains: name,
          mode: 'insensitive',
        },
        age,
      },
      skip: (page - 1) * pageSize,
      take: pageSize,
    });

    return {
      data,
      pagination: {
        current: page,
        limit: pageSize,
        total: await this.prismaService.animals.count({
          where: {
            category: {
              name: category || undefined,
              deletedAt: null,
            },
            deletedAt: null,
            adopted: !!adopted,
            sex,
            name: {
              contains: name,
              mode: 'insensitive',
            },
            age,
          },
        }),
      },
    };
  }

  async findOne(id: string) {
    const animal = await this.prismaService.animals.findUnique({
      where: {
        id,
        deletedAt: null,
        adopted: false,
      },
      include: {
        category: true,
      },
    });

    if (!animal) {
      throw new HttpException('Animal não encontrado', HttpStatus.NOT_FOUND);
    }

    return animal;
  }

  async update(id: string, updateAnimalDto: UpdateAnimalDto) {
    await this.findOne(id);

    return this.prismaService.animals.update({
      where: {
        id,
        deletedAt: null,
      },
      data: updateAnimalDto,
    });
  }

  async updatePhoto(id: string, photo: string) {
    await this.findOne(id);

    return this.prismaService.animals.update({
      where: { id, deletedAt: null },
      data: { photo },
    });
  }

  async adopted(id: string) {
    await this.findOne(id);

    const animal = await this.prismaService.animals.update({
      where: { id, deletedAt: null },
      data: { adopted: true },
    });

    await this.uploadService.deletePhoto(animal.id);

    return animal;
  }

  async remove(id: string) {
    await this.findOne(id);

    const animal = await this.prismaService.animals.update({
      where: { id, deletedAt: null },
      data: { deletedAt: new Date() },
    });

    await this.uploadService.deletePhoto(animal.id);

    return animal;
  }

  async updatedAt(id: string) {
    await this.findOne(id);

    return this.prismaService.animals.update({
      where: { id, deletedAt: null },
      data: { updatedAt: new Date() },
    });
  }
}
