import { IsNotEmpty, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateCategoryDto {
  @ApiProperty({
    description: 'The name of the category',
    example: 'dog',
  })
  @IsString()
  @IsNotEmpty()
  name: string;
}
