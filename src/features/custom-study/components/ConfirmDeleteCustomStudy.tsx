import { useMutation } from "@tanstack/react-query";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { customStudyService } from "@/services/customStudyService";

type ConfirmDeleteCustomStudyProps = {
  isOpen: boolean;
  customStudyId: string;
  onClose: () => void;
  onConfirm: () => void;
};

export function ConfirmDeleteCustomStudy({
  isOpen,
  customStudyId,
  onClose,
  onConfirm,
}: ConfirmDeleteCustomStudyProps) {
  const deleteCustomStudyMutation = useMutation({
    mutationFn: async () => {
      return await customStudyService.deleteCustomStudy(customStudyId);
    },
    onSuccess: () => {
      onConfirm();
    },
  });

  return (
    <AlertDialog open={isOpen} onOpenChange={onClose}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Atenção</AlertDialogTitle>
          <AlertDialogDescription>
            Você deseja realmente excluir este estudo? Esta ação é irreversível
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="cursor-pointer" onClick={onClose}>
            Cancelar
          </AlertDialogCancel>
          <AlertDialogAction
            className="cursor-pointer"
            onClick={() => {
              deleteCustomStudyMutation.mutate();
            }}
            disabled={deleteCustomStudyMutation.isPending}
          >
            {deleteCustomStudyMutation.isPending ? "Excluindo..." : "Excluir"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default ConfirmDeleteCustomStudy;
