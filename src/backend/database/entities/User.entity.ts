// import "reflect-metadata";
// import { DataSource } from "typeorm";
// import { User } from "./entities/User.entity";
// import { Role } from "./entities/Role.entity";
// import { Permission } from "./entities/Permission.entity";
// import * as dotenv from "dotenv";

// dotenv.config();

// export const AppDataSource = new DataSource({
//     type: "postgres",
//     host: process.env.DATABASE_HOST,
//     port: parseInt(process.env.DATABASE_PORT!),
//     username: process.env.DATABASE_USER,
//     password: process.env.DATABASE_PASSWORD,
//     database: process.env.DATABASE_NAME,
//     synchronize: false,
//     logging: true,
//     entities: [User, Role, Permission],
//     migrations: ["src/backend/database/migrations/**/*.ts"],
//     subscribers: [],
// });

// {
//   "scripts": {
//     "typeorm": "typeorm-ts-node-esm",
//     "migration:generate": "npm run typeorm migration:generate -- -d src/backend/database/data-source.ts src/backend/database/migrations/migration",
//     "migration:run": "npm run typeorm migration:run -- -d src/backend/database/data-source.ts",
//     "migration:revert": "npm run typeorm migration:revert -- -d src/backend/database/data-source.ts"
//   }
// }