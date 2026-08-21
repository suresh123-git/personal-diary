import { Controller, Get, Post, Delete, Body, Param, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { PensieveService } from './pensieve.service';
import { AskPensieveDto } from './dto/ask-pensieve.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { GetUser } from '../../common/decorators/get-user.decorator';

@ApiTags('Pensieve')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('pensieve')
export class PensieveController {
  constructor(private readonly pensieveService: PensieveService) {}

  @Post('explore')
  @ApiOperation({ summary: 'Ask Pensieve AI memory assistant' })
  async explore(
    @GetUser('_id') userId: string,
    @Body() dto: AskPensieveDto,
  ) {
    return this.pensieveService.exploreMemories(userId.toString(), dto);
  }

  @Get('conversations')
  @ApiOperation({ summary: 'Get history of Pensieve AI conversations' })
  async getConversations(@GetUser('_id') userId: string) {
    return this.pensieveService.getConversations(userId.toString());
  }

  @Delete('conversations/:id')
  @ApiOperation({ summary: 'Delete Pensieve conversation' })
  async deleteConversation(
    @GetUser('_id') userId: string,
    @Param('id') id: string,
  ) {
    return this.pensieveService.deleteConversation(userId.toString(), id);
  }
}
