import { MigrationInterface, QueryRunner } from 'typeorm';

export default class UpdateSomeRelations1608472496039
  implements MigrationInterface {
  name = 'UpdateSomeRelations1608472496039';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "animes" DROP CONSTRAINT "CreatedById"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_tokens" DROP CONSTRAINT "TokenUser"`,
    );
    await queryRunner.query(
      `ALTER TABLE "animes" ADD CONSTRAINT "FK_e9be7131c4390189a59c21bfa50" FOREIGN KEY ("created_by_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "animes" DROP CONSTRAINT "FK_e9be7131c4390189a59c21bfa50"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_tokens" ADD CONSTRAINT "TokenUser" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "animes" ADD CONSTRAINT "CreatedById" FOREIGN KEY ("created_by_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE`,
    );
  }
}
