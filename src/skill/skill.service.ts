import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateSkillDto } from './dto/create-skill.dto';
import { UpdateSkillDto } from './dto/update-skill.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Skill } from './entities/skill.entity';
import { Repository } from 'typeorm';
import { normalizeSkillName } from 'src/utils/normalizeSkillName';

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
