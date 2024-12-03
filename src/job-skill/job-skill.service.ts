import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateJobSkillDto } from './dto/create-job-skill.dto';
import { UpdateJobSkillDto } from './dto/update-job-skill.dto';
import { JobService } from '../job/job.service';
import { SkillService } from '../skill/skill.service';
import { Repository } from 'typeorm';
import { JobSkill } from './entities/job-skill.entity';
import { plainToInstance } from 'class-transformer';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class JobSkillService {
  constructor(
    @InjectRepository(JobSkill)
    private readonly jobSkillRepository: Repository<JobSkill>,
    private readonly jobService: JobService,
    private readonly skillService: SkillService,
  ) {}

  async checkJobSkillExists(jobId: string, skillId: string) {
    const existingJobSkill = await this.jobSkillRepository.findOne({
      where: {
        job: { id: jobId },
        skill: { id: skillId },
      },
    });

    return existingJobSkill !== null;
  }

  async create(createJobSkillDto: CreateJobSkillDto) {
    const { jobId, skillId } = createJobSkillDto;
    const job = await this.jobService.findOne(createJobSkillDto.jobId);
    if (!job) {
      throw new NotFoundException(
        `Job with ID ${createJobSkillDto.jobId} not found`, //
      );
    }

    const skill = await this.skillService.findOne(createJobSkillDto.skillId);
    if (!skill) {
      throw new NotFoundException(
        `Skill with ID ${createJobSkillDto.skillId} not found`,
      );
    }

    const jobSkill = this.jobSkillRepository.create({
      job,
      skill,
      experienceRequired: createJobSkillDto.experienceRequired,
    });

    const jobSkillExists = await this.checkJobSkillExists(jobId, skillId);
    if (jobSkillExists) {
      throw new BadRequestException(
        `Job with ID ${jobId} already has skill with ID ${skillId}`,
      );
    }

    return await this.jobSkillRepository.save(jobSkill);
  }

  async findAll() {
    return await this.jobSkillRepository.find({ relations: ['job', 'skill'] });
  }

  async findSkillsByJobId(
    jobId: string,
  ): Promise<{ name: string; experienceRequired: number }[]> {
    const jobSkills = await this.jobSkillRepository.find({
      where: { job: { id: jobId } },
      relations: ['job', 'skill'],
    });

    if (!jobSkills || jobSkills.length === 0) {
      throw new NotFoundException(`No skills found for Job with ID ${jobId}`);
    }

    return jobSkills.map((jobSkill) => ({
      name: jobSkill.skill.name,
      experienceRequired: jobSkill.experienceRequired,
    }));
  }

  async findOne(id: string) {
    const jobSkill = await this.jobSkillRepository.findOne({ where: { id } });
    if (!jobSkill) {
      throw new NotFoundException(`JobSkill with ID ${id} not found`);
    }
    return jobSkill;
  }

  async update(id: string, updateJobSkillDto: UpdateJobSkillDto) {
    const job = await this.jobService.findOne(updateJobSkillDto.jobId);
    if (!job) {
      throw new NotFoundException(
        `Job with ID ${updateJobSkillDto.jobId} not found`,
      );
    }

    const skill = await this.skillService.findOne(updateJobSkillDto.skillId);
    if (!skill) {
      throw new NotFoundException(
        `Skill with ID ${updateJobSkillDto.skillId} not found`,
      );
    }

    const jobSkill = await this.jobSkillRepository.findOne({ where: { id } });
    if (!jobSkill) {
      throw new NotFoundException(`JobSkill with ID ${id} not found`);
    }

    const updatedData = plainToInstance(JobSkill, updateJobSkillDto);

    await this.jobSkillRepository.update(id, updatedData);

    return { message: 'Update successful' };
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
