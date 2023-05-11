import { Router } from "express";
import * as productController from "./product-controller";

export default function defineProductsRoutes() {
  const router = Router();

  router.post("/", productController.createProduct);
  router.post("/delete-batch", productController.deleteBatchProducts);
  router.put("/:asin/:locale", productController.updateProduct);
  router.get("/:asin/:locale", productController.getProduct);
  router.get("/:sellerName", productController.getAvailableProductBySellerName);

  return router;
}
