import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateCategoriaEvidenciasTable1234567890132 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "categoria_evidencias",
                columns: [
                    {
                        name: "id",
                        type: "int",
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: "increment"
                    },
                    {
                        name: "nombre",
                        type: "varchar",
                        length: "100",
                        isNullable: false
                    },
                    {
                        name: "descripcion",
                        type: "varchar",
                        length: "255",
                        isNullable: true
                    },
                    {
                        name: "prioridad",
                        type: "int",
                        default: 0
                    },
                    {
                        name: "obligatorio",
                        type: "boolean",
                        default: false
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
                ],
                indices: [
                    {
                        name: "idx_categoria_evidencias_nombre",
                        columnNames: ["nombre"],
                        isUnique: true
                    }
                ]
            }),
            true
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("categoria_evidencias");
    }
}
