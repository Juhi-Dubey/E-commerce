const express = require('express');
const productRouter = express.Router();

const { authenticate } = require("../middlewares/authenticate.middleware");
const { authorize } = require("../middlewares/authorize.middleware");
const { validate } = require("../middlewares/validate.middleware");

const {
    createProductController,
    getAllProductsController,
    getProductByIdController,
    updateProductController,
    deleteProductController,
} = require("../controllers/product.controller");


const { createProductValidator } = require("../validators/product/createProduct.validator");
const { updateProductValidator } = require("../validators/product/updateProduct.validator");


productRouter.post('/', authenticate, authorize("admin"), createProductValidator, validate, createProductController);

productRouter.patch('/:id', authenticate, authorize("admin"), updateProductValidator, validate, updateProductController)

productRouter.delete('/:id', authenticate, authorize('admin'), deleteProductController);


productRouter.get('/', getAllProductsController);

productRouter.get("/:id", getProductByIdController);



module.exports = { productRouter };