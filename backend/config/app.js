// src/config/app.js

// Carga las variables de entorno desde el archivo .env sin necesidad de instalas la dependencia de dotenv
// Este loadEnvFile es nativo de Node v21.7.0
// import 'dotenv/config'; 
process.loadEnvFile();

const {
  PORT,
  NODE_ENV,
  DB_HOST,
  DB_USER,
  DB_PASSWORD,
  DB_NAME,
  DB_PORT,
  CORS_ORIGIN
} = process.env;

export const config = {
  app: {
    port: PORT, // Puerto en el que corre el servidor
    env: NODE_ENV, // Entorno de la aplicación
  },
  db: {
    host: DB_HOST, // Host de la base de datos MySQL
    user: DB_USER, // Usuario de la base de datos MySQL
    password: DB_PASSWORD, // Contraseña de la base de datos MySQL
    database: DB_NAME, // Nombre de la base de datos MySQL
    port: DB_PORT
  },
  cors: {
    origin: CORS_ORIGIN || '*', // Configuración de CORS
  },
  // Puedes agregar más configuraciones como API keys, tiempo de sesiones, etc.
};

