export type CommentReferenceType = "QUESTION" | "VIDEO";

export type CommentType = {
  id: string;
  content: string;
  referenceType: CommentReferenceType;
  referenceId: string;
  parent: {
    id: string;
    content: string;
  } | null;
  createdAt: string;
  user: {
    id: string;
    name: string;
    email: string;
    phone: string;
    role: string;
    active: boolean;
  };
};

export type CommentWithReplies = CommentType & {
  replies: CommentType[];
};
