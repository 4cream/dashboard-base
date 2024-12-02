// Capa Web
// Esta capa maneja las solicitudes HTTP y las respuestas. Aquí es donde se utilizan los objetos req y res.

export class UsersController {
  constructor() {}

  getProductsController = (req, res) => {
    res.send("<h1>Hello world<h1>");
  };
}