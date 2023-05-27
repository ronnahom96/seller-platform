import { RequestHandler } from "express";
import httpStatus from "http-status-codes";
import { logger } from "../common/logger/logger-wrapper";
import * as productModel from "./product-model";
import {
  CreateProductRequestBody,
  Product,
  ProductBatchDeleteRequestBody,
  ProductIdParams,
  ProductsRequestQuery,
  UpdateProductRequestBody
} from "./product-schema";
import * as productValidator from "./product-validator";
import { queryParamToBool } from "../common/utils/req-util";

type CreateProductHandler = RequestHandler<
  undefined,
  Product,
  CreateProductRequestBody
>;

type DeleteProductHandler = RequestHandler<
  undefined,
  undefined,
  ProductBatchDeleteRequestBody
>;

type UpdateProductHandler = RequestHandler<
  ProductIdParams,
  ProductIdParams | UpdateProductRequestBody,
  UpdateProductRequestBody
>;

type GetProductHandler = RequestHandler<ProductIdParams, Product>;
type GetProductsHandler = RequestHandler<undefined, Product[], undefined, ProductsRequestQuery>;

export const createProduct: CreateProductHandler = async (req, res, next) => {
  logger.info({
    msg: `Seller platform service was called to create new product`,
    metadata: { reqBody: req.body },
  });
  try {
    const reqBody = productValidator.validateProductReqBody(req.body);
    const createdProduct = await productModel.createProduct(reqBody);
    return res.status(httpStatus.CREATED).json(createdProduct);
  } catch (error) {
    return next(error);
  }
};

export const updateProduct: UpdateProductHandler = async (req, res, next) => {
  logger.info({
    msg: `Seller platform service was called to update a product`,
    metadata: { asin: req.params.asin, locale: req.params.locale },
  });
  try {
    const updateProductBody = productValidator.validateUpdateProductReqBody(req.body);
    const productIdParams = productValidator.validateProductRequestParams(req.params);
    await productModel.updateProduct(productIdParams, updateProductBody);
    return res.status(httpStatus.OK).json({ ...productIdParams, ...updateProductBody });
  } catch (error) {
    return next(error);
  }
};

export const deleteBatchProducts: DeleteProductHandler = async (req, res, next) => {
  logger.info({
    msg: `Seller platform service was called to delete a product`,
    metadata: { asinLocalePairs: req.body },
  });
  try {
    const productIdsReqBody = productValidator.validateProductIdsSchema(req.body)
    await productModel.deleteBatchProducts(productIdsReqBody);
    return res.status(httpStatus.NO_CONTENT).send(undefined);
  } catch (error) {
    return next(error);
  }
};

export const getProduct: GetProductHandler = async (req, res, next) => {
  try {
    logger.info({
      msg: `Seller platform service was called to get products by query`,
      metadata: { asin: req.params.asin, locale: req.params.locale },
    });
    const productIdParams = productValidator.validateProductRequestParams(req.params);
    const productResponse = await productModel.getProduct(productIdParams);
    return res.status(httpStatus.OK).json(productResponse);
  } catch (error) {
    return next(error);
  }
};

export const getProducts: GetProductsHandler = async (req, res, next) => {
  logger.info({
    msg: `Seller platform service was called to get a product`,
    metadata: { sellerName: req.query.sellerName, availability: req.query.availability },
  });
  try {
    const reqQuery = { sellerName: req.query.sellerName, availability: queryParamToBool(req.query.availability) };
    const productsReqQuery = productValidator.validateProductRequestQuery(reqQuery);
    const productsResponse = await productModel.getProducts(productsReqQuery);
    return res.status(httpStatus.OK).json(productsResponse);
  } catch (error) {
    return next(error);
  }
};
