import { Router } from "express";
import * as productController from "./product-controller";

export default function defineProductsRoutes() {
  const router = Router();

  router.post("/", productController.createProduct);
  router.delete("/", productController.deleteProducts);
  // router.put("/:asin/:locale", productController.updateProduct);
  // router.get("/:asin/:locale", productController.getProducts);
  // router.get("/:sellerName", productController.getProductBySellerName);

  return router;
}
