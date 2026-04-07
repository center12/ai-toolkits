// Template: NestJS module
// Location: src/modules/<module-name>/<module-name>.module.ts
// Usage: Replace ModuleName and module-name with your names

import { Module } from '@nestjs/common'
import { ModuleNameController } from './module-name.controller'
import { ModuleNameService } from './module-name.service'
import { PrismaService } from '../../prisma/prisma.service'

// To use JwtAuthGuard from auth module, add to imports:
// import { AuthModule } from '../auth/auth.module'

@Module({
  // imports: [AuthModule],   // uncomment if you need AuthService or shared guards
  controllers: [ModuleNameController],
  providers: [ModuleNameService, PrismaService],
  exports: [ModuleNameService],  // export if other modules need this service
})
export class ModuleNameModule {}
