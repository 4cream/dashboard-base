// Capa Web
// Esta capa maneja las solicitudes HTTP y las respuestas. Aquí es donde se utilizan los objetos req y res.
import jwt from "jsonwebtoken";
import { UserRepository } from "./user-repository.js";
import { config } from "../../config/app.js";

export class UsersController {
  constructor() {}

  getUsersController = (req, res) => {
    const token = req.cookies.access_token;
    if(!token) return res.render('index');

    try {
      const data = jwt.verify(token, config.jwt.secret);
      res.render('index', data); // {_id, username}

    } catch(error) {
      res.render('index');
    }

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
        const token = jwt.sign({id: user._id, username: user.username}, 
          config.jwt.secret, {
          expiresIn: '1h'
        });
        
        res.cookie('access_token', token, {
          httpOnly: true, // la cookie solo se puede acceder en el server
          secure: process.env.NODE_ENV === 'production', // la cookie solo se puede acceder en https
          sameSite: 'strict', // la cookie solo se puede acceder desde el mismo dominio
          maxAge: 1000 * 60 * 60 // la cookie tiene un tiempo de validez de 1 hora
        })
        .send({user});

    } catch(error) {
        res.status(401).send(error.message);
    }
  }

  protectedUserController = (req, res) => {    
    const token = req.cookies.access_token;
    
    if(!token) {
      return res.status(403).send('Access not authorized');
    }

    try {
      const data = jwt.verify(token, config.jwt.secret);
      res.render('protected', data); // {_id, username}

    } catch(error) {
      res.status(401).send('Access not authorized');
    }

  }
}