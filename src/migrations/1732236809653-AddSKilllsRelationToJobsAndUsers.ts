import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddSkillsRelationToJobsAndUsers1731177524950
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    // Remover a coluna "requirements" de "jobs"
    await queryRunner.query(`
      ALTER TABLE "jobs" 
      DROP COLUMN "requirements",
      ADD COLUMN "experience_required" INT NOT NULL;
    `);

    // Criar a tabela "skills"
    await queryRunner.query(`
      CREATE TABLE "skills" (
        "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
        "name" VARCHAR(100) NOT NULL,
        PRIMARY KEY ("id")
      );
    `);

    // Criar a tabela "job_skills" (relacionamento entre "jobs" e "skills")
    await queryRunner.query(`
      CREATE TABLE "job_skills" (
        "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
        "job_id" uuid NOT NULL,
        "skill_id" uuid NOT NULL,
        PRIMARY KEY ("id"),
        CONSTRAINT "FK_job_skills_jobs" FOREIGN KEY ("job_id") REFERENCES "jobs"("id") ON DELETE CASCADE,
        CONSTRAINT "FK_job_skills_skills" FOREIGN KEY ("skill_id") REFERENCES "skills"("id") ON DELETE CASCADE
      );
    `);

    // Criar a tabela "user_skills" (relacionamento entre "users" e "skills")
    await queryRunner.query(`
      CREATE TABLE "user_skills" (
        "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
        "user_id" uuid NOT NULL,
        "skill_id" uuid NOT NULL,
        "years_of_experience" INT NOT NULL,
        PRIMARY KEY ("id"),
        CONSTRAINT "FK_user_skills_users" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE,
        CONSTRAINT "FK_user_skills_skills" FOREIGN KEY ("skill_id") REFERENCES "skills"("id") ON DELETE CASCADE
      );
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Reverter alterações
    await queryRunner.query(`DROP TABLE "user_skills"`);
    await queryRunner.query(`DROP TABLE "job_skills"`);
    await queryRunner.query(`DROP TABLE "skills"`);
    await queryRunner.query(`
      ALTER TABLE "jobs" 
      ADD COLUMN "requirements" TEXT;
    `);
  }
}
