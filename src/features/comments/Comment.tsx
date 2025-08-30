import { useMutation } from "@tanstack/react-query";
import { formatDate } from "date-fns";
import { useRef, useState } from "react";

import Button from "@/components/Button";
import TextArea from "@/components/TextArea";
import { commentService } from "@/services/commentService";
import { CommentType, CommentWithReplies } from "@/types/commentType";

type CommentProps = {
  comment: CommentWithReplies;
  onReply: () => void;
};

// Componente para respostas individuais
const ReplyComment = ({ reply }: { reply: CommentType }) => {
  return (
    <div className="flex ml-4 border-l-2 border-[black] dark:border-[#FFFFFF20] pl-4">
      <div className="flex flex-col w-full">
        <span className="dark:text-[#FFFFFF80] text-[#000000BF] text-[12px]">
          {reply.user.name} •{" "}
          {formatDate(new Date(reply.createdAt), "dd/MM/yyyy 'às' HH:mm")}
        </span>
        <span className="dark:text-white text-black text-[16px] mt-1">
          {reply.content}
        </span>
      </div>
    </div>
  );
};

const Comment = ({ comment, onReply }: CommentProps) => {
  const [replyMode, setReplyMode] = useState<boolean>(false);
  const [replyText, setReplyText] = useState<string>("");
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const createCommentMutation = useMutation({
    mutationFn: async () => {
      await commentService.createComment({
        content: replyText,
        referenceId: comment.referenceId,
        referenceType: comment.referenceType,
        parentId: comment.id,
      });
    },
    onSuccess: () => {
      setReplyText("");
      setReplyMode(false);
      onReply();
    },
  });

  return (
    <div className="flex flex-col">
      {/* Comentário principal */}
      <div className="flex flex-col p-2">
        <span className="dark:text-[#FFFFFF80] text-[#000000BF] text-[12px]">
          {comment.user.name} •{" "}
          {formatDate(new Date(comment.createdAt), "dd/MM/yyyy 'às' HH:mm")}
        </span>

        <div className="flex flex-col">
          <span className="dark:text-white text-black text-[16px]">
            {comment.content}
          </span>

          <span
            onClick={() => {
              setReplyMode(true);
            }}
            className="cursor-pointer dark:text-[#FFFFFF80] text-[#000000BF] text-[12px] hover:opacity-80 transition-opacity"
          >
            Responder
          </span>

          {replyMode && (
            <div className="flex flex-col gap-2 mt-2">
              <TextArea
                ref={inputRef}
                autoFocus
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
                rows={2}
                resize="none"
                placeholder="Escreva sua resposta..."
              />
              <div className="flex gap-2 justify-between">
                <Button onClick={() => setReplyMode(false)}>Cancelar</Button>
                <Button
                  loading={createCommentMutation.isPending}
                  disabled={!replyText}
                  onClick={() => {
                    if (replyText) {
                      createCommentMutation.mutate();
                    }
                  }}
                  theme="blue"
                >
                  Responder
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Respostas */}
      {comment.replies && comment.replies.length > 0 && (
        <div className="flex flex-col mt-2 gap-2">
          {comment.replies.map((reply) => (
            <ReplyComment key={reply.id} reply={reply} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Comment;
