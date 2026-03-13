import React from 'react';
import useToastStore from '../store/useToastStore';
import { motion, AnimatePresence } from 'framer-motion';

const Toast = ({ id, message, description, type = 'success' }) => {
  const { removeToast } = useToastStore();

  const isSuccess = type === 'success';

  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 50 }}
      className="flex flex-col gap-2 w-60 sm:w-72 text-[10px] sm:text-xs z-50 pointer-events-auto"
    >
      <div
        className={`cursor-default flex items-center justify-between w-full h-12 sm:h-14 rounded-lg bg-[#232531] px-[10px] border-l-4 ${isSuccess ? 'border-[#2b9875]' : 'border-red-500'}`}
      >
        <div className="flex gap-2">
          <div className={`${isSuccess ? 'text-[#2b9875]' : 'text-red-500'} bg-white/5 backdrop-blur-xl p-1 rounded-lg`}>
            
          </div>
          <div className="flex flex-col justify-center">
            <p className="text-white font-medium">{message}</p>
            {description && <p className="text-gray-500 truncate max-w-[150px]">{description}</p>}
          </div>
        </div>
        <button
          onClick={() => removeToast(id)}
          className="text-gray-600 hover:bg-white/5 p-1 rounded-md transition-colors ease-linear"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18 18 6M6 6l12 12"
            ></path>
          </svg>
        </button>
      </div>
    </motion.div>
  );
};

const ToastContainer = () => {
  const { toasts } = useToastStore();

  return (
    <div className="fixed bottom-4 right-4 z-[9999] flex flex-col gap-2 pointer-events-none">
      <AnimatePresence>
        {toasts.map((toast) => (
          <Toast key={toast.id} {...toast} />
        ))}
      </AnimatePresence>
    </div>
  );
};

export { ToastContainer };
