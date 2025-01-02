import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateSkillDto } from './dto/create-skill.dto';
import { UpdateSkillDto } from './dto/update-skill.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Skill } from './entities/skill.entity';
import { Repository } from 'typeorm';
import { normalizeSkillName } from '../../src/utils/normalizeSkillName';

@Injectable()
export class SkillService {
  constructor(
    @InjectRepository(Skill)
    private readonly skillRepository: Repository<Skill>,
  ) {}

  async findBySkillName(name: string): Promise<Skill> {
    const normalizedSkillName = normalizeSkillName(name);

    const skill = await this.skillRepository.findOne({
      where: { name: normalizedSkillName },
    });

    if (!skill) {
      throw new NotFoundException(`Skill with name ${name} not found`);
    }

    return skill;
  }

  async create(createSkillDto: CreateSkillDto): Promise<Skill> {
    const normalizedSkillName = normalizeSkillName(createSkillDto.name);

    try {
      await this.findBySkillName(normalizedSkillName);

      throw new ConflictException('Skill already exists');
    } catch (error) {
      if (error instanceof NotFoundException) {
        const skill = this.skillRepository.create({
          ...createSkillDto,
          name: normalizedSkillName,
        });

        return await this.skillRepository.save(skill);
      }
      throw error;
    }
  }

  findAll() {
    return this.skillRepository.find();
  }

  async findOne(id: string): Promise<Skill> {
    return this.skillRepository.findOne({
      where: { id },
      relations: ['users', 'jobs'], // Carrega os usuários e jobs relacionados
    });
  }
  

  async update(id: string, updateSkillDto: UpdateSkillDto) {
    const skill = await this.skillRepository.findOne({
      where: { id },
      relations: ['users', 'jobs'],  // Carrega as relações com usuários e jobs
    });
  
    if (!skill) {
      throw new NotFoundException(`Skill with ID ${id} not found`);
    }
  
    // Verificando se a skill está associada a jobs
    if (skill.jobs && skill.jobs.length > 0) {
      throw new BadRequestException(
        `Cannot update skill with ID ${id} because it is associated with jobs.`
      );
    }
  
    // Verificando se a skill está associada a users
    if (skill.users && skill.users.length > 0) {
      throw new BadRequestException(
        `Cannot update skill with ID ${id} because it is associated with users.`
      );
    }
  
    // Atualiza a skill
    await this.skillRepository.update(id, updateSkillDto);

    console.log('user skills', skill.users);
  
    return this.findOne(id);
  }

  async remove(id: string) {
    const skill = await this.findOne(id);

    if (skill.jobs && skill.jobs.length > 0) {
      throw new BadRequestException(
        `Cannot delete skill with ID ${id} because it is associated with jobs.`
      );
    }

    if (skill.users && skill.users.length > 0) {
      throw new BadRequestException(
        `Cannot delete skill with ID ${id} because it is associated with users.`
      );
    }  

    return this.skillRepository.remove(skill);
  }
}
