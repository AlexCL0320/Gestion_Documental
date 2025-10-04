import { MigrationInterface, QueryRunner, Table, TableUnique } from "typeorm";

export class CreatePermissionsTable1234567890125 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "permissions",
                columns: [
                    {
                        name: "id",
                        type: "int",
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: "increment"
                    },
                    {
                        name: "name",
                        type: "varchar",
                        length: "191",
                        isNullable: false
                    },
                    {
                        name: "guard_name",
                        type: "varchar",
                        length: "191",
                        isNullable: false,
                        default: "'web'"
                    },
                    {
                        name: "description",
                        type: "varchar",
                        length: "255",
                        isNullable: true
                    },
                    {
                        name: "created_at",
                        type: "timestamp",
                        default: "CURRENT_TIMESTAMP"
                    },
                    {
                        name: "updated_at",
                        type: "timestamp",
                        default: "CURRENT_TIMESTAMP",
                        onUpdate: "CURRENT_TIMESTAMP"
                    }
                ]
            }),
            true
        );

        await queryRunner.createUniqueConstraint(
            "permissions",
            new TableUnique({
                name: "UQ_permissions_name_guard",
                columnNames: ["name", "guard_name"]
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        const table = await queryRunner.getTable("permissions");
        if (table) {
            const foreignKey = table.foreignKeys.find(fk => fk.columnNames.indexOf("guard_name") !== -1);
            if (foreignKey) {
                await queryRunner.dropForeignKey("permissions", foreignKey);
            }
        }
        await queryRunner.dropTable("permissions");
    }
}
