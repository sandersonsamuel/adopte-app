import { $Enums, Prisma } from '@prisma/client';
import { Decimal } from '@prisma/client/runtime/library';
import {
  IsBoolean,
  IsDecimal,
  IsEnum,
  IsNotEmpty,
  IsString,
} from 'class-validator';

export class CreateAnimalDto
  implements Omit<Prisma.AnimalsCreateInput, 'category' | 'photo'>
{
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsBoolean()
  @IsNotEmpty()
  adopted: boolean;

  @IsEnum($Enums.AgeGroupNames)
  @IsNotEmpty()
  age: $Enums.AgeGroupNames;

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

  @IsDecimal()
  @IsNotEmpty()
  weight: Decimal;
}
