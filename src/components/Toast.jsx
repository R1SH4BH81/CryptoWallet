import React from 'react';
import useToastStore from '../store/useToastStore';
import { motion, AnimatePresence } from 'framer-motion';
import '../styles/toast.css';

const Toast = ({ id, message, description, type = 'success' }) => {
  const { removeToast } = useToastStore();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.2 } }}
      className="card"
      onClick={() => removeToast(id)}
    >
      <div className="container">
        <div className="left">
          <div className={`status-ind ${type}`}></div>
        </div>
        <div className="right">
          <div className="text-wrap">
            <p className="text-content">
              <span className="text-link">{message}</span>
            </p>
            {description && <p className="time">{description}</p>}
          </div>
          <div className="button-wrap">
            <button className="primary-cta" onClick={(e) => { e.stopPropagation(); removeToast(id); }}>Dismiss</button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const ToastContainer = () => {
  const { toasts } = useToastStore();

  return (
    <div className="toast-global-wrapper">
      <AnimatePresence>
        {toasts.map((toast) => (
          <Toast key={toast.id} {...toast} />
        ))}
      </AnimatePresence>
    </div>
  );
};

export { ToastContainer };
