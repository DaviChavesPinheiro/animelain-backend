import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey,
} from 'typeorm';

export default class AddAnimeIdToGenre1608560092342
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'genres',
      new TableColumn({
        name: 'animeId',
        type: 'uuid',
        isNullable: true,
      }),
    );

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
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('genres', 'GenresAnimes');

    await queryRunner.dropColumn('genres', 'animeId');
  }
}
