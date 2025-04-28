import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsEnum, IsOptional, IsString } from 'class-validator';
import { PaginationQueryDTO } from 'src/common/dto/pagination-query.dto';
import { $Enums } from '@adopte/db/generated/client';
import { Transform } from 'class-transformer';

export class AnimalPaginateDto extends PaginationQueryDTO {
  @ApiProperty({
    description: 'The category to filter the animals',
    example: 'cachorro',
    required: false,
  })
  @IsOptional()
  @IsString()
  category?: string;

  @ApiProperty({
    description: 'The sex to filter the animals',
    example: 'MALE',
    required: false,
  })
  @IsOptional()
  @IsEnum($Enums.Sexs)
  sex?: $Enums.Sexs;

  @ApiProperty({
    description: 'The name to filter the animals',
    example: 'Popo',
    required: false,
  })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiProperty({
    description: 'The age to filter the animals',
    example: 'BABY',
    required: false,
  })
  @IsOptional()
  @IsEnum($Enums.AgeGroupNames)
  age?: $Enums.AgeGroupNames;

  @ApiProperty({
    description: 'The adopted to filter the animals',
    example: 'true',
    required: false,
  })
  @Transform(({ value }) =>
    typeof value === 'string' ? value === 'true' : value,
  )
  @IsOptional()
  @IsBoolean()
  adopted?: boolean;
}
