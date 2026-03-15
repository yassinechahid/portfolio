import React, { useEffect } from "react";
import { MdCheckCircle, MdError, MdClose } from "react-icons/md";

interface AlertProps {
  type: "success" | "error";
  message: string;
  isVisible: boolean;
  onClose: () => void;
  autoClose?: boolean;
  duration?: number;
}

const Alert: React.FC<AlertProps> = ({
  type,
  message,
  isVisible,
  onClose,
  autoClose = true,
  duration = 5000,
}) => {
  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (isVisible && autoClose) {
      timer = setTimeout(() => {
        onClose();
      }, duration);
    }

    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [isVisible, autoClose, duration, onClose]);

  if (!isVisible) return null;

  return (
    <div
      className={`fixed top-4 right-4 left-4 md:left-auto md:w-96 z-50 rounded-lg shadow-md flex items-center justify-between p-4 ${
        type === "success"
          ? "bg-success-light-container border-l-4 border-success-light dark:bg-success-dark-container dark:border-success-dark"
          : "bg-error-light-container border-l-4 border-error-light dark:bg-error-dark-container dark:border-error-dark"
      }`}
      role="alert">
      <div className="flex items-center">
        {type === "success" ? (
          <MdCheckCircle className="w-6 h-6 mr-2 text-success-light dark:text-success-dark" />
        ) : (
          <MdError className="w-6 h-6 mr-2 text-error-light dark:text-error-dark" />
        )}
        <span
          className={`text-sm font-medium ${
            type === "success"
              ? "text-success-light-on-container dark:text-success-dark-on-container"
              : "text-error-light-on-container dark:text-error-dark-on-container"
          }`}>
          {message}
        </span>
      </div>
      <button
        onClick={onClose}
        className={`p-1 rounded-full ${
          type === "success"
            ? "hover:bg-success-light dark:hover:bg-success-dark-container/40"
            : "hover:bg-error-light-container dark:hover:bg-error-dark-container/40"
        }`}
        aria-label="Close">
        <MdClose
          className={`w-4 h-4 ${
            type === "success"
              ? "text-success-light dark:text-success-dark"
              : "text-error-light dark:text-error-dark"
          }`}
        />
      </button>
    </div>
  );
};

export default Alert;
