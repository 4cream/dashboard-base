// Capa Web
// Esta capa maneja las solicitudes HTTP y las respuestas. Aquí es donde se utilizan los objetos req y res.

import { UserRepository } from "./user-repository.js";

export class UsersController {
  constructor() {}

  getUsersController = (req, res) => {
    res.send("<h1>Hello world<h1>");
  };

  resgisterUsersController = async (req, res) => {
    const {username, password} = req.body;
    console.log({username, password});
    
    try {
        const id = await UserRepository.create({username, password});
        res.send({id});
        
    } catch(error) {
        res.status(400).send(error.message);
    }

  };

  loginUserController = async (req, res) => {
    const {username, password} = req.body;

    try {
        const user = await UserRepository.login({username, password});
        res.send({user});

    } catch(error) {
        res.status(401).send(error.message);
    }
  }

  protectedUserController = (req, res) => {
    res.render('protected');
  }
}