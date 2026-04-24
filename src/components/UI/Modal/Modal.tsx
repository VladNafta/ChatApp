import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import classes from "./Modal.module.css";

interface ModalProps {
  text: string;
  buttonText: string;
  open: boolean;
  onClose?: () => void;
  className?: string;
}

const Modal = ({
  text,
  buttonText,
  open,
  onClose,
  className = "",
}: ModalProps) => {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const modal = dialogRef.current;
    if (open) {
      modal?.showModal();
    } else {
      modal?.close();
    }
  }, [open]);

  return createPortal(
    <dialog
      ref={dialogRef}
      className={`${classes.modal} ${className}`}
      onClose={onClose}
    >
      <p>{text}</p>
      <button onClick={() => dialogRef.current?.close()}>{buttonText}</button>
    </dialog>,
    document.getElementById("modal") as HTMLElement
  );
};

export default Modal;
