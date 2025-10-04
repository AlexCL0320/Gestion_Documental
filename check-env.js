// check-env.js
//! REvisa si se leen vien las variables para la conexion a la base de datos
require("dotenv").config();

console.log("DB_PASSWORD type:", typeof process.env.DATABASE_PASSWORD);
console.log("DB_PASSWORD value:", process.env.DATABASE_PASSWORD);
