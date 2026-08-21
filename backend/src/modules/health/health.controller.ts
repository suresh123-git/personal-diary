import { Controller, Get } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('Health')
@Controller('health')
export class HealthController {
  @Get()
  @ApiOperation({ summary: 'Health check' })
  checkHealth() {
    return {
      status: 'ok',
      timestamp: new Date().toISOString(),
      service: 'hp-diary-backend',
    };
  }

  @Get('readiness')
  @ApiOperation({ summary: 'Readiness probe' })
  checkReadiness() {
    return { status: 'ready', timestamp: new Date().toISOString() };
  }

  @Get('liveness')
  @ApiOperation({ summary: 'Liveness probe' })
  checkLiveness() {
    return { status: 'alive', timestamp: new Date().toISOString() };
  }
}
