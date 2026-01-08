import type { ReactNode } from "react";

interface ModalProps {
    open: boolean
    children: ReactNode
}

const Modal = ({open, children}: ModalProps) => {
    if(!open) return null;
  return <div className="fixed inset-0 bg-black/80 flex justify-center items-center z-50">
    {children}
  </div>;
};

export default Modal;