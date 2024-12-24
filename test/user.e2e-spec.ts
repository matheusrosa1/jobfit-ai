import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as request from 'supertest'; // Usando supertest para testar a API
import { INestApplication } from '@nestjs/common';
import { UserService } from '../src/user/user.service';
import { User } from '../src/user/entities/user.entity';
import { UserController } from '../src/user/user.controller';
import { JwtService } from '@nestjs/jwt';
import { AuthGuard } from '@nestjs/passport';

describe('UserController (Integration)', () => {
  let app: INestApplication;
  let service: UserService;
  let repository: Repository<User>;
  let jwtService: JwtService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        UserService,
        {
          provide: getRepositoryToken(User),
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
            signAsync: jest.fn(() => Promise.resolve('fake-jwt-token')), // Mock do método signAsync
            verifyAsync: jest.fn(() => Promise.resolve({ sub: 'user-id', email: 'test@example.com' })), // Mock do método verifyAsync
          },
        },
        
      ],
    })  
    .overrideGuard(AuthGuard('jwt'))
    .useValue({
      canActivate: jest.fn(() => true), // Sempre permitir acesso
    })
    .compile();

    app = module.createNestApplication();
    await app.init();

    service = module.get<UserService>(UserService);
    repository = module.get<Repository<User>>(getRepositoryToken(User));
    jwtService = module.get<JwtService>(JwtService);
  });

  it('deve criar um usuário', async () => {
    const createUserDto = {
      name: 'Test User',
      email: 'test@example.com',
      password: 'password123',
      role: 'candidate',
    };

    jest.spyOn(service, 'create').mockResolvedValue(createUserDto as any); // Mock do service

    return request(app.getHttpServer())
      .post('/users')
      .send(createUserDto)
      .expect(201)
      .expect((res) => {
        expect(res.body).toEqual({
          ...createUserDto,
        });
      });
  });

  it('deve remover um usuário', async () => {
    const id = 'some-uuid';

    jest.spyOn(jwtService, 'verifyAsync').mockResolvedValueOnce({
      sub: 'some-user-id',
      email: 'test@example.com',
    }); // Mock do JWT verification

    jest.spyOn(service, 'remove').mockResolvedValueOnce({ affected: 1 } as any);

    return request(app.getHttpServer())
      .delete(`/users/${id}`)
      .set('Authorization', 'Bearer fake-jwt-token') // Passando o token JWT mockado
      .expect(200)
      .expect((res) => {
        expect(res.body).toEqual({ affected: 1 });
      });
  });

  afterAll(async () => {
    // Limpeza após os testes, se necessário
    await app.close();
  });
});
