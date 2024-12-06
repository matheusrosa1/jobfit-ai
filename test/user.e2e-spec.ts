// __test__/integration/user.integration.spec.ts

import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';

import { DataSource } from 'typeorm';
import { AppModule } from '../src/app.module';

describe('User Module - Integration Tests', () => {
  let app: INestApplication;
  let dataSource: DataSource;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    // Recupera a instância do DataSource para interagir com o banco de dados
    dataSource = app.get(DataSource);
  });

  afterAll(async () => {
    await app.close();
  });

  beforeEach(async () => {
    // Limpa o banco antes de cada teste
    const entities = dataSource.entityMetadatas;

    for (const entity of entities) {
      const repository = dataSource.getRepository(entity.name);
      await repository.clear();
    }
  });

  describe('POST /users', () => {
    it('should create a user successfully', async () => {
      const userPayload = {
        email: 'test@example.com',
        password: 'password123',
        firstName: 'Test',
        lastName: 'User',
      };

      const response = await request(app.getHttpServer())
        .post('/users')
        .send(userPayload)
        .expect(201);

      expect(response.body).toMatchObject({
        email: userPayload.email,
        firstName: userPayload.firstName,
        lastName: userPayload.lastName,
      });
      expect(response.body).not.toHaveProperty('password');
    });

    it('should return 400 when trying to create a user with an existing email', async () => {
      const userPayload = {
        email: 'duplicate@example.com',
        password: 'password123',
        firstName: 'Duplicate',
        lastName: 'User',
      };

      await request(app.getHttpServer()).post('/users').send(userPayload);

      const response = await request(app.getHttpServer())
        .post('/users')
        .send(userPayload)
        .expect(400);

      expect(response.body.message).toEqual(
        `User with email ${userPayload.email} already exists`,
      );
    });
  });
});
