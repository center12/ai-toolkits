// Template: NestJS controller
// Location: src/modules/<module-name>/<module-name>.controller.ts
// Note: JwtAuthGuard is applied globally — all routes protected by default.
// Use @Public() decorator to opt a route out of auth.

import { Controller, Get, Post, Put, Delete, Param, Body, HttpCode, HttpStatus } from '@nestjs/common'
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiNotFoundResponse } from '@nestjs/swagger'
import { ModuleNameService } from './module-name.service'
import { CreateModuleNameDto } from './dto/create-module-name.dto'
import { UpdateModuleNameDto } from './dto/update-module-name.dto'

@ApiTags('ModuleName')
@ApiBearerAuth()
@Controller('module-name')
export class ModuleNameController {
  constructor(private readonly moduleNameService: ModuleNameService) {}

  @Get()
  @ApiOperation({ summary: 'List all ModuleName items' })
  @ApiResponse({ status: 200, description: 'Returns all items' })
  findAll() {
    return this.moduleNameService.findAll()
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get one ModuleName item by ID' })
  @ApiResponse({ status: 200, description: 'Returns the item' })
  @ApiNotFoundResponse({ description: 'ModuleName not found' })
  findOne(@Param('id') id: string) {
    return this.moduleNameService.findOne(id)
  }

  @Post()
  @ApiOperation({ summary: 'Create a new ModuleName item' })
  @ApiResponse({ status: 201, description: 'Item created' })
  create(@Body() dto: CreateModuleNameDto) {
    return this.moduleNameService.create(dto)
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a ModuleName item' })
  @ApiResponse({ status: 200, description: 'Item updated' })
  @ApiNotFoundResponse({ description: 'ModuleName not found' })
  update(@Param('id') id: string, @Body() dto: UpdateModuleNameDto) {
    return this.moduleNameService.update(id, dto)
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete a ModuleName item' })
  @ApiResponse({ status: 204, description: 'Item deleted' })
  @ApiNotFoundResponse({ description: 'ModuleName not found' })
  remove(@Param('id') id: string) {
    return this.moduleNameService.remove(id)
  }
}
