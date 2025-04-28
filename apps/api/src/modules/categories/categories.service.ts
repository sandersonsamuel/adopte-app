import { HttpException, Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { PrismaService } from 'src/lib/prisma/prisma.service';

@Injectable()
export class CategoriesService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createCategoryDto: CreateCategoryDto) {
    const categoryIsAlreadyExists = await this.prisma.categories.findUnique({
      where: {
        name: createCategoryDto.name,
      },
    });

    if (categoryIsAlreadyExists && categoryIsAlreadyExists.deletedAt === null) {
      throw new HttpException('A Categoria já existe', 400);
    }

    if (categoryIsAlreadyExists && categoryIsAlreadyExists.deletedAt !== null) {
      return this.restore(categoryIsAlreadyExists.id);
    }

    return this.prisma.categories.create({
      data: createCategoryDto,
    });
  }

  findAll() {
    return this.prisma.categories.findMany({
      where: {
        deletedAt: null,
      },
    });
  }

  async findOne(id: string) {
    const category = await this.prisma.categories.findUnique({
      where: {
        id,
        deletedAt: null,
      },
    });

    if (!category) {
      throw new HttpException('Categoria não encontrada', 404);
    }

    return category;
  }

  async update(id: string, updateCategoryDto: UpdateCategoryDto) {
    await this.findOne(id);

    const categoryIsAlreadyExists = await this.prisma.categories.findUnique({
      where: {
        name: updateCategoryDto.name,
        deletedAt: null,
      },
    })
    
    if (categoryIsAlreadyExists) {
      throw new HttpException('A Categoria já existe', 400);
    }

    return this.prisma.categories.update({
      where: {
        id,
      },
      data: updateCategoryDto,
    });
  }

  async restore(id: string) {
    return this.prisma.categories.update({
      where: {
        id,
      },
      data: {
        deletedAt: null,
      },
    });
  }

  async remove(id: string) {
    await this.findOne(id);

    await this.prisma.animals.updateMany({
      where: {
        categoryId: id,
      },
      data: {
        deletedAt: new Date(),
      },
    });

    return this.prisma.categories.update({
      where: {
        id,
      },
      data: {
        deletedAt: new Date(),
      },
    });
  }
}
