import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateSkillDto } from './dto/create-skill.dto';
import { UpdateSkillDto } from './dto/update-skill.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Skill } from './entities/skill.entity';
import { Repository } from 'typeorm';

@Injectable()
export class SkillService {
  constructor(
    @InjectRepository(Skill)
    private readonly skillRepository: Repository<Skill>,
  ) {}

  create(createSkillDto: CreateSkillDto) {
    const skill = this.skillRepository.create(createSkillDto);
    return this.skillRepository.save(skill);
  }

  findAll() {
    return this.skillRepository.find();
  }

  async findOne(id: string): Promise<Skill> {
    const skill = await this.skillRepository.findOne({ where: { id } });
    if (!skill) {
      throw new NotFoundException(`Skill with ID ${id} not found`);
    }
    return skill;
  }

  async update(id: string, updateSkillDto: UpdateSkillDto) {
    const result = await this.skillRepository.update(id, updateSkillDto);

    if (result.affected === 0) {
      throw new NotFoundException(`Skill with ID ${id} not found`);
    }

    return this.findOne(id); // Retorna a entidade atualizada, se necessário
  }

  async remove(id: string) {
    const skill = await this.findOne(id);
    if (!skill) {
      throw new NotFoundException(`Skill with ID ${id} not found`);
    }
    await this.skillRepository.remove(skill);
  }
}
