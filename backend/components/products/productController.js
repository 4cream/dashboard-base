// Capa Web
// Esta capa maneja las solicitudes HTTP y las respuestas. Aquí es donde se utilizan los objetos req y res.

import {validateProduct, validatePartialProduct} from "../../schemas/products.js";

export class ProductController {
  constructor({productModel}) {
    this.productModel = productModel;
  }

  getProductsController = async (req, res) => {
    try {    
        const products = await this.productModel.getAllProducts(); 
        if(products) {
            res.status(200);
            return res.json(products);
        }  
    } catch (error) {
        console.error("Error en getProductsController:", error);
        return res.status(500).json({ error: 'Error al obtener productos' });
    }
  };

  getProductsByIdController = async (req, res) => {
     const {id} = req.params;

     const product = await this.productModel.getProductById({id});

     if(product) return res.json(product);
     res.status(404).json({message:"Product not found"});
  }

  createProductController = async (req, res) => {
    const validationResult =  validateProduct(req.body);
    console.log("validationResult = to:", validationResult);
    
    if (!validationResult.success) {
      // 422 Unprocessable Entity
        return res.status(400).json({ error: JSON.parse(validationResult.error.message) });
    }

    const newProduct = await this.productModel.createProduct({input: validationResult.data});
    res.status(201).json(newProduct);

  }

  updateProductController = async (req, res) => {
    const validationPartialResult = validatePartialProduct(req.body);
    console.log("validationPartialResult ", validationPartialResult);
    
    const {id} = req.params;

    if(!validationPartialResult.success) {
      return res.status(400).json({error: JSON.parse(validationPartialResult.error.message)});
    }
    
    const updatedProduct = await this.productModel.updateProduct({id, input: validationPartialResult.data});
    if(!updatedProduct) return res.status(404).json({message: "Product not found"});

  }

  deleteProductController = async (req, res) => {
    const {id} = req.params;
    const deleteProduct = await this.productModel.deleteProduct({id});

    if(!deleteProduct) {
      return res.status(400).json({message: "Product not found"});
    }

    return res.status(200).json({ message: 'Product deleted successfully' });
  }
}