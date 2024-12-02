import {initExpressApp} from './loaders/express.js';
import {ProductModel} from './components/products/productModel.js';

initExpressApp({productModel:ProductModel});