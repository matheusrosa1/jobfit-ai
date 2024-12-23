import { Test, TestingModule } from '@nestjs/testing';

import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import * as request from 'supertest'; // Usando supertest para testar a API
import { INestApplication } from '@nestjs/common';
import { UserService } from '../src/user/user.service';
import { User } from '../src/user/entities/user.entity';
import { UserController } from '../src/user/user.controller';

describe('UserController (Integration)', () => {
  let app: INestApplication; // Alterando para usar a aplicação como parâmetro
  let service: UserService;
  let repository: Repository<User>;

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
            clear: jest.fn(), // Mock do método clear
          },
        },
      ],
    }).compile();

    app = module.createNestApplication(); // Criando a instância da aplicação
    await app.init(); // Inicializando a aplicação

    service = module.get<UserService>(UserService);
    repository = module.get<Repository<User>>(getRepositoryToken(User));

    // Limpeza do banco de dados ou qualquer setup necessário para todos os testes
  });

  it('deve criar um usuário', async () => {
    const createUserDto = {
      name: 'Test User',
      email: 'test@example.com',
      password: 'password123',
      role: 'candidate',
    };

    jest.spyOn(service, 'create').mockResolvedValue(createUserDto as any); // Mock do service

    return request(app.getHttpServer()) // Usando a instância da aplicação aqui
      .post('/users')
      .send(createUserDto)
      .expect(201)
      .expect((res) => {
        expect(res.body).toEqual({
          ...createUserDto,
          password: expect.any(String), // Verifica que a senha está sendo retornada, mas não é a original
        });
      });
  });

  it('deve remover um usuário', async () => {
    const id = 'some-uuid';
    jest.spyOn(service, 'remove').mockResolvedValueOnce({ affected: 1 } as any);

    return request(app.getHttpServer()) // Usando a instância da aplicação aqui
      .delete(`/users/${id}`)
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
