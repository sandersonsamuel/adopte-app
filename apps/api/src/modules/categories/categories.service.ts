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
        deletedAt: null,
      },
    });

    if (categoryIsAlreadyExists) {
      throw new HttpException('A Categoria já existe', 400);
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

  findOne(id: number) {
    return `This action returns a #${id} category`;
  }

  update(id: number, updateCategoryDto: UpdateCategoryDto) {
    return `This action updates a #${id} category`;
  }

  remove(id: number) {
    return `This action removes a #${id} category`;
  }
}
