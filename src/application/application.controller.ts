import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  NotFoundException,
} from '@nestjs/common';
import { ApplicationService } from './application.service';
import { CreateApplicationDto } from './dto/create-application.dto';
import { UpdateApplicationDto } from './dto/update-application.dto';
import { Application } from './entities/application.entity';
import { UserService } from '../user/user.service';
import { JobService } from 'src/job/job.service';

@Controller('applications')
export class ApplicationController {
  constructor(
    private readonly applicationService: ApplicationService,
    private readonly userService: UserService,
    private readonly jobService: JobService,
  ) {}

  @Post()
  async create(
    @Body() createApplicationDto: CreateApplicationDto,
  ): Promise<Application> {
    const user = await this.userService.findOne(createApplicationDto.userId);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const job = await this.jobService.findOne(createApplicationDto.jobId);
    if (!job) {
      throw new NotFoundException('Job not found');
    }

    return this.applicationService.create({
      user,
      job,
      status: createApplicationDto.status,
    });
  }

  @Get()
  async findAll(): Promise<Application[]> {
    return this.applicationService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Application> {
    return this.applicationService.findOne(id);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateApplicationDto: UpdateApplicationDto,
  ): Promise<Application> {
    return this.applicationService.update(id, updateApplicationDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    return this.applicationService.remove(id);
  }
}
