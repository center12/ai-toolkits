// Template: Create DTO
// Location: src/modules/<module-name>/dto/create-<module-name>.dto.ts

import { IsString, IsNotEmpty, IsOptional } from 'class-validator'

export class CreateModuleNameDto {
  @IsString()
  @IsNotEmpty()
  name: string

  @IsString()
  @IsOptional()
  description?: string

  // TODO: add more fields with class-validator decorators
  // Common decorators: @IsEmail(), @IsEnum(MyEnum), @IsNumber(), @IsBoolean(), @IsArray()
}
