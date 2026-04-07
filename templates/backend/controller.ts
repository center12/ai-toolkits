// Template: NestJS controller
// Location: src/modules/<module-name>/<module-name>.controller.ts
// Note: JwtAuthGuard is applied globally — all routes protected by default.
// Use @Public() decorator to opt a route out of auth.

import { Controller, Get, Post, Put, Delete, Param, Body, HttpCode, HttpStatus } from '@nestjs/common'
import { ModuleNameService } from './module-name.service'
import { CreateModuleNameDto } from './dto/create-module-name.dto'
import { UpdateModuleNameDto } from './dto/update-module-name.dto'

@Controller('module-name')
export class ModuleNameController {
  constructor(private readonly moduleNameService: ModuleNameService) {}

  @Get()
  findAll() {
    return this.moduleNameService.findAll()
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.moduleNameService.findOne(id)
  }

  @Post()
  create(@Body() dto: CreateModuleNameDto) {
    return this.moduleNameService.create(dto)
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() dto: UpdateModuleNameDto) {
    return this.moduleNameService.update(id, dto)
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: string) {
    return this.moduleNameService.remove(id)
  }
}
