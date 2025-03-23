import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsInt, IsOptional, Min } from 'class-validator';

export class PaginationQueryDTO {
  @ApiProperty({
    default: 1,
    minimum: 1,
    required: false
  })
  @IsOptional()
  @Transform(({ value }) => {
    const parsedValue = parseInt(value);
    return isNaN(parsedValue) ? 1 : parsedValue;
  })
  @IsInt({ message: 'page deve ser um número inteiro' })
  @Min(1, { message: 'page deve ser pelo menos 1' })
  page: number;

  @ApiProperty({
    default: 10,
    minimum: 1,
    required: false
  })
  @IsOptional()
  @Transform(({ value }) => {
    const parsedValue = parseInt(value);
    return isNaN(parsedValue) ? 10 : parsedValue;
  })
  @IsInt({ message: 'page deve ser um número inteiro' })
  @Min(1, { message: 'page deve ser pelo menos 1' })
  pageSize: number;
}
