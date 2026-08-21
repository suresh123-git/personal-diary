import { Controller, Get, UseGuards, Res } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { Response } from 'express';
import { ExportService } from './export.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { GetUser } from '../../common/decorators/get-user.decorator';

@ApiTags('Export')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('export')
export class ExportController {
  constructor(private readonly exportService: ExportService) {}

  @Get('json')
  @ApiOperation({ summary: 'Export complete diary dataset as JSON' })
  async exportJson(@GetUser('_id') userId: string) {
    return this.exportService.exportJson(userId.toString());
  }

  @Get('markdown')
  @ApiOperation({ summary: 'Export complete diary entries as Markdown file' })
  async exportMarkdown(
    @GetUser('_id') userId: string,
    @Res() res: Response,
  ) {
    const mdContent = await this.exportService.exportMarkdown(userId.toString());
    res.setHeader('Content-Type', 'text/markdown');
    res.setHeader(
      'Content-Disposition',
      `attachment; filename="harry_potter_diary_${new Date().toISOString().split('T')[0]}.md"`,
    );
    return res.send(mdContent);
  }
}
