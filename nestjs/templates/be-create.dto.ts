// Template: Create DTO
// Location: src/modules/<module-name>/dto/create-<module-name>.dto.ts

import { IsString, IsNotEmpty, IsOptional } from 'class-validator'
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'

export class CreateModuleNameDto {
  @ApiProperty({ description: 'Name of the item', example: 'My item' })
  @IsString()
  @IsNotEmpty()
  name: string

  @ApiPropertyOptional({ description: 'Optional description', example: 'Some details' })
  @IsString()
  @IsOptional()
  description?: string

  // TODO: add more fields with class-validator + @ApiProperty decorators
  // Common decorators: @IsEmail(), @IsEnum(MyEnum), @IsNumber(), @IsBoolean(), @IsArray()
}
