"use client";

/* eslint-disable @next/next/no-img-element */
import { useMutation } from "@tanstack/react-query";
import { CircleCheck } from "lucide-react";

import { useRouter } from "next/navigation";

import Button from "@/components/Button";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

type DeckReviewFinishedModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

const DeckReviewFinishedModal = ({
  isOpen,
  onClose,
}: DeckReviewFinishedModalProps) => {
  const router = useRouter();

  return (
    <AlertDialog open={isOpen} onOpenChange={onClose}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            <div className="flex items-center gap-2">
              <span>Deck Finalizado</span>
              <CircleCheck
                strokeWidth={3}
                size={16}
                className="text-[#1ed475]"
              />
            </div>
          </AlertDialogTitle>
        </AlertDialogHeader>

        <img
          src="/images/Duzinho.png"
          alt="Deck Finalizado"
          className="w-12 h-12 mx-auto mb-4"
        />

        <div className="flex flex-col gap-4 items-center">
          <p className="text-center text-sm">
            Parabéns! <br /> Este tema está fácil para você. Todas as questões
            foam marcadas como fácil.
          </p>

          <Button
            theme="blue"
            onClick={() => router.push(`/flashcards/reviews`)}
          >
            Finalizar estudo
          </Button>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeckReviewFinishedModal;
