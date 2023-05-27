import { InvalidInputError } from "../common/errors/error-types";
import { logger } from "../common/logger/logger-wrapper";
import {
  CreateProductRequestBody,
  CreateProductSchema,
  ProductBatchDeleteRequestBody,
  ProductIdParams,
  ProductIdSchema,
  ProductIdsSchema,
  ProductsRequestQuery,
  ProductsRequestQuerySchema,
  UpdateProductRequestBody,
  UpdateProductSchema,
} from "./product-schema";

export const validateProductReqBody = (reqBody): CreateProductRequestBody => {
  logger.debug({ msg: "Validating product request body" });
  const validatedProduct = CreateProductSchema.safeParse(reqBody);
  if (!validatedProduct.success) {
    logger.error({
      msg: "Invalid product input",
      metadata: { issues: validatedProduct.error.issues },
    });
    throw new InvalidInputError("Invalid product input");
  }
  logger.debug({ msg: "Product is valid" });
  return validatedProduct.data;
};

export const validateUpdateProductReqBody = (
  reqBody
): UpdateProductRequestBody => {
  logger.debug({ msg: "Validating product request body" });
  const validatedProduct = UpdateProductSchema.safeParse(reqBody);
  if (!validatedProduct.success) {
    logger.error({
      msg: "Invalid product",
      metadata: { issues: validatedProduct.error.issues },
    });
    throw new InvalidInputError("Invalid product to update");
  }

  logger.debug({ msg: "Product to update is valid" });
  return validatedProduct.data;
};

export const validateProductIdsSchema = (
  reqBody
): ProductBatchDeleteRequestBody => {
  logger.debug({ msg: "Validating product ids for delete" });
  const productIds = ProductIdsSchema.safeParse(reqBody);
  if (!productIds.success) {
    logger.error({
      msg: "Invalid product ids input",
      metadata: { reqBody, issues: productIds.error.issues },
    });
    throw new InvalidInputError("Invalid product ids input");
  }
  logger.debug({ msg: "Product batch delete request body are valid" });
  return productIds.data;
};

export const validateProductRequestParams = (
  reqParams
): ProductIdParams => {
  logger.debug({ msg: "Validating product request params" });
  const validatedParams = ProductIdSchema.safeParse(reqParams);
  if (!validatedParams.success) {
    logger.error({
      msg: "Invalid request params",
      metadata: { reqParams, issues: validatedParams.error.issues },
    });
    throw new InvalidInputError("Invalid product request params");
  }
  logger.debug({ msg: "Product request params are valid" });
  return validatedParams.data;
};

export const validateProductRequestQuery = (reqQuery): ProductsRequestQuery => {
  logger.debug({ msg: "Validating product request query" });

  const validatedQuery = ProductsRequestQuerySchema.safeParse(reqQuery);
  if (!validatedQuery.success) {
    logger.error({
      msg: "Invalid request query",
      metadata: { reqQuery, issues: validatedQuery.error.issues },
    });
    throw new InvalidInputError("Invalid product request query");
  }
  logger.debug({ msg: "Product request query is valid" });
  return validatedQuery.data;
};
