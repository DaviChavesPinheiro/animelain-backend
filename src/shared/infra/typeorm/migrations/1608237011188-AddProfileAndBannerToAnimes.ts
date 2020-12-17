import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export default class AddProfileAndBannerToAnimes1608237011188
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumns('animes', [
      new TableColumn({
        name: 'profile',
        type: 'varchar',
        isNullable: true,
      }),
      new TableColumn({
        name: 'banner',
        type: 'varchar',
        isNullable: true,
      }),
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('animes', 'profile');
    await queryRunner.dropColumn('animes', 'banner');
  }
}
