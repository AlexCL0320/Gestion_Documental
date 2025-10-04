import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class CreateModelHasPermissionsTable1234567890127 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "model_has_permissions",
                columns: [
                    {
                        name: "permission_id",
                        type: "int",
                        isNullable: false
                    },
                    {
                        name: "model_type",
                        type: "varchar",
                        length: "255",
                        isNullable: false
                    },
                    {
                        name: "model_id",
                        type: "int",
                        isNullable: false
                    }
                ],
                indices: [
                    {
                        name: "model_has_permissions_primary",
                        columnNames: ["permission_id", "model_id", "model_type"],
                        isUnique: true
                    }
                ]
            }),
            true
        );

        // Agregar Foreign Key para permission_id
        await queryRunner.createForeignKey(
            "model_has_permissions",
            new TableForeignKey({
                name: "fk_model_has_permissions_permission",
                columnNames: ["permission_id"],
                referencedColumnNames: ["id"],
                referencedTableName: "permissions",
                onDelete: "CASCADE",
                onUpdate: "CASCADE"
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        const table = await queryRunner.getTable("model_has_permissions");
        if (table) {
            const foreignKeys = table.foreignKeys;
            for(const foreignKey of foreignKeys) {
                await queryRunner.dropForeignKey("model_has_permissions", foreignKey);
            }
        }
        await queryRunner.dropTable("model_has_permissions");
    }
}
