import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class CreateGruposTable1234567890131 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "grupos",
                columns: [
                    {
                        name: "id",
                        type: "int",
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: "increment"
                    },
                    {
                        name: "materia_id",
                        type: "int",
                        isNullable: false
                    },
                    {
                        name: "docente_id",
                        type: "int",
                        isNullable: false
                    },
                    {
                        name: "codigo_grupo",
                        type: "varchar",
                        length: "20",
                        isUnique: true
                    },
                    {
                        name: "periodo",
                        type: "varchar",
                        length: "50",
                        isNullable: false
                    },
                    {
                        name: "turno",
                        type: "varchar",
                        length: "20",
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

        // Foreign Key para materia_id
        await queryRunner.createForeignKey(
            "grupos",
            new TableForeignKey({
                name: "fk_grupos_materias",
                columnNames: ["materia_id"],
                referencedColumnNames: ["id"],
                referencedTableName: "materias",
                onDelete: "RESTRICT"
            })
        );

        // Foreign Key para docente_id
        await queryRunner.createForeignKey(
            "grupos",
            new TableForeignKey({
                name: "fk_grupos_docentes",
                columnNames: ["docente_id"],
                referencedColumnNames: ["id"],
                referencedTableName: "docentes",
                onDelete: "RESTRICT"
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        const table = await queryRunner.getTable("grupos");
        if (table) {
            const foreignKeys = table.foreignKeys;
            for(const foreignKey of foreignKeys) {
                await queryRunner.dropForeignKey("grupos", foreignKey);
            }
        }
        await queryRunner.dropTable("grupos");
    }
}
