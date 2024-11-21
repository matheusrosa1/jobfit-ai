import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Application } from './entities/application.entity';
import { CreateApplicationDto } from './dto/create-application.dto';
import { UpdateApplicationDto } from './dto/update-application.dto';

@Injectable()
export class ApplicationService {
  constructor(
    @InjectRepository(Application)
    private readonly applicationRepository: Repository<Application>,
  ) {}

  async create(
    createApplicationDto: CreateApplicationDto,
  ): Promise<Application> {
    const application = this.applicationRepository.create(createApplicationDto);
    return this.applicationRepository.save(application);
  }

  async findAll(): Promise<Application[]> {
    return this.applicationRepository.find();
  }

  async findOne(id: string): Promise<Application> {
    return this.applicationRepository.findOne({ where: { id } });
  }

  async update(
    id: string,
    updateApplicationDto: UpdateApplicationDto,
  ): Promise<Application> {
    await this.applicationRepository.update(id, updateApplicationDto);
    return this.findOne(id);
  }

  async remove(id: string): Promise<void> {
    await this.applicationRepository.delete(id);
  }
}
