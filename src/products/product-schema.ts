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

export const UpdateProductSchema = ProductSchema.partial().strict();

export type UpdateProductRequestBody = z.infer<typeof UpdateProductSchema>;

export const ProductDeleteQuerySchema = z.object({
  asinLocalePairs: z.array(z.string()),
});

export type ProductDeleteQuery = z.infer<typeof ProductDeleteQuerySchema>;

export const ProductIdSchema = z.object({
  asin: z.string(),
  locale: z.string(),
});

export type ProductIdParams = z.infer<typeof ProductIdSchema>;