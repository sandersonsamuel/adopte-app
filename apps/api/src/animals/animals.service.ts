import { Injectable } from '@nestjs/common';
import { CreateAnimalDto } from './dto/create-animal.dto';
import { UpdateAnimalDto } from './dto/update-animal.dto';
import { PrismaService } from 'src/prisma/prisma.service';

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

  findAll() {
    return this.prismaService.animals.findMany({
      
    })
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
