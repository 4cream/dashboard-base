import { connectDB } from "../../loaders/mysql2.js";

const connection = await connectDB();

export class ProductModel {

    // Función para obtener todos los productos
    static async getAllProducts() {        
        const [rows, fields] = await connection.query('SELECT * FROM products');
        // console.log("Que trae la base de datos?", rows, fields);
        console.log("Products", rows);
        
        return rows;
    };

    static async getProductById({id}) {
        
        const [product] = await connection.query(
          'SELECT id, name, description, price, stock, category FROM products WHERE id = ?;', [id]);

        if(product.length == 0) return null;
        return product;
        
    }

    static async createProduct({input}) {
        console.log("Que trae ese input? ", input);
        const {
            name,
            description,
            price,
            stock,
            category
        } = input;

        
    try {
        await connection.query(
          `INSERT INTO products (name, description, price, stock, category)
            VALUES (?, ?, ?, ?, ?);`,
          [name, description, price, stock, category]
        );

      } catch (error) {
        // no mostrale a usuario esto, puede enviarle información sensible
        throw new Error('Error creating product');
        // enviar la traza a un servicio interno
        // sendLog(e)
      }

    }

    static async updateProduct({id, input}) {
      console.log("El id es: " , id);
      console.log("El input es: " , input);
      
      try {
        const [product] = await connection
          .query('UPDATE products SET ? WHERE id = ?;', [input, id]);
        const [productUpdated] = await connection
          .query('SELECT id, name, price FROM products WHERE id = ?;', [id]);

        //console.log(`El producto con el id ${id} es: ${product}`); // = [Object, Object]
        console.log("Info de la actualizacion en la BD: ", product);
        console.log("El producto que trae es: ", productUpdated);

      } catch (error) {
        throw new Error('Can not update the product');
      }
      
    } 

    static async deleteProduct({id}) {
      try {
        const [product] = await connection.query(`DELETE FROM products WHERE id = ${id}`);
        return product;

      } catch(error) {
        if (err) {
          console.error('Error deleting product:', err);
          res.status(500).json({ error: 'Internal Server Error' });
          return;
        }

        if (product.affectedRows === 0) {
          res.status(404).json({ error: 'Product not found' });
          return;
        }
      }
    }
}
