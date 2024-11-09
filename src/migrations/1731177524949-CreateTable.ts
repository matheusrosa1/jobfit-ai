import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTable1731177524949 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // Tabela Users
    await queryRunner.query(`
        CREATE TABLE "users" (
            "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
            "name" VARCHAR(100) NOT NULL,
            "email" VARCHAR(255) NOT NULL UNIQUE,
            "password" VARCHAR(255) NOT NULL,
            "role" VARCHAR(50) NOT NULL DEFAULT 'candidate',
            CONSTRAINT "PK_users" PRIMARY KEY ("id")
          );
        `);

    // Tabela Jobs
    await queryRunner.query(`
        CREATE TABLE "jobs" (
          "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
          "title" VARCHAR(100) NOT NULL,
          "description" TEXT NOT NULL,
          "company" VARCHAR(100) NOT NULL,
          "location" VARCHAR(100),
          "job_type" VARCHAR(50) NOT NULL DEFAULT 'presencial',
          "salary_range" VARCHAR(100),
          "requirements" TEXT,
          "posted_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
          PRIMARY KEY ("id")
        );
      `);

    // Tabela Applications
    await queryRunner.query(`
        CREATE TABLE "applications" (
          "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
          "user_id" uuid NOT NULL,
          "job_id" uuid NOT NULL,
          "status" VARCHAR(50) NOT NULL DEFAULT 'pending',
          "applied_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
          "updated_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
          PRIMARY KEY ("id"),
          CONSTRAINT "FK_applications_users" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE,
          CONSTRAINT "FK_applications_jobs" FOREIGN KEY ("job_id") REFERENCES "jobs"("id") ON DELETE CASCADE
        );
      `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "applications"`);
    await queryRunner.query(`DROP TABLE "jobs"`);
    await queryRunner.query(`DROP TABLE "users"`);
  }
}
