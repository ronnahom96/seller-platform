import { logger } from "../common/logger/logger-wrapper";
import * as productRepository from "../DAL/repositories/product-repository";
import { CreateProductRequestBody, Product, ProductDeleteQuery, ProductIdParams, UpdateProductRequestBody } from "./product-schema";

export async function createProduct(
  reqBody: CreateProductRequestBody
): Promise<Product> {
  logger.info({ msg: "Creating Product" });
  const repo = await productRepository.getRepository();
  const createdProduct: Product = await repo.createProduct(reqBody);
  return createdProduct;
}

export async function deleteProduct(
  reqParams: ProductDeleteQuery
): Promise<void> {
  logger.info({
    msg: "Deleting Product",
    metadata: { productId: reqParams },
  });
  const repo = await productRepository.getRepository();
  // await repo.deleteProduct(reqParams.asinLocalePairs);
}

export async function updateProduct(
  productId: ProductIdParams,
  productToUpdate: UpdateProductRequestBody
): Promise<void> {
  logger.info({
    msg: "Updating Product",
    metadata: { productId: productId },
  });
  const repo = await productRepository.getRepository();
  const product = await repo.updateProduct(productId.asin, productId.locale, productToUpdate);
  return product;
}

export async function getProduct(
  productId: ProductIdParams
): Promise<Product> {
  logger.info({
    msg: "getting product by asin and locale",
    metadata: { productId },
  });

  const repo = await productRepository.getRepository();
  const product = await repo.getProduct(productId.asin, productId.locale);
  return product;
}

export async function getAvailableProductBySellerName(
  sellerName: string): Promise<Product[]> {
  logger.info({
    msg: "getting products by seller name",
    metadata: { sellerName },
  });

  const repo = await productRepository.getRepository();
  const products = await repo.getAvailableProductBySellerName(sellerName);
  return products;
}