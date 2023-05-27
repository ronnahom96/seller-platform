import { ResourceExistsError, ResourceNotFoundError } from "../common/errors/error-types";
import { logger } from "../common/logger/logger-wrapper";
import * as productRepository from "../DAL/repositories/product-repository";
import { CreateProductRequestBody, Product, ProductBatchDeleteRequestBody, ProductIdParams, ProductsRequestQuery, UpdateProductRequestBody } from "./product-schema";

export async function createProduct(
  createProductReqBody: CreateProductRequestBody
): Promise<Product> {
  logger.info({ msg: "Creating Product" });
  const repo = await productRepository.getRepository();

  const { asin, locale } = createProductReqBody;
  if (await repo.isProductExists(asin, locale)) {
    logger.error({
      msg: "Product already exists",
      metadata: { asin, locale },
    });
    throw new ResourceExistsError(
      `Product with asin ${asin} and locale: ${locale} already exists`
    );
  }

  const createdProduct: Product = await repo.createProduct(createProductReqBody);
  return createdProduct;
}

export async function deleteBatchProducts(
  productIds: ProductBatchDeleteRequestBody
): Promise<void> {
  logger.info({
    msg: "Deleting Product",
    metadata: { productIds },
  });
  const repo = await productRepository.getRepository();
  const result = await repo.deleteBatchProducts(productIds);

  logger.info({
    msg: `Deleted ${result.affected} products`,
    metadata: { result },
  });
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
  const { asin, locale } = productId;

  if (!(await repo.isProductExists(asin, locale))) {
    logger.error({
      msg: "Product was not found",
      metadata: { asin, locale },
    });
    throw new ResourceNotFoundError(
      `Product with asin ${asin} and locale: ${locale} was not found`
    );
  }

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
  const { asin, locale } = productId;
  const product = await repo.getProduct(asin, locale);

  if (product === null) {
    logger.error({
      msg: "Product was not found",
      metadata: { asin, locale },
    });
    throw new ResourceNotFoundError(`Product with asin ${asin} and locale: ${locale} was not found`);
  }

  return product;
}

export async function getProducts(
  { sellerName, availability }: ProductsRequestQuery): Promise<Product[]> {
  logger.info({
    msg: "getting products by seller name",
    metadata: { sellerName, availability },
  });

  const repo = await productRepository.getRepository();
  const products = await repo.getProducts(sellerName, availability);
  return products;
}