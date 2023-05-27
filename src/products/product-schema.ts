import { z } from "zod";

export const ProductSchema = z.object({
  asin: z.string(),
  locale: z.string(),
  sellerName: z.string(),
  availability: z.boolean(),
  price: z.number(),
  name: z.string(),
  link: z.string(),
});

export type Product = z.infer<typeof ProductSchema>;

export const CreateProductSchema = ProductSchema;
export type CreateProductRequestBody = z.infer<typeof CreateProductSchema>;

export const UpdateProductSchema = ProductSchema.omit({ asin: true, locale: true }).partial().strict();
export type UpdateProductRequestBody = z.infer<typeof UpdateProductSchema>;

export const ProductIdSchema = ProductSchema.pick({ asin: true, locale: true });

export const ProductsRequestQuerySchema = z.object({ sellerName: z.string().min(1), availability: z.boolean().optional() });
export type ProductsRequestQuery = z.infer<typeof ProductsRequestQuerySchema>;

export type ProductIdParams = z.infer<typeof ProductIdSchema>;
export const ProductIdsSchema = z.array(ProductIdSchema);

export type ProductBatchDeleteRequestBody = z.infer<typeof ProductIdsSchema>;
