import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey,
} from 'typeorm';

export default class AddAnimeIdToAnimesCategories1608552256816
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'animes_categories',
      new TableColumn({
        name: 'anime_id',
        type: 'uuid',
        isNullable: true,
      }),
    );

    await queryRunner.createForeignKey(
      'animes_categories',
      new TableForeignKey({
        name: 'AnimesCategoriesAnimes',
        columnNames: ['anime_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'animes',
        onDelete: 'SET NULL',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey(
      'animes_categories',
      'AnimesCategoriesAnimes',
    );

    await queryRunner.dropColumn('animes_categories', 'anime_id');
  }
}
