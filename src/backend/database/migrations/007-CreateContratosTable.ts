import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateContratosTable1234567890128 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "contratos",
                columns: [
                    {
                        name: "id",
                        type: "int",
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: "increment"
                    },
                    {
                        name: "tipo_contrato",
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
                        name: "periodo",
                        type: "varchar",
                        length: "50",
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
                ],
                indices: [
                    {
                        name: "idx_contratos_tipo",
                        columnNames: ["tipo_contrato"]
                    }
                ]
            }),
            true
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("contratos");
    }
}
