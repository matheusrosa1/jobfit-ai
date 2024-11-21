import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { ApplicationService } from './application.service';
import { CreateApplicationDto } from './dto/create-application.dto';
import { UpdateApplicationDto } from './dto/update-application.dto';
import { Application } from './entities/application.entity';

@Controller('applications')
export class ApplicationController {
  constructor(private readonly applicationService: ApplicationService) {}

  @Post()
  async create(
    @Body() createApplicationDto: CreateApplicationDto,
  ): Promise<Application> {
    return this.applicationService.create(createApplicationDto);
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
