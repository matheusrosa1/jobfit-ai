import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  NotFoundException,
} from '@nestjs/common';
import { AnalysisService } from './analysis.service';
import { CreateAnalysisDto } from './dto/create-analysis.dto';
/* import { UpdateAnalysisDto } from './dto/update-analysis.dto'; */

@Controller('analysis')
export class AnalysisController {
  constructor(private readonly analysisService: AnalysisService) {}

  @Post()
  async analyzeSkills(@Body() createAnalysisDto: CreateAnalysisDto) {
    try {
      const analysis =
        await this.analysisService.analyzeSkills(createAnalysisDto);

      return {
        message: 'Analysis successfully generated',
        analysisResult: analysis.geminiAnalysis,
      };
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }

      throw new Error('Error generating analysis: ' + error.message);
    }
  }

  @Get()
  findAll() {
    return this.analysisService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.analysisService.findOne(+id);
  }

  /*   @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateAnalysisDto: UpdateAnalysisDto,
  ) {
    return this.analysisService.update(+id, updateAnalysisDto);
  }
 */
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.analysisService.remove(+id);
  }
}
