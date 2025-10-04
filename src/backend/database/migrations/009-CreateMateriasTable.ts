import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateMateriasTable1234567890130 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "materias",
                columns: [
                    {
                        name: "id",
                        type: "int",
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: "increment"
                    },
                    {
                        name: "codigo",
                        type: "varchar",
                        length: "20",
                        isUnique: true
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
                        name: "creditos",
                        type: "int",
                        default: 0
                    },
                    {
                        name: "horas_teoria",
                        type: "int",
                        default: 0
                    },
                    {
                        name: "horas_practica",
                        type: "int",
                        default: 0
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
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("materias");
    }
}
