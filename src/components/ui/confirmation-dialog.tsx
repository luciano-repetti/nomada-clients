"use client"

import { Trash2 } from 'lucide-react'
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"

interface ConfirmationDialogProps {
    isOpen: boolean
    onClose: () => void
    onConfirm: () => void
    title?: string
    description?: string
}

export function ConfirmationDialog({
    isOpen,
    onClose,
    onConfirm,
    title = "¿Está seguro?",
    description = "Esta acción no se puede deshacer.",
}: ConfirmationDialogProps) {
    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[425px] border-slate-800 bg-[#12151A] text-slate-100">
                <DialogHeader>
                    <DialogTitle className="text-center text-slate-100">
                        {title}
                    </DialogTitle>
                    <DialogDescription className="text-slate-400">
                        {description}
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter className="gap-2 sm:gap-0">
                    <Button
                        variant="outline"
                        onClick={onClose}
                        className="mr-2 bg-gray-700 border-gray-700 text-gray-300 hover:bg-gray-800 hover:text-white"
                    >
                        Cancelar
                    </Button>
                    <Button
                        variant="destructive"
                        onClick={onConfirm}
                        className="bg-red-600 hover:bg-red-700"
                    >
                        <Trash2 className="mr-2 h-4 w-4" /> Aceptar
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}