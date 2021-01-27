import { MigrationInterface, QueryRunner, TableForeignKey } from 'typeorm';

export default class ApplyCascadeOnDeleteOnUpdateInGenres1609071907470
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('genres', 'GenresCategories');

    await queryRunner.createForeignKey(
      'genres',
      new TableForeignKey({
        name: 'GenresCategories',
        columnNames: ['categoryId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'categories',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }),
    );

    await queryRunner.dropForeignKey('genres', 'GenresAnimes');

    await queryRunner.createForeignKey(
      'genres',
      new TableForeignKey({
        name: 'GenresAnimes',
        columnNames: ['animeId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'animes',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('genres', 'GenresAnimes');

    await queryRunner.createForeignKey(
      'genres',
      new TableForeignKey({
        name: 'GenresAnimes',
        columnNames: ['animeId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'animes',
        onDelete: 'SET NULL',
      }),
    );

    await queryRunner.dropForeignKey('genres', 'GenresCategories');

    await queryRunner.createForeignKey(
      'genres',
      new TableForeignKey({
        name: 'GenresCategories',
        columnNames: ['categoryId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'categories',
        onDelete: 'SET NULL',
      }),
    );
  }
}
