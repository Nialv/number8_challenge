import { ModalProps } from "@interfaces/modals";
import React from "react";

const Modal: React.FC<ModalProps> = ({ children, isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-4 rounded relative">
        <button
          className="text-white bg-red-600 hover:bg-red-700 rounded-md text-sm p-3 leading-none absolute top-0 right-0 m-2"
          onClick={onClose}
        >
          X
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
