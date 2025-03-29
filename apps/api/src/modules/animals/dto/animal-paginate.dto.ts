import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, IsString } from "class-validator";
import { PaginationQueryDTO } from "src/common/dto/pagination-query.dto";

export class AnimalPaginateDto extends PaginationQueryDTO {
  @ApiProperty({
    description: 'The category to filter the animals',
    example: 'dog',
    required: false,
  })
  @IsOptional()
  @IsString()
  category?: string;
}
