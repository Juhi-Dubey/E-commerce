const { createProductService } = require("../services/product/createProduct.service");
const { getAllProductsService } = require("../services/product/getAllProducts.service");
const { getProductByIdService } = require("../services/product/getProductById.service");
const { updateProductService } = require("../services/product/updateProduct.service");
const { deleteProductService } = require("../services/product/deleteProduct.service");

const { StatusCodes } = require('http-status-codes');


const createProductController = async (req, res, next) =>{
    try{
        const result = await createProductService(req.user.id, req.body);
        res.status(StatusCodes.CREATED).json(result);
    }   
    catch(error){
        next(error);
    }
};


const getAllProductsController = async (req, res, next) =>{
    try {
        const result = await getAllProductsService(req.query);
        res.status(StatusCodes.OK).json(result);

    } catch (error) {
        next(error);
    }
};


const getProductByIdController = async (req, res, next) =>{
    try {
        const result = await getProductByIdService(req.params.id);
        res.status(StatusCodes.OK).json(result);

    } catch (error) {
        next(error);
    }
};


const updateProductController = async (req, res, next) =>{
    try {
        const result = await updateProductService(
            req.params.id, 
            req.user.id, 
            req.user.role,
            req.body
        );
        res.status(StatusCodes.OK).json(result)

    } catch (error) {
        next(error);
    }
};


const deleteProductController = async (req, res, next) => {
    try {
        const result = await deleteProductService(
            req.params.id, 
            req.user.id,
            req.user.role
        );
        res.status(StatusCodes.OK).json(result)

    } catch (error) {
        next(error);
    }
};


module.exports = {
    createProductController,
    getAllProductsController,
    getProductByIdController,
    updateProductController,
    deleteProductController,
};