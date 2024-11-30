import { MigrationInterface, QueryRunner } from 'typeorm';

export class DropApplcationTableAlterJobsTable1732844196772
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "applications"`);

    await queryRunner.query(
      `ALTER TABLE "jobs" DROP COLUMN "experience_required"`,
    );
  }

  public async down(): Promise<void> {}
}
