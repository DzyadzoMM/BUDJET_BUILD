"use client";

import { ReactNode } from "react";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
}

export default function Modal({ open, onClose, children }: ModalProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-slate-900 p-6 rounded-xl w-[400px] relative">
        {children}
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-slate-400 hover:text-slate-200"
        >
          ✕
        </button>
      </div>
    </div>
  );
}
