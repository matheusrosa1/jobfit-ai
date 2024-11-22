import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateJobSkillDto } from './dto/create-job-skill.dto';
import { UpdateJobSkillDto } from './dto/update-job-skill.dto';
import { JobService } from '../job/job.service';
import { SkillService } from '../skill/skill.service';
import { Repository } from 'typeorm';
import { JobSkill } from './entities/job-skill.entity';

@Injectable()
export class JobSkillService {
  constructor(
    private readonly jobSkillRepository: Repository<JobSkill>,
    private readonly jobService: JobService, // Usando o JobService
    private readonly skillService: SkillService, // Usando o SkillService
  ) {}

  async create(createJobSkillDto: CreateJobSkillDto) {
    // Verificar se o Job existe usando o JobService
    const job = await this.jobService.findOne(createJobSkillDto.jobId);
    if (!job) {
      throw new NotFoundException(
        `Job with ID ${createJobSkillDto.jobId} not found`, //
      );
    }

    // Verificar se a Skill existe usando o SkillService
    const skill = await this.skillService.findOne(createJobSkillDto.skillId);
    if (!skill) {
      throw new NotFoundException(
        `Skill with ID ${createJobSkillDto.skillId} not found`,
      );
    }

    // Criar a JobSkill
    return await this.jobSkillRepository.create(createJobSkillDto);
  }

  async findAll() {
    return await this.jobSkillRepository.find();
  }

  async findOne(id: string) {
    const jobSkill = await this.jobSkillRepository.findOne({ where: { id } });
    if (!jobSkill) {
      throw new NotFoundException(`JobSkill with ID ${id} not found`);
    }
    return jobSkill;
  }

  async update(id: string, updateJobSkillDto: UpdateJobSkillDto) {
    // Verificar se o Job existe usando o JobService
    const job = await this.jobService.findOne(updateJobSkillDto.jobId);
    if (!job) {
      throw new NotFoundException(
        `Job with ID ${updateJobSkillDto.jobId} not found`,
      );
    }

    // Verificar se a Skill existe usando o SkillService
    const skill = await this.skillService.findOne(updateJobSkillDto.skillId);
    if (!skill) {
      throw new NotFoundException(
        `Skill with ID ${updateJobSkillDto.skillId} not found`,
      );
    }

    // Atualizar a JobSkill
    const jobSkill = await this.jobSkillRepository.findOne({ where: { id } });
    if (!jobSkill) {
      throw new NotFoundException(`JobSkill with ID ${id} not found`);
    }

    return await this.jobSkillRepository.update(id, updateJobSkillDto);
  }

  async remove(id: string) {
    const jobSkill = await this.jobSkillRepository.findOne({ where: { id } });
    if (!jobSkill) {
      throw new NotFoundException(`JobSkill with ID ${id} not found`);
    }

    await this.jobSkillRepository.remove(jobSkill);
    return { message: `JobSkill with ID ${id} has been removed` };
  }
}
