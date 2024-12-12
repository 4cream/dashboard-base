import { Router } from 'express';
import {UsersController} from "./userController.js";

export const createUserRoutes = () => {

    const userController = new UsersController();
    
    const productRoutes = Router();

    productRoutes.get('/', userController.getUsersController);
    productRoutes.post('/login', userController.loginUserController);
    productRoutes.post('/register', userController.resgisterUsersController);
    productRoutes.post('/logout', userController.logoutUserController);
    productRoutes.get('/protected', userController.protectedUserController);



    return productRoutes;
}