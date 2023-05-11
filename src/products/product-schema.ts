import z from "zod";

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

export type CreateProductRequestBody = z.infer<typeof ProductSchema>;

export const UpdateProductSchema = ProductSchema.omit({ asin: true, locale: true }).partial().strict();

export type UpdateProductRequestBody = z.infer<typeof UpdateProductSchema>;

export const ProductIdSchema = z.object({
  asin: z.string(),
  locale: z.string(),
});

export const ProductsRequestQuerySchema = z.object({
  sellerName: z.string(),
  availability: z.boolean()
})

export type ProductIdParams = z.infer<typeof ProductIdSchema>;

export const ProductIdArraySchema = z.array(ProductIdSchema);

export type ProductBatchDeleteRequestBody = z.infer<typeof ProductIdArraySchema>;

export type ProductsRequestQuery = z.infer<typeof ProductsRequestQuerySchema>;