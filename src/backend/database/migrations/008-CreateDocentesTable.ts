import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class CreateDocentesTable1234567890129 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "docentes",
                columns: [
                    {
                        name: "id",
                        type: "int",
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: "increment"
                    },
                    {
                        name: "user_id",
                        type: "int",
                        isNullable: false
                    },
                    {
                        name: "contrato_id",
                        type: "int",
                        isNullable: false
                    },
                    {
                        name: "codigo",
                        type: "varchar",
                        length: "20",
                        isUnique: true
                    },
                    {
                        name: "status",
                        type: "boolean",
                        default: true
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

        // Foreign Key para user_id
        await queryRunner.createForeignKey(
            "docentes",
            new TableForeignKey({
                name: "fk_docentes_users",
                columnNames: ["user_id"],
                referencedColumnNames: ["id"],
                referencedTableName: "users",
                onDelete: "CASCADE"
            })
        );

        // Foreign Key para contrato_id
        await queryRunner.createForeignKey(
            "docentes",
            new TableForeignKey({
                name: "fk_docentes_contratos",
                columnNames: ["contrato_id"],
                referencedColumnNames: ["id"],
                referencedTableName: "contratos",
                onDelete: "RESTRICT"
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        const table = await queryRunner.getTable("docentes");
        if (table) {
            const foreignKeys = table.foreignKeys;
            for(const foreignKey of foreignKeys) {
                await queryRunner.dropForeignKey("docentes", foreignKey);
            }
        }
        await queryRunner.dropTable("docentes");
    }
}
