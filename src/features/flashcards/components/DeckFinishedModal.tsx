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
import { flashcardService } from "@/services/flashcardService";

type DeckFinishedModalProps = {
  deckId: string;
  isOpen: boolean;
  onClose: () => void;
  onRestart: () => void;
  hasReview: boolean;
};

const DeckFinishedModal = ({
  deckId,
  isOpen,
  onClose,
  hasReview,
  onRestart,
}: DeckFinishedModalProps) => {
  const router = useRouter();
  const restartDeckMutation = useMutation({
    mutationFn: async () => {
      await flashcardService.restartDeck(deckId);
    },
    onSuccess: () => {
      onRestart();
      onClose();
    },
  });

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
            {hasReview ? (
              <span>
                Parabéns! <br /> Você completou todas as questões deste deck. Se
                desejar, você pode reiniciar o progresso agora.
              </span>
            ) : (
              <span>
                Parabéns! <br /> Você completou todas as questões deste deck. Se
                desejar, você pode reiniciar o progresso para responder
                novamente ou agendar uma revisão.
              </span>
            )}
          </p>

          <Button
            theme="blue"
            loading={restartDeckMutation.isPending}
            onClick={() => restartDeckMutation.mutate()}
          >
            Reiniciar
          </Button>
          {!hasReview && <Button theme="green">Agenda revisões</Button>}
          <Button
            onClick={() => {
              router.push("/flashcards");
              onClose();
            }}
          >
            Voltar
          </Button>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeckFinishedModal;
