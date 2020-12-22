import { MigrationInterface, QueryRunner } from 'typeorm';

export default class CreateRelationAnimesCharacters1608594459451
  implements MigrationInterface {
  name = 'CreateRelationAnimesCharacters1608594459451';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "animes_characters_characters" ("animesId" uuid NOT NULL, "charactersId" uuid NOT NULL, CONSTRAINT "PK_6d0399d3b718710281e14ab3a6c" PRIMARY KEY ("animesId", "charactersId"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_a23fb33045a901621be48ea75b" ON "animes_characters_characters" ("animesId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_c26259302a9b77f4fa15e2e7e8" ON "animes_characters_characters" ("charactersId") `,
    );
    await queryRunner.query(
      `ALTER TABLE "animes_characters_characters" ADD CONSTRAINT "FK_a23fb33045a901621be48ea75b3" FOREIGN KEY ("animesId") REFERENCES "animes"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "animes_characters_characters" ADD CONSTRAINT "FK_c26259302a9b77f4fa15e2e7e82" FOREIGN KEY ("charactersId") REFERENCES "characters"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "animes_characters_characters" DROP CONSTRAINT "FK_c26259302a9b77f4fa15e2e7e82"`,
    );
    await queryRunner.query(
      `ALTER TABLE "animes_characters_characters" DROP CONSTRAINT "FK_a23fb33045a901621be48ea75b3"`,
    );

    await queryRunner.query(`DROP INDEX "IDX_c26259302a9b77f4fa15e2e7e8"`);
    await queryRunner.query(`DROP INDEX "IDX_a23fb33045a901621be48ea75b"`);
    await queryRunner.query(`DROP TABLE "animes_characters_characters"`);
  }
}
