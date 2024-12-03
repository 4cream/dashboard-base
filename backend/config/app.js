// src/config/app.js

import 'dotenv/config'; // Carga las variables de entorno desde el archivo .env

export const config = {
  app: {
    port: process.env.PORT, // Puerto en el que corre el servidor
    env: process.env.NODE_ENV, // Entorno de la aplicación
  },
  db: {
    host: process.env.DB_HOST, // Host de la base de datos MySQL
    user: process.env.DB_USER, // Usuario de la base de datos MySQL
    password: process.env.DB_PASSWORD, // Contraseña de la base de datos MySQL
    database: process.env.DB_NAME, // Nombre de la base de datos MySQL
    port: process.env.DB_PORT
  },
  cors: {
    origin: process.env.CORS_ORIGIN || '*', // Configuración de CORS
  },
  jwt: {
    secret: process.env.SECRET_JWT_KEY // JWT Secret Key
  }
  // Puedes agregar más configuraciones como API keys, tiempo de sesiones, etc.
};

