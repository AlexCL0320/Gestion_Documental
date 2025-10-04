import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class CreateEvidenciasTable1234567890133 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "evidencias",
                columns: [
                    {
                        name: "id",
                        type: "int",
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: "increment"
                    },
                    {
                        name: "categoria_id",
                        type: "int",
                        isNullable: false
                    },
                    {
                        name: "nombre",
                        type: "varchar",
                        length: "100",
                        isNullable: false
                    },
                    {
                        name: "descripcion",
                        type: "text",
                        isNullable: true
                    },
                    {
                        name: "fecha_limite",
                        type: "timestamp",
                        isNullable: true
                    },
                    {
                        name: "estado",
                        type: "varchar",
                        length: "20",
                        default: "'pendiente'"
                    },
                    {
                        name: "observaciones",
                        type: "text",
                        isNullable: true
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

        // Foreign Key para categoria_id
        await queryRunner.createForeignKey(
            "evidencias",
            new TableForeignKey({
                name: "fk_evidencias_categoria",
                columnNames: ["categoria_id"],
                referencedColumnNames: ["id"],
                referencedTableName: "categoria_evidencias",
                onDelete: "RESTRICT"
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        const table = await queryRunner.getTable("evidencias");
        if (table) {
            const foreignKeys = table.foreignKeys;
            for(const foreignKey of foreignKeys) {
                await queryRunner.dropForeignKey("evidencias", foreignKey);
            }
        }
        await queryRunner.dropTable("evidencias");
    }
}
