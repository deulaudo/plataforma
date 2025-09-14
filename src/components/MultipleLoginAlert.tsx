"use client";

import { AlertTriangle } from "lucide-react";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useAuthStore } from "@/stores/authStore";

export const MultipleLoginAlert = () => {
  const { isMultipleLoginError, setIsMultipleLoginError } = useAuthStore();

  const handleClose = () => {
    setIsMultipleLoginError(false);
  };

  return (
    <AlertDialog open={isMultipleLoginError} onOpenChange={handleClose}>
      <AlertDialogContent className="max-w-md">
        <AlertDialogHeader>
          <div className="flex items-center gap-3 mb-2">
            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-orange-100 dark:bg-orange-900/20">
              <AlertTriangle className="w-6 h-6 text-orange-600 dark:text-orange-400" />
            </div>
            <AlertDialogTitle className="text-left">
              Login em outro dispositivo
            </AlertDialogTitle>
          </div>
          <AlertDialogDescription className="text-left">
            Detectamos que você fez login em outro dispositivo. Por motivos de
            segurança, você foi desconectado deste dispositivo.
            <br />
            <br />
            Para continuar usando o aplicativo, faça login novamente.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogAction
            onClick={handleClose}
            className="bg-blue-600 hover:bg-blue-700 text-white"
          >
            Entendi
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
