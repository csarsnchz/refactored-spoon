import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { TenantsService } from './tenants.service';
import { JwtGuard } from 'src/auth/guards/jwt.guard';

@Controller('tenants')
export class TenantsController {
  constructor(private readonly tenantsService: TenantsService) {}

  @UseGuards(JwtGuard)
  @Get("roles/:tenant")
  fibndByUser(@Param('tenant') tenant: string) {
    return this.tenantsService.findRolesByTenant(tenant);
  }
}
