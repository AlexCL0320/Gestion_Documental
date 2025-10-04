import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateArchivosTable1234567890135 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "archivos",
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
                        length: "255",
                        isNullable: false
                    },
                    {
                        name: "ruta",
                        type: "varchar",
                        length: "500",
                        isNullable: false
                    },
                    {
                        name: "tipo",
                        type: "varchar",
                        length: "50",
                        isNullable: false
                    },
                    {
                        name: "tamano",
                        type: "int",
                        isNullable: true
                    },
                    {
                        name: "extension",
                        type: "varchar",
                        length: "10",
                        isNullable: true
                    },
                    {
                        name: "estado",
                        type: "varchar",
                        length: "20",
                        default: "'activo'"
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
                        name: "idx_archivos_tipo",
                        columnNames: ["tipo"]
                    }
                ]
            }),
            true
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("archivos");
    }
}

