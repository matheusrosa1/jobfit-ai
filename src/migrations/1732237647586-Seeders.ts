import { MigrationInterface, QueryRunner } from 'typeorm';

export class Seeders1732237647586 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // Inserindo dados na tabela Skills
    await queryRunner.query(`
          INSERT INTO "skills" ("name") 
          VALUES 
            ('JavaScript'),
            ('TypeScript'),
            ('React'),
            ('Agile'),
            ('Leadership');
        `);

    // Obtendo IDs das skills inseridas
    const skillsResult = await queryRunner.query(`SELECT id FROM "skills"`);
    const [skill1, skill2, skill3, skill4, skill5] = skillsResult.map(
      (skill: { id: string }) => skill.id,
    );

    // Inserindo dados na tabela Users
    await queryRunner.query(`
          INSERT INTO "users" ("name", "email", "password", "role") 
          VALUES 
            ('John Doe', 'john.doe@example.com', 'password123', 'candidate'),
            ('Jane Smith', 'jane.smith@example.com', 'password456', 'recruiter');
        `);

    // Obtendo IDs dos usuários inseridos
    const usersResult = await queryRunner.query(`SELECT id FROM "users"`);
    const [userId1, userId2] = usersResult.map(
      (user: { id: string }) => user.id,
    );

    // Inserindo dados na tabela UserSkills
    await queryRunner.query(`
          INSERT INTO "user_skills" ("user_id", "skill_id", "years_of_experience") 
          VALUES 
            ('${userId1}', '${skill1}', 3),
            ('${userId1}', '${skill2}', 2),
            ('${userId2}', '${skill4}', 5),
            ('${userId2}', '${skill5}', 4);
        `);

    // Inserindo dados na tabela Jobs
    await queryRunner.query(`
        INSERT INTO "jobs" ("title", "description", "company", "location", "job_type", "salary_range", "experience_required", "posted_at") 
        VALUES 
          ('Software Engineer', 'Develop and maintain software systems.', 'Tech Corp', 'Remote', 'remote', '6000-8000', 3, CURRENT_TIMESTAMP),
          ('Product Manager', 'Oversee product development and manage the product lifecycle.', 'Innovative Solutions', 'São Paulo', 'on-site', '9000-12000', 5, CURRENT_TIMESTAMP);
      `);

    // Obtendo IDs das vagas inseridas
    const jobsResult = await queryRunner.query(`SELECT id FROM "jobs"`);
    const [jobId1, jobId2] = jobsResult.map((job: { id: string }) => job.id);

    // Inserindo dados na tabela JobSkills
    await queryRunner.query(`
          INSERT INTO "job_skills" ("job_id", "skill_id") 
          VALUES 
            ('${jobId1}', '${skill1}'),
            ('${jobId1}', '${skill2}'),
            ('${jobId1}', '${skill3}'),
            ('${jobId2}', '${skill4}'),
            ('${jobId2}', '${skill5}');
        `);

    // Inserindo dados na tabela Applications
    await queryRunner.query(`
          INSERT INTO "applications" ("user_id", "job_id", "status", "applied_at", "updated_at") 
          VALUES 
            ('${userId1}', '${jobId1}', 'pending', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
            ('${userId2}', '${jobId2}', 'in_review', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DELETE FROM "applications"`);
    await queryRunner.query(`DELETE FROM "job_skills"`);
    await queryRunner.query(`DELETE FROM "jobs"`);
    await queryRunner.query(`DELETE FROM "user_skills"`);
    await queryRunner.query(`DELETE FROM "users"`);
    await queryRunner.query(`DELETE FROM "skills"`);
  }
}
