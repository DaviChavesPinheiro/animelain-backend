import { MigrationInterface, QueryRunner } from 'typeorm';

export default class AddRelationUserTokenToUser1608491310929
  implements MigrationInterface {
  name = 'AddRelationUserTokenToUser1608491310929';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user_tokens" ALTER COLUMN "user_id" DROP NOT NULL`,
    );
    await queryRunner.query(
      `COMMENT ON COLUMN "user_tokens"."user_id" IS NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_tokens" ADD CONSTRAINT "FK_9e144a67be49e5bba91195ef5de" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user_tokens" DROP CONSTRAINT "FK_9e144a67be49e5bba91195ef5de"`,
    );
    await queryRunner.query(
      `COMMENT ON COLUMN "user_tokens"."user_id" IS NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_tokens" ALTER COLUMN "user_id" SET NOT NULL`,
    );
  }
}
