import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export default class AddFieldGenderToUsers1605011992481
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'users',
      new TableColumn({
        name: 'gender',
        type: 'varchar',
        default: 'not informed',
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('users', 'gender');
  }
}
