import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateAnimalDto } from './dto/create-animal.dto';
import { UpdateAnimalDto } from './dto/update-animal.dto';
import { PrismaService } from 'src/lib/prisma/prisma.service';
import { AnimalPaginateDto } from './dto/animal-paginate.dto';

@Injectable()
export class AnimalsService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(photoUrl: string, createAnimalDto: CreateAnimalDto) {
    return await this.prismaService.animals.create({
      data: {
        photo: photoUrl,
        ...createAnimalDto,
      },
    });
  }

  findAll({ page, pageSize, category, sex, name, age }: AnimalPaginateDto) {
    if (category) {
      return this.prismaService.animals.findMany({
        where: {
          category: {
            name: category,
            deletedAt: null,
          },
          deletedAt: null,
          adopted: false,
          sex,
          name,
          age,
        },
        skip: (page - 1) * pageSize,
        take: pageSize,
      });
    }

    return this.prismaService.animals.findMany({
      where: {
        deletedAt: null,
        adopted: false,
        sex,
        name,
        age,
      },
      skip: (page - 1) * pageSize,
      take: pageSize,
    });
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

  async adopted(id: string) {
    await this.findOne(id);

    return this.prismaService.animals.update({
      where: { id, deletedAt: null },
      data: { adopted: true },
    });
  }

  async remove(id: string) {
    await this.findOne(id);

    return this.prismaService.animals.update({
      where: { id, deletedAt: null },
      data: { deletedAt: new Date() },
    });
  }
}
