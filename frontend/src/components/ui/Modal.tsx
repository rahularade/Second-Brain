import type { ReactNode } from "react";
import { cn } from "../../lib/utils";

interface ModalProps {
    open: boolean;
    children: ReactNode;
}

const Modal = ({ open, children }: ModalProps) => {
    return (
        <div
            aria-hidden={!open}
            className={cn(
                "fixed inset-0 z-50 flex items-center justify-center bg-black/80 transition-opacity duration-200",
                open ? "opacity-100" : "opacity-0 pointer-events-none"
            )}
        >
            {children}
        </div>
    );
};

export default Modal;
