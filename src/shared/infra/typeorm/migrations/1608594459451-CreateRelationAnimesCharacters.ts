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
            name: 'anime_id',
            type: 'uuid',
            isNullable: true,
          },
          {
            name: 'character_id',
            type: 'uuid',
            isNullable: true,
          },
          {
            name: 'created_at',
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
            name: 'animes_characters_to_anime_id',
            columnNames: ['anime_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'animes',
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
          },
          {
            name: 'animes_characters_to_character_id',
            columnNames: ['character_id'],
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
