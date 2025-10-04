import "reflect-metadata";
import * as dotenv from "dotenv";
import { AppDataSource } from "./src/backend/database/data-source"; // <- nota la extensión .ts

dotenv.config();

async function runMigrations() {
  try {
    console.log("Conectando a la base de datos...");
    await AppDataSource.initialize();

    console.log("Ejecutando todas las migraciones pendientes...");
    await AppDataSource.runMigrations();

    console.log("Migraciones ejecutadas correctamente");
  } catch (error) {
    console.error("Error ejecutando migraciones:", error);
  } finally {
    await AppDataSource.destroy();
    console.log("Conexión cerrada");
  }
}

runMigrations();
