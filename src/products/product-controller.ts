import { RequestHandler } from "express";
import httpStatus from "http-status-codes";
import { logger } from "../common/logger/logger-wrapper";
import * as productModel from "./product-model";
import {
  CreateProductRequestBody,
  Product,
  ProductBySellerRequestParams,
  ProductDeleteQuery,
  ProductIdParams,
  UpdateProductRequestBody
} from "./product-schema";

type CreateProductHandler = RequestHandler<
  undefined,
  Product,
  CreateProductRequestBody
>;

type DeleteProductHandler = RequestHandler<
  undefined,
  undefined,
  undefined,
  ProductDeleteQuery
>;

type UpdateProductHandler = RequestHandler<
  ProductIdParams,
  Product,
  UpdateProductRequestBody
>;

type GetProductHandler = RequestHandler<ProductIdParams, Product>;
type GetProductBySellerHandler = RequestHandler<ProductBySellerRequestParams, Product[]>;

export const createProduct: CreateProductHandler = async (req, res, next) => {
  logger.info({
    msg: `Seller platform service was called to create new product`,
    metadata: { reqBody: req.body },
  });
  try {
    const createdProduct = await productModel.createProduct(req.body);
    return res.status(httpStatus.CREATED).json(createdProduct);
  } catch (error) {
    return next(error);
  }
};

export const deleteProducts: DeleteProductHandler = async (req, res, next) => {
  logger.info({
    msg: `Seller platform service was called to delete a product`,
    metadata: { asinLocalePairs: req.query },
  });
  try {
    await productModel.deleteProduct(req.query);
    return res.status(httpStatus.NO_CONTENT);
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
    const updatedProduct = await productModel.updateProduct(req.params, req.body);
    return res.status(httpStatus.OK).json(updatedProduct);
  } catch (error) {
    return next(error);
  }
};

export const getProduct: GetProductHandler = async (req, res, next) => {
  try {
    logger.info({
      msg: `Seller platform service was called to get products by query`,
      metadata: { asin: req.query.asin, locale: req.query.locale },
    });

    const productResponse = await productModel.getProduct(req.query);
    return res.status(httpStatus.OK).json(productResponse);
  } catch (error) {
    return next(error);
  }
};

export const getProductBySellerName: GetProductBySellerHandler = async (req, res, next) => {
  logger.info({
    msg: `Seller platform service was called to get a product`,
    metadata: { sellerName: req.params.sellerName },
  });
  try {
    const productsResponse = await productModel.getProductBySellerName(req.params.sellerName);
    return res.status(httpStatus.OK).json(productsResponse);
  } catch (error) {
    return next(error);
  }
};
