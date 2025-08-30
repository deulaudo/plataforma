import { ProductType } from "@/types/productType";

import api from "./api";

type ListProductsResponse = ProductType[];
type BuyProductResponse = { id: string; link: string };

async function listProducts(): Promise<ListProductsResponse> {
  const response = await api.get<ListProductsResponse>("products");
  return response.data;
}

async function buyProduct(data: {
  productId: string;
  userId: string;
}): Promise<BuyProductResponse> {
  const { productId, userId } = data;
  const response = await api.post<BuyProductResponse>(
    `products/${productId}/buy`,
    { userId },
  );

  return response.data;
}

export const productService = {
  listProducts,
  buyProduct,
};
