import { Router } from 'express';
import {UsersController} from "./userController.js";

export const createUserRoutes = () => {

    const userController = new UsersController();
    
    const productRoutes = Router();

    productRoutes.get('/', userController.getProductsController);
    // productRoutes.post('/login', );
    // productRoutes.post('/register', );
    // productRoutes.post('/logout', );
    // productRoutes.get('/protected', );



    return productRoutes;
}