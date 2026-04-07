// Template: Update DTO
// Location: src/modules/<module-name>/dto/update-<module-name>.dto.ts
// All fields from CreateDto become optional automatically via PartialType.

import { PartialType } from '@nestjs/mapped-types'
import { CreateModuleNameDto } from './create-module-name.dto'

export class UpdateModuleNameDto extends PartialType(CreateModuleNameDto) {}
