import "reflect-metadata";
import { DataSource } from "typeorm";
import * as dotenv from "dotenv";
dotenv.config();

export const AppDataSource = new DataSource({
    type: "postgres",
    host: process.env.DATABASE_HOST,
    port: parseInt(process.env.DATABASE_PORT!),
    username: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    synchronize: false,
    logging: true,
    entities: ["src/backend/database/entities/"],
    migrations: ["src/backend/database/migrations/**/*.ts"],
    subscribers: [],
});

// Solo ejecuta esto si el archivo se ejecuta directamente (node src/backend/database/data-source.ts)
if (require.main === module) {
    AppDataSource.initialize()
        .then(() => {
            console.log("Conexión a la base de datos exitosa.");
            process.exit(0);
        })
        .catch((error) => {
            console.error("Error al conectar a la base de datos:", error);
            process.exit(1);
        });
}
