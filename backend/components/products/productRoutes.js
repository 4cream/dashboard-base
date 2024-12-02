import { Router } from 'express';
import {ProductController} from './productController.js';


export const createProductRoutes = ({productModel}) => {
    
    const productController = new ProductController({productModel});

    const productRoutes = Router();

    productRoutes.get('/', productController.getProductsController);
    productRoutes.post('/', productController.createProductController);
    productRoutes.get('/:id', productController.getProductsByIdController);
    productRoutes.patch('/:id', productController.updateProductController);
    productRoutes.delete('/:id', productController.deleteProductController);


    return productRoutes;
}