import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class AlterCarsAddDescription1662932849362
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      "cars",
      new TableColumn({
        name: "description",
        type: "varchar",
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn("cars", "description");
  }
}
