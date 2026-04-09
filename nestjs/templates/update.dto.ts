// Template: Update DTO
// Location: src/modules/<module-name>/dto/update-<module-name>.dto.ts
// All fields from CreateDto become optional automatically via PartialType.
// Using @nestjs/swagger PartialType (not @nestjs/mapped-types) so Swagger
// correctly shows all fields as optional in the generated docs.

import { PartialType } from '@nestjs/swagger'
import { CreateModuleNameDto } from './create-module-name.dto'

export class UpdateModuleNameDto extends PartialType(CreateModuleNameDto) {}
