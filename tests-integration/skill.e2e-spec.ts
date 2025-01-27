import { ConflictException, INestApplication, NotFoundException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { AuthGuard } from "@nestjs/passport";
import { Test, TestingModule } from "@nestjs/testing";
import { getRepositoryToken } from "@nestjs/typeorm";
import { Skill } from "../src/skill/entities/skill.entity";
import { SkillController } from "../src/skill/skill.controller";
import { SkillService } from "../src/skill/skill.service";
import { Repository } from "typeorm";
import * as request from 'supertest';
import { createSkillDto, skills, updateSkillDto, id, skill } from "../mocks/skill.mock";

describe('SkillController (Integration)', () => {
  let app: INestApplication;
  let service: SkillService;
  let repository: Repository<Skill>;
  let jwtService: JwtService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SkillController],
      providers: [
        SkillService,
        {
          provide: getRepositoryToken(Skill),
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

    service = module.get<SkillService>(SkillService);
    repository = module.get<Repository<Skill>>(getRepositoryToken(Skill));
    jwtService = module.get<JwtService>(JwtService);
  });

  it('deve criar uma skill', async () => {

    jest.spyOn(service, 'create').mockResolvedValue(createSkillDto as any);

    return request(app.getHttpServer())
      .post('/skills')
      .send(createSkillDto)
      .expect(201)
      .expect((res) => {
        expect(res.body).toEqual(createSkillDto);
      });

  })
  it('deve retonar um erro caso a skill já exista', async () => {
    jest.spyOn(service, 'create').mockResolvedValue(createSkillDto as any);

    jest.spyOn(service, 'create').mockRejectedValue(new ConflictException('Skill already exists'));

    return request(app.getHttpServer())
      .post('/skills')
      .send(createSkillDto)
      .expect(409)
      .expect((res) => {
        expect(res.body.message).toBe('Skill already exists');
      });
  })
  it('deve retornar todas as skills', async () => {
    jest.spyOn(service, 'findAll').mockResolvedValue(skills as any);

    return request(app.getHttpServer())
      .get('/skills')
      .expect(200)
      .expect((res) => {
        expect(res.body).toEqual(skills);
      });
  })

  it('deve atualizar uma skill', async () => {
    jest.spyOn(service, 'update').mockResolvedValueOnce({
      id,
      ...updateSkillDto,
    } as any);
  
    return request(app.getHttpServer())
      .patch(`/skills/${id}`)
      .send(updateSkillDto)
      .expect(200)
      .expect((res) => {
        expect(res.body).toEqual({
          ...updateSkillDto,
          id,
        });
      });
  });
  

  it('deve retornar um erro ao tentar atualizar uma skill que não existe', async () => {
    jest.spyOn(service, 'update').mockRejectedValue(new NotFoundException(`Skill with ID 1 not found`));

    return request(app.getHttpServer())
      .patch('/skills/1')
      .send(updateSkillDto)
      .expect(404)
      .expect((res) => {
        expect(res.body.message).toBe(`Skill with ID 1 not found`);
      });
  })

  it('deve retornar uma skill', async () => {
    jest.spyOn(service, 'findOne').mockResolvedValue(skill as any);

    return request(app.getHttpServer())
      .get('/skills/1')
      .expect(200)
      .expect((res) => {
        expect(res.body).toEqual(skill);
      });
  })

  it('deve retornar um erro caso a skill não exista', async () => {
    
    jest.spyOn(service, 'findOne').mockRejectedValue(new NotFoundException(`Skill with ID ${id} not found`));
    return request(app.getHttpServer())
      .get('/skills/1')
      .expect(404)
      .expect((res) => {
        expect(res.body.message).toBe(`Skill with ID ${id} not found`);
      });
  })

  it('deve deletar uma skill', async () => {
    const id = 'some-uuid';
    jest.spyOn(service, 'remove').mockResolvedValue({ id } as any);
    return request(app.getHttpServer())
      .delete(`/skills/${id}`)
      .expect(200)
      .expect((res) => {
        expect(res.body).toEqual({ id });
      });
  })
    afterEach(async () => {
      await app.close();
    });
});
  