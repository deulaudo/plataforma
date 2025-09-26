import { TagType } from "@/types/tagType";

import api from "./api";

async function listTags(params: { productId: string }): Promise<TagType[]> {
  const response = await api.get<TagType[]>("/tags", {
    params: {
      product_id: params.productId,
    },
  });
  return response.data;
}

export const tagService = {
  listTags,
};
