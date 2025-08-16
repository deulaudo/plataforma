import {
  CommentReferenceType,
  CommentType,
  CommentWithReplies,
} from "@/types/commentType";

import api from "./api";

async function listComments(params: {
  referenceId: string;
  referenceType: CommentReferenceType;
}): Promise<CommentWithReplies[]> {
  const response = await api.get<CommentType[]>("/web-platform/comments", {
    params: {
      reference_id: params.referenceId,
      reference_type: params.referenceType,
    },
  });

  const comments = response.data;
  const commentsWithReplies: CommentWithReplies[] = comments
    .filter((comment) => comment.parent === null)
    .map((comment) => ({
      ...comment,
      replies: comments.filter((reply) => reply.parent?.id === comment.id),
    }));

  return commentsWithReplies;
}

async function createComment(params: {
  referenceId: string;
  referenceType: CommentReferenceType;
  content: string;
  parentId?: string | null;
}): Promise<CommentType> {
  const response = await api.post<CommentType>("/web-platform/comments", {
    referenceId: params.referenceId,
    referenceType: params.referenceType,
    content: params.content,
    parentId: params.parentId || null,
  });
  return response.data;
}

export const commentService = {
  listComments,
  createComment,
};
