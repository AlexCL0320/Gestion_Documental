import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class CreateEvidenciaGruposTable1234567890134 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "evidencia_grupos",
                columns: [
                    {
                        name: "id",
                        type: "int",
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: "increment"
                    },
                    {
                        name: "evidencia_id",
                        type: "int",
                        isNullable: false
                    },
                    {
                        name: "grupo_id",
                        type: "int",
                        isNullable: false
                    },
                    {
                        name: "fecha_entrega",
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

        // Foreign Key para evidencia_id
        await queryRunner.createForeignKey(
            "evidencia_grupos",
            new TableForeignKey({
                name: "fk_evidencia_grupos_evidencia",
                columnNames: ["evidencia_id"],
                referencedColumnNames: ["id"],
                referencedTableName: "evidencias",
                onDelete: "CASCADE"
            })
        );

        // Foreign Key para grupo_id
        await queryRunner.createForeignKey(
            "evidencia_grupos",
            new TableForeignKey({
                name: "fk_evidencia_grupos_grupo",
                columnNames: ["grupo_id"],
                referencedColumnNames: ["id"],
                referencedTableName: "grupos",
                onDelete: "CASCADE"
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        const table = await queryRunner.getTable("evidencia_grupos");
        if (table) {
            const foreignKeys = table.foreignKeys;
            for(const foreignKey of foreignKeys) {
                await queryRunner.dropForeignKey("evidencia_grupos", foreignKey);
            }
        }
        await queryRunner.dropTable("evidencia_grupos");
    }
}
