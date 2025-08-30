import { useMutation, useQuery } from "@tanstack/react-query";
import { Loader, MessageCircleOff } from "lucide-react";
import { useMemo, useState } from "react";

import Button from "@/components/Button";
import TextArea from "@/components/TextArea";
import { commentService } from "@/services/commentService";

import Comment from "./Comment";

type CommentsBoxProps = {
  referenceId: string;
  referenceType: "QUESTION" | "VIDEO";
};

const CommentsBox = ({ referenceId, referenceType }: CommentsBoxProps) => {
  const [commentText, setCommentText] = useState<string>("");

  const {
    data: comments,
    isPending,
    refetch,
  } = useQuery({
    queryKey: ["comments", { referenceId, referenceType }],
    queryFn: async () => {
      const response = await commentService.listComments({
        referenceId,
        referenceType,
      });
      return response;
    },
  });

  const createCommentMutation = useMutation({
    mutationFn: async () => {
      await commentService.createComment({
        content: commentText,
        referenceId,
        referenceType,
      });
    },
    onSuccess: () => {
      setCommentText("");
      refetch();
    },
  });

  const content = useMemo(() => {
    if (isPending) {
      return (
        <div className="flex justify-center items-center mt-4">
          <Loader className="animate-spin" />
        </div>
      );
    }

    if (comments && comments.length === 0) {
      return (
        <div className="flex flex-col gap-2 justify-center items-center mt-4">
          <MessageCircleOff size={66} />
          {referenceType === "QUESTION" ? (
            <span className="text-[16px] text-center">
              Ainda não há comentários nessa questão. Seja o primeiro!
            </span>
          ) : (
            <span className="text-[16px] text-center">
              Ainda não há comentários nesse vídeo. Seja o primeiro!
            </span>
          )}
        </div>
      );
    }

    return (
      <div className="flex flex-col gap-[24px] mt-4">
        {comments?.map((comment) => (
          <Comment onReply={refetch} key={comment.id} comment={comment} />
        ))}
      </div>
    );
  }, [isPending, comments, refetch]);

  return (
    <div className="flex flex-col gap-2">
      <div className="flex gap-1 items-center">
        <span className="text-[#2056F2] text-[16px] font-bold">
          {comments?.length || 0}
        </span>
        <span className="text-black dark:text-[white] text-[16px] font-bold">
          Comentários
        </span>
      </div>

      <div className="flex flex-col gap-2">
        <TextArea
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
          placeholder="Faça um comentário ou tire uma dúvida"
          resize="none"
        />
        <div className="flex justify-end">
          <Button
            loading={createCommentMutation.isPending}
            onClick={() => {
              if (commentText) {
                createCommentMutation.mutate();
              }
            }}
            disabled={!commentText}
            theme="blue"
          >
            Comentar
          </Button>
        </div>
      </div>

      {content}
    </div>
  );
};

export default CommentsBox;
