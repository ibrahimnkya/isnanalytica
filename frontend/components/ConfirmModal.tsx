'use client';

import { Modal } from './ui/Modal';
import { AlertCircle, Loader2 } from 'lucide-react';

interface ConfirmModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    title: string;
    message: string;
    confirmText?: string;
    cancelText?: string;
    isLoading?: boolean;
    variant?: 'danger' | 'warning' | 'info';
}

export function ConfirmModal({
    isOpen,
    onClose,
    onConfirm,
    title,
    message,
    confirmText = 'Confirm',
    cancelText = 'Cancel',
    isLoading = false,
    variant = 'danger'
}: ConfirmModalProps) {
    const variantStyles = {
        danger: 'bg-red-500 hover:bg-red-600 shadow-red-500/20',
        warning: 'bg-amber-500 hover:bg-amber-600 shadow-amber-500/20',
        info: 'bg-primary hover:bg-primary-hover shadow-primary/20'
    };

    const iconStyles = {
        danger: 'text-red-500 bg-red-500/10',
        warning: 'text-amber-500 bg-amber-500/10',
        info: 'text-primary bg-primary/10'
    };

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title={title}
            className="max-w-md"
        >
            <div className="flex flex-col items-center text-center space-y-4 py-4">
                <div className={`h-16 w-16 rounded-full flex items-center justify-center ${iconStyles[variant]}`}>
                    <AlertCircle className="h-8 w-8" strokeWidth={2.5} />
                </div>

                <div className="space-y-2">
                    <h3 className="text-xl font-bold text-foreground">{title}</h3>
                    <p className="text-sm text-foreground-secondary font-medium leading-relaxed px-4">
                        {message}
                    </p>
                </div>

                <div className="flex w-full gap-3 pt-6 border-t border-border/30">
                    <button
                        onClick={onClose}
                        disabled={isLoading}
                        className="flex-1 px-4 py-2.5 rounded-xl border border-border/50 text-sm font-bold text-foreground-secondary hover:bg-surface/80 hover:text-foreground transition-all disabled:opacity-50"
                    >
                        {cancelText}
                    </button>
                    <button
                        onClick={onConfirm}
                        disabled={isLoading}
                        className={`flex-1 px-4 py-2.5 rounded-xl text-sm font-bold text-black transition-all flex items-center justify-center gap-2 shadow-lg disabled:opacity-50 ${variantStyles[variant]}`}
                    >
                        {isLoading ? (
                            <Loader2 className="h-4 w-4 animate-spin" strokeWidth={2.5} />
                        ) : null}
                        {confirmText}
                    </button>
                </div>
            </div>
        </Modal>
    );
}
