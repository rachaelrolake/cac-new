import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "../ui/button"

interface ActionDialogProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description: string;
  confirmText: string;
  onConfirm: () => void;
  variant?: "default" | "destructive";
}

export function UserActionDialog({
  isOpen,
  onClose,
  title,
  description,
  confirmText,
  onConfirm,
}: ActionDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] p-8 gap-6">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-slate-900">{title}</DialogTitle>
          <DialogDescription className="text-slate-500 pt-2 leading-relaxed">
            {description}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="flex flex-row justify-end gap-3 sm:justify-end">
          <Button
            variant="outline"
            onClick={onClose}
            className="border-[#056D33] text-[#056D33] hover:bg-green-50 px-8"
          >
            Cancel
          </Button>
          <Button
            onClick={onConfirm}
            className="bg-[#056D33] hover:bg-[#045a2a] text-white px-8"
          >
            {confirmText}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}