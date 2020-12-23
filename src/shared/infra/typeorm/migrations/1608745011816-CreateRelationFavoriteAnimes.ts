import { MigrationInterface, QueryRunner } from 'typeorm';

export default class CreateRelationFavoriteAnimes1608745011816
  implements MigrationInterface {
  name = 'CreateRelationFavoriteAnimes1608745011816';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "favorite_animes" ("usersId" uuid NOT NULL, "animesId" uuid NOT NULL, CONSTRAINT "PK_6cdf40b03e78a25632498ddd2e2" PRIMARY KEY ("usersId", "animesId"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_892a5984909f270ebd95f74fa6" ON "favorite_animes" ("usersId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_6bd46d65bc2c7df056d83854d4" ON "favorite_animes" ("animesId") `,
    );
    await queryRunner.query(
      `ALTER TABLE "favorite_animes" ADD CONSTRAINT "FK_892a5984909f270ebd95f74fa67" FOREIGN KEY ("usersId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "favorite_animes" ADD CONSTRAINT "FK_6bd46d65bc2c7df056d83854d4e" FOREIGN KEY ("animesId") REFERENCES "animes"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "favorite_animes" DROP CONSTRAINT "FK_6bd46d65bc2c7df056d83854d4e"`,
    );
    await queryRunner.query(
      `ALTER TABLE "favorite_animes" DROP CONSTRAINT "FK_892a5984909f270ebd95f74fa67"`,
    );

    await queryRunner.query(`DROP INDEX "IDX_6bd46d65bc2c7df056d83854d4"`);
    await queryRunner.query(`DROP INDEX "IDX_892a5984909f270ebd95f74fa6"`);
    await queryRunner.query(`DROP TABLE "favorite_animes"`);
  }
}
