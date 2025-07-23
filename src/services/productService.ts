import { ProductType } from "@/types/productType";

import api from "./api";

type ListProductsResponse = ProductType[];

async function listProducts(): Promise<ListProductsResponse> {
  const response = await api.get<ListProductsResponse>("products");
  return response.data;
}

export const productService = {
  listProducts,
};
