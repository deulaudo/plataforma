"use client";

/* eslint-disable @next/next/no-img-element */
import { useMutation } from "@tanstack/react-query";

import { useRouter } from "next/navigation";

import Button from "@/components/Button";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { flashcardService } from "@/services/flashcardService";
import { FlashcardReviewType } from "@/types/flashcardType";

type LateFlashcardReviewModalProps = {
  review: FlashcardReviewType;
  onClose: () => void;
};

const LateFlashcardReviewModal = ({
  review,
  onClose,
}: LateFlashcardReviewModalProps) => {
  const router = useRouter();
  const restartReviewMutation = useMutation({
    mutationFn: async () => {
      await flashcardService.resetFlashcardReview(review.hashId);
    },
    onSuccess: () => {
      router.push(`/flashcards/decks/${review.subcategory.id}/review`);
      onClose();
    },
  });

  return (
    <AlertDialog open={true} onOpenChange={onClose}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            <div className="flex items-center gap-2">
              <span>Atenção</span>
            </div>
          </AlertDialogTitle>
        </AlertDialogHeader>

        <span className="text-center">Esta revisão está atrasada. Deseja reiniciar ou continuar de onde parou?</span>

        <div className="flex flex-col gap-4 items-center">
            <Button
              theme="green"
              onClick={() => router.push(`/flashcards/decks/${review.subcategory.id}/review`)}
            >
              Continuar
            </Button>
          <Button
            theme="blue"
            loading={restartReviewMutation.isPending}
            onClick={() => restartReviewMutation.mutate()}
          >
            Reiniciar revisões
          </Button>
          <Button
            onClick={() => {
              onClose();
            }}
          >
            Cancelar
          </Button>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default LateFlashcardReviewModal;
