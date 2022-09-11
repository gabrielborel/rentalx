import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class AlterCarsRemoveUsername1662932952330
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn("cars", "username");
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      "cars",
      new TableColumn({
        name: "username",
        type: "varchar",
      })
    );
  }
}
