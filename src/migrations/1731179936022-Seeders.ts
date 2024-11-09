import { MigrationInterface, QueryRunner } from 'typeorm';

export class Seeders1731179936022 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        INSERT INTO "users" ("name", "email", "password", "role") 
        VALUES 
          ('John Doe', 'john.doe@example.com', 'password123', 'candidate'),
          ('Jane Smith', 'jane.smith@example.com', 'password456', 'recruiter');
      `);

    // Obtendo os IDs dos usuários inseridos
    const userResult = await queryRunner.query(`SELECT id FROM "users"`);
    const userId1 = userResult[0].id; // id do primeiro usuário inserido
    const userId2 = userResult[1].id; // id do segundo usuário inserido

    // Inserindo dados na tabela Jobs
    await queryRunner.query(`
        INSERT INTO "jobs" ("title", "description", "company", "location", "job_type", "salary_range", "requirements", "posted_at") 
        VALUES 
          ('Software Engineer', 'Develop and maintain software systems.', 'Tech Corp', 'Remote', 'remoto', '6000-8000', 'JavaScript, TypeScript', CURRENT_TIMESTAMP),
          ('Product Manager', 'Oversee product development and manage the product lifecycle.', 'Innovative Solutions', 'São Paulo', 'presencial', '9000-12000', 'Agile, Leadership', CURRENT_TIMESTAMP);
      `);

    // Obtendo os IDs dos jobs inseridos
    const jobResult = await queryRunner.query(`SELECT id FROM "jobs"`);
    const jobId1 = jobResult[0].id; // id da primeira vaga inserida
    const jobId2 = jobResult[1].id; // id da segunda vaga inserida

    // Inserindo dados na tabela Applications
    await queryRunner.query(`
        INSERT INTO "applications" ("user_id", "job_id", "status", "applied_at", "updated_at") 
        VALUES 
          ('${userId1}', '${jobId1}', 'pending', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
          ('${userId2}', '${jobId2}', 'in_review', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
      `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Caso necessário, removemos os dados das tabelas
    await queryRunner.query(`DELETE FROM "applications"`);
    await queryRunner.query(`DELETE FROM "jobs"`);
    await queryRunner.query(`DELETE FROM "users"`);
  }
}
