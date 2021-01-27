import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class CreateRelationAnimesCharacters1608594459451
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'animes_characters',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'role',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'animeId',
            type: 'uuid',
            isNullable: true,
          },
          {
            name: 'characterId',
            type: 'uuid',
            isNullable: true,
          },
          {
            name: 'createdAt',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'now()',
          },
        ],
        foreignKeys: [
          {
            name: 'animes_characters_to_animeId',
            columnNames: ['animeId'],
            referencedColumnNames: ['id'],
            referencedTableName: 'animes',
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
          },
          {
            name: 'animes_characters_to_characterId',
            columnNames: ['characterId'],
            referencedColumnNames: ['id'],
            referencedTableName: 'characters',
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('animes_characters');
  }
}
