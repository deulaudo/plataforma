import { TagType } from "@/types/tagType";

import api from "./api";

async function listTags(params: {
  productId: string;
  courseMode?: boolean;
  moduleId?: string;
}): Promise<TagType[]> {
  const response = await api.get<{ data: TagType[] }>("/tags", {
    params: {
      product_id: params.productId,
      courseMode: params.courseMode,
      moduleId: params.moduleId,
    },
  });
  return response.data.data;
}

export const tagService = {
  listTags,
};
