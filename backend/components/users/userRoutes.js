import { Router } from 'express';
import {UsersController} from "./userController.js";

export const createUserRoutes = () => {

    const userController = new UsersController();
    
    const productRoutes = Router();

    productRoutes.get('/', userController.getUsersController);
    // productRoutes.post('/login', );
    productRoutes.post('/register', userController.resgisterUsersController);
    // productRoutes.post('/logout', );
    // productRoutes.get('/protected', );



    return productRoutes;
}