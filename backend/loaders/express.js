import express, { json } from "express";
import {createProductRoutes} from '../components/products/productRoutes.js';
import {createUserRoutes} from '../components/users/userRoutes.js';

export const initExpressApp = ({productModel}) => {
    const app = express();
    app.disable('x-powered-by');

    const PORT = process.env.PORT ?? 3000;

    const userRoutes = createUserRoutes();
    const routes = createProductRoutes({productModel});

    app.use(express.json());
    app.use('/', userRoutes);
    app.use('/products', routes);
    
    app.listen(PORT, () => {
        console.log(`server listening on port http://localhost:${PORT}`);
    });

}