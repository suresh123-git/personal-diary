import React, { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

interface ParchmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

export const ParchmentModal: React.FC<ParchmentModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
}) => {
  const previousActiveElementRef = useRef<HTMLElement | null>(null);
  const modalRef = useRef<HTMLDivElement | null>(null);

  // Body Scroll Lock & Focus Management
  useEffect(() => {
    if (isOpen) {
      previousActiveElementRef.current = document.activeElement as HTMLElement;
      document.body.style.overflow = 'hidden';

      // Focus modal container
      setTimeout(() => {
        modalRef.current?.focus();
      }, 50);
    } else {
      document.body.style.overflow = '';
      if (previousActiveElementRef.current) {
        previousActiveElementRef.current.focus();
      }
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // ESC Key Listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const modalRoot = document.getElementById('modal-root') || document.body;

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 overflow-hidden"
        >
          {/* Dark Blurred Backdrop (z-index 100) */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={onClose}
            className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-md cursor-pointer"
          />

          {/* Centered Ritual Parchment Modal Panel (z-index 101) */}
          <motion.div
            ref={modalRef}
            tabIndex={-1}
            initial={{ scale: 0.96, opacity: 0, y: 15 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.96, opacity: 0, y: 15 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="relative z-[101] w-full max-w-[720px] max-h-[85vh] parchment-bg rounded-xl p-6 sm:p-8 text-parchment-900 border-2 border-parchment-700/50 shadow-2xl flex flex-col overflow-hidden outline-none"
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-4 border-b border-parchment-700/30 mb-4 flex-shrink-0">
              <h3
                id="modal-title"
                className="font-serif text-xl sm:text-2xl font-bold text-parchment-900 uppercase tracking-wider line-clamp-1 flex items-center gap-2"
              >
                ✨ {title} ✨
              </h3>
              <button
                type="button"
                onClick={onClose}
                aria-label="Close Ritual"
                className="p-1.5 rounded-full text-parchment-900 hover:bg-parchment-300 transition-colors flex-shrink-0 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Scrollable Modal Content */}
            <div className="flex-1 overflow-y-auto pr-1 space-y-4">{children}</div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    modalRoot,
  );
};
