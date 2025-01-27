import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Analysis } from './entities/analysis.entity';
import { UserSkillService } from '../../src/user-skill/user-skill.service';
import { JobSkillService } from '../../src/job-skill/job-skill.service';
import { GeminiService } from '../../src/gemini/gemini.service';
import { CreateAnalysisDto } from './dto/create-analysis.dto';
import { JobService } from '../../src/job/job.service';
import { generateSkillAnalysisPrompt } from '../../src/utils/promptGenerator';
import { UserService } from '../../src/user/user.service';

@Injectable()
export class AnalysisService {
  constructor(
    @InjectRepository(Analysis)
    private readonly analysisRepository: Repository<Analysis>,
    private readonly userSkillService: UserSkillService,
    private readonly jobSkillService: JobSkillService,
    private readonly geminiService: GeminiService,
    private readonly userService: UserService,
    private readonly jobService: JobService,
  ) {}

  async analyzeSkills(createAnalysisDto: CreateAnalysisDto) {
    const { userId, jobId } = createAnalysisDto;
    const userSkills = await this.userSkillService.findSkillsByUserId(userId);
    const jobSkills = await this.jobSkillService.findSkillsByJobId(jobId);

    const prompt = generateSkillAnalysisPrompt(userSkills, jobSkills);

    let geminiAnalysis;
    try {
      geminiAnalysis = await this.geminiService.generateResponse(prompt);
    } catch (error) {
      throw new Error(
        'Error generating analysis from Gemini AI' + error.message,
      );
    }
    const cleanAnalysis = geminiAnalysis.replace(/\n/g, ' ');
    const user = await this.userService.findOne(userId);
    const job = await this.jobService.findOne(jobId);

    const analysis = this.analysisRepository.create({
      user,
      job,
      geminiAnalysis: cleanAnalysis,
    });

    return await this.analysisRepository.save(analysis);
  }

  findAll() {
    return this.analysisRepository.find();
  }

  findOne(id: string) {
    const analysis = this.analysisRepository.findOne({ where: { id } });
    if (!analysis) {
      throw new NotFoundException(`Analysis with id ${id} not found`);
    }
    return analysis;
  }

  remove(id: number) {
    return `This action removes a #${id} analysis`;
  }
}
