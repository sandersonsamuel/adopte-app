import { $Enums, Prisma } from '@adopte/db/generated/client';
import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  IsBoolean,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsString
} from 'class-validator';

export class CreateAnimalDto
  implements Omit<Prisma.AnimalsCreateInput, 'category' | 'photo'>
{
  @ApiProperty({
    type: String,
    description: 'The name of the animal',
    example: 'Popo',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    type: String,
    description: 'The age of the animal',
    example: 'ADULT',
  })
  @IsEnum($Enums.AgeGroupNames)
  @IsNotEmpty()
  age: $Enums.AgeGroupNames;

  @ApiProperty({
    type: Boolean,
    description: 'Whether the animal is neutered',
    example: false,
  })
  @Transform(({ value }) => {
    if (typeof value === 'boolean') return value;
    return value === 'true';
  })
  @IsBoolean()
  @IsNotEmpty()
  castred: boolean;

  @ApiProperty({
    type: String,
    description: 'The id of the category',
    example: '1',
  })
  @IsString()
  @IsNotEmpty()
  categoryId: string;

  @ApiProperty({
    type: String,
    description: 'The description of the animal',
    example: 'Popo is a cute dog',
  })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({
    type: String,
    description: 'The sex of the animal',
    example: 'MALE',
  })
  @IsEnum($Enums.Sexs)
  @IsNotEmpty()
  sex: $Enums.Sexs;


  @ApiProperty({
    type: Number,
    description: 'The weight(kg) of the animal',
    example: 10,
  })
  @Transform(({ value }) => parseFloat(value))
  @IsNumber()
  @IsNotEmpty()
  weight: number;
}
