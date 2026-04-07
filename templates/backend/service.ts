// Template: NestJS service
// Location: src/modules/<module-name>/<module-name>.service.ts

import { Injectable, NotFoundException } from '@nestjs/common'
import { PrismaService } from '../../prisma/prisma.service'
import { CreateModuleNameDto } from './dto/create-module-name.dto'
import { UpdateModuleNameDto } from './dto/update-module-name.dto'

@Injectable()
export class ModuleNameService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    return this.prisma.moduleName.findMany({
      orderBy: { createdAt: 'desc' },
    })
  }

  async findOne(id: string) {
    const item = await this.prisma.moduleName.findUnique({ where: { id } })
    if (!item) throw new NotFoundException(`ModuleName ${id} not found`)
    return item
  }

  async create(dto: CreateModuleNameDto) {
    return this.prisma.moduleName.create({ data: dto })
  }

  async update(id: string, dto: UpdateModuleNameDto) {
    await this.findOne(id) // throws if not found
    return this.prisma.moduleName.update({ where: { id }, data: dto })
  }

  async remove(id: string) {
    await this.findOne(id) // throws if not found
    return this.prisma.moduleName.delete({ where: { id } })
  }
}
