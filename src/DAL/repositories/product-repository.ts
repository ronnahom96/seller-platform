import { DataSource, Repository } from "typeorm";
import { ResourceNotFoundError } from "../../common/errors/error-types";
import { logger } from "../../common/logger/logger-wrapper";
import {
  CreateProductRequestBody,
  Product,
  UpdateProductRequestBody
} from "../../products/product-schema";
import * as dataManager from "../connection-manager";
import { ProductEntity } from "../entity/product-entity";

export class ProductRepository extends Repository<ProductEntity> {
  constructor(private dataSource: DataSource) {
    super(ProductEntity, dataSource.createEntityManager());
  }
  public async createProduct(
    createdProduct: CreateProductRequestBody
  ): Promise<Product> {
    await this.save(createdProduct);
    return createdProduct;
  }

  private async productExists(asin: string, locale: string): Promise<boolean> {
    const recordCount = await this.count({ where: { asin, locale } });
    return recordCount === 1;
  }

  // public async deleteProducts(asinLocalePairs: string[]): Promise<void> {
  //   const asinLocaleList = 
  //   asinLocalePairs.map(asinLocale => this.deleteProduct())
  //   for (const asinLocale of asinLocalePairs) {

  //   }
  // }

  // public async deleteProduct(asinLocalePairs: string[]): Promise<void> {
  //   if (!(await this.productExists(productId))) {
  //     logger.error({
  //       msg: "Product was not found",
  //       metadata: { productId },
  //     });
  //     throw new ResourceNotFoundError(
  //       ` Product ${productId} was not found for delete request`
  //     );
  //   }
  //   await this.delete(productId);
  // }

  public async updateProduct(
    asin: string,
    locale: string,
    updateProductBody: UpdateProductRequestBody
  ): Promise<void> {
    if (!(await this.productExists(asin, locale))) {
      logger.error({
        msg: "Product was not found",
        metadata: { asin, locale },
      });
      throw new ResourceNotFoundError(
        `Product with asin ${asin} and locale: ${locale} was not found`
      );
    }

    await this.update({ asin, locale }, updateProductBody);
  }

  public async getProduct(asin: string, locale: string): Promise<Product> {
    const product = await this.findOneBy({ asin, locale });
    if (product === null) {
      logger.error({
        msg: "Product was not found",
        metadata: { asin, locale },
      });
      throw new ResourceNotFoundError(`Product with asin ${asin} and locale: ${locale} was not found`);
    }

    return product;
  }

  public async getAvailableProductBySellerName(
    sellerName: string
  ): Promise<Product[]> {
    const products = await this.findBy({ sellerName, availability: true });
    return products;
  }
}

export const getRepository = async (): Promise<ProductRepository> => {
  const dataSource = await dataManager.getDataSource();
  return new ProductRepository(dataSource);
};
