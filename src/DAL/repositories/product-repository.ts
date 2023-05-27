import { DataSource, DeleteResult, Repository } from "typeorm";
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

  public async isProductExists(asin: string, locale: string): Promise<boolean> {
    const recordCount = await this.count({ where: { asin, locale } });
    return recordCount === 1;
  }

  public async deleteBatchProducts(productIdsArray): Promise<DeleteResult> {
    const queryBuilder = this.createQueryBuilder();

    queryBuilder.where(
      productIdsArray.map(
        (product) => `(product.asin = '${product.asin}' AND product.locale = '${product.locale}')`
      ).join(' OR ')
    );

    const result = await queryBuilder.delete().execute();
    return result;
  }

  public async updateProduct(
    asin: string,
    locale: string,
    updateProductBody: UpdateProductRequestBody
  ): Promise<void> {
    await this.update({ asin, locale }, updateProductBody);
  }

  public async getProduct(asin: string, locale: string): Promise<Product | null> {
    const product = await this.findOneBy({ asin, locale });
    return product;
  }

  public async getProducts(
    sellerName: string,
    availability: boolean | undefined
  ): Promise<Product[]> {
    const products = await this.findBy({ sellerName, availability });
    return products;
  }
}

export const getRepository = async (): Promise<ProductRepository> => {
  const dataSource = await dataManager.getDataSource();
  return new ProductRepository(dataSource);
};
