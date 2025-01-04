import { INestApplication } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { AuthGuard } from "@nestjs/passport";
import { getRepositoryToken } from "@nestjs/typeorm";
import { Job } from "../src/job/entities/job.entity";
import { JobService } from "../src/job/job.service";
import { Repository } from "typeorm";
import * as request from 'supertest';
import { TestingModule, Test } from '@nestjs/testing';
import { JobController } from "../src/job/job.controller";

describe('JobController (Integration)', () => {
  let app: INestApplication;
  let jobService: JobService;
  let repository: Repository<Job>;
  let jwtService: JwtService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [JobController],
      providers: [
        JobService,
        {
          provide: getRepositoryToken(Job),
          useValue: {
            save: jest.fn(),
            findOne: jest.fn(),
            update: jest.fn(),
            find: jest.fn(),
            delete: jest.fn(),
            clear: jest.fn(),
          },
        },
        {
          provide: JwtService,
          useValue: {
            signAsync: jest.fn(() => Promise.resolve('fake-jwt-token')),
            verifyAsync: jest.fn(() => Promise.resolve({ sub: 'user-id', email: 'test@example.com' })),
          },
        },
      ],
    })
      .overrideGuard(AuthGuard('jwt'))
      .useValue({
        canActivate: jest.fn(() => true),
      })
      .compile();

    app = module.createNestApplication();
    await app.init();

    jobService = module.get<JobService>(JobService);
    repository = module.get<Repository<Job>>(getRepositoryToken(Job));
    jwtService = module.get<JwtService>(JwtService);
  });

  it('deve ser possível criar um novo job', async () => {
    const createJobDto = {
      title: 'Desenvolvedor Fullstack',
      description: 'Desenvolvimento de aplicações web e mobile',
      company: 'Empresa Teste',
      location: 'São Paulo - SP',
      salaryRange: 5000,
      jobType: 'on-site',
    };

    jest.spyOn(jobService, 'create').mockResolvedValue(createJobDto as any);

    return request(app.getHttpServer())
      .post('/jobs')
      .send(createJobDto)
      .expect(201)
      .expect((res) => {
        expect(res.body).toEqual({
          ...createJobDto,
        });
      });
  });

  afterEach(async () => {
    await app.close();
  });
});
