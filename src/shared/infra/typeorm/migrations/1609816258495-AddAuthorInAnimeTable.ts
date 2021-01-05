import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export default class AddAuthorInAnimeTable1609816258495
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'animes',
      new TableColumn({
        name: 'authors',
        type: 'varchar',
        isNullable: true,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('animes', 'authors');
  }
}
