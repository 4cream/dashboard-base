import mysql from 'mysql2/promise'; // Usando promise para facilitar el uso de async/await
import { config } from '../config/app.js'; // Importa toda la configuración

export const connectDB = async () => {
  console.log('Conectado a la base de datos MySQL');
  try {
    // Crear una conexión a la base de datos
    const DEFAULT_CONFIG = {
        host: config.db.host,
        port: config.db.port,
        user: config.db.user,
        password: config.db.password,
        database: config.db.database,
    }

    const conexionString = process.env.DATABASE_URL ?? DEFAULT_CONFIG;
    const connection = await mysql.createConnection(conexionString);

    
    // console.log('Tenemos una conexion con la DB?', connection);
    return connection; // Devuelve la conexión para su uso posterior
    
  } catch (error) {
    console.error('Error conectando a la base de datos MySQL:', error);
    process.exit(1); // Salir del proceso en caso de error
  }
};
