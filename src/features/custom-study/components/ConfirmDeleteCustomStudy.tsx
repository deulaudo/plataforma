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
import { Button } from "@/components/ui/button";

type ConfirmDeleteCustomStudyProps = {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
};

export function ConfirmDeleteCustomStudy({
  isOpen,
  onClose,
  onConfirm,
}: ConfirmDeleteCustomStudyProps) {
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
          <AlertDialogAction className="cursor-pointer" onClick={onConfirm}>
            Excluir
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default ConfirmDeleteCustomStudy;
