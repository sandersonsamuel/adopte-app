import { Injectable } from '@nestjs/common';
import { CreateAnimalDto } from './dto/create-animal.dto';
import { UpdateAnimalDto } from './dto/update-animal.dto';
import { PrismaService } from 'src/lib/prisma/prisma.service';

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

  findAll(page: number, pageSize: number, category?: string) {

    if (category) {
      return this.prismaService.animals.findMany({
        where: {
          category: {
            name: category,
            deletedAt: null,
          },
          deletedAt: null,
        },
        skip: (page - 1) * pageSize,
        take: pageSize,
      });
    }

    return this.prismaService.animals.findMany({
      where: {
        deletedAt: null,
      },
      skip: (page - 1) * pageSize,
      take: pageSize,
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} animal`;
  }

  update(id: number, updateAnimalDto: UpdateAnimalDto) {
    return `This action updates a #${id} animal`;
  }

  remove(id: number) {
    return `This action removes a #${id} animal`;
  }
}
