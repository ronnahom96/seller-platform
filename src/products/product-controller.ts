import { RequestHandler } from "express";
import { logger } from "../common/logger/logger-wrapper";
import {
  CreateProductRequestBody,
  Product,
  UpdateProductRequestBody,
  ProductDeleteQuerySchema,
  ProductDeleteQuery,
  ProductIdParams
} from "./product-schema";
import * as productModel from "./product-model";
import httpStatus from "http-status-codes";
import { reqQueryArrayParser } from "../common/utils/req-util";

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
  ProductOperationResponse,
  UpdateProductRequestBody
>;

// type GetProductHandler = RequestHandler<ProductRequestParams, Product>;
// type GetProductsHandler = RequestHandler<undefined, Product[]>;

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

// export const updateProduct: UpdateProductHandler = async (req, res, next) => {
//   logger.info({
//     msg: `Seller platform service was called to update a product`,
//     metadata: { productId: req.params.id },
//   });
//   try {
//     const reqParams = productValidator.validateProductRequestParams(req.params);
//     const reqBody = productValidator.validateUpdateProductReqBody(req.body);
//     await productModel.updateProduct(reqParams, reqBody);
//     return res.status(httpStatus.OK).json({ id: reqParams.id });
//   } catch (error) {
//     return next(error);
//   }
// };

// export const getProductBySellerName: GetProductHandler = async (req, res, next) => {
//   logger.info({
//     msg: `Seller platform service was called to get a product`,
//     metadata: { productId: req.params.id },
//   });
//   try {
//     const reqParams = productValidator.validateProductRequestParams(req.params);
//     const ProductResponse = await productModel.getProduct(reqParams);
//     return res.status(httpStatus.OK).json(ProductResponse);
//   } catch (error) {
//     return next(error);
//   }
// };

// export const getProducts: GetProductsHandler = async (req, res, next) => {
//   try {
//     logger.info({
//       msg: `Seller platform service was called to get products by query`,
//       metadata: { query: req.query },
//     });

//     const validatedQuery = productValidator.validateProductRequestQuery(
//       req.query
//     );

//     let parsedFilters: Record<string, unknown>[] = [];
//     if (validatedQuery?.filters) {
//       parsedFilters = reqQueryArrayParser(validatedQuery?.filters);
//     }

//     const validFilters = productValidator.validateProductFilters(parsedFilters);
//     const ProductResponse = await productModel.getProducts(validFilters);
//     return res.status(httpStatus.OK).json(ProductResponse);
//   } catch (error) {
//     return next(error);
//   }
// };
