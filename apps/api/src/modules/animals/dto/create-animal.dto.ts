import { $Enums, Prisma } from '@adopte/db/generated/client';
import { Decimal } from '@adopte/db/generated/client/runtime/library';
import { Transform } from 'class-transformer';
import {
  IsBoolean,
  IsDecimal,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';

export class CreateAnimalDto
  implements Omit<Prisma.AnimalsCreateInput, 'category' | 'photo'>
{
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEnum($Enums.AgeGroupNames)
  @IsNotEmpty()
  age: $Enums.AgeGroupNames;

  @Transform(({ value }) => value === 'true')
  @IsBoolean()
  @IsNotEmpty()
  castred: boolean;

  @IsString()
  @IsNotEmpty()
  categoryId: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsEnum($Enums.Sexs)
  @IsNotEmpty()
  sex: $Enums.Sexs;

  @Transform(({ value }) => parseFloat(value))
  @IsNumber()
  @IsNotEmpty()
  weight: number;
}
