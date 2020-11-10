import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export default class AddFieldGenderIntoProducts1605032601713
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'products',
      new TableColumn({
        name: 'gender',
        type: 'varchar',
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('products', 'gender');
  }
}
