import React, { useEffect } from "react";
import { XCircleIcon, CheckCircleIcon, ExclamationTriangleIcon, InformationCircleIcon } from "@heroicons/react/24/outline";

export interface ToastProps {
  title: string;
  message: string;
  type?: "success" | "error" | "warning" | "info";
  duration?: number; // ms
  onClose?: () => void;
}

const typeStyles = {
  success: {
    bg: "bg-green-100",
    border: "border-green-400",
    text: "text-green-800",
    icon: <CheckCircleIcon className="w-6 h-6 text-green-500" />,
  },
  error: {
    bg: "bg-red-100",
    border: "border-red-400",
    text: "text-red-800",
    icon: <XCircleIcon className="w-6 h-6 text-red-500" />,
  },
  warning: {
    bg: "bg-yellow-100",
    border: "border-yellow-400",
    text: "text-yellow-800",
    icon: <ExclamationTriangleIcon className="w-6 h-6 text-yellow-500" />,
  },
  info: {
    bg: "bg-blue-100",
    border: "border-blue-400",
    text: "text-blue-800",
    icon: <InformationCircleIcon className="w-6 h-6 text-blue-500" />,
  },
};
export const Toast: React.FC<ToastProps> = ({
  title,
  message,
  type = "info",
  duration = 5000,
  onClose,
}) => {
  useEffect(() => {
    const timer = setTimeout(() => {
     onClose &&  onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const { bg, border, text, icon } = typeStyles[type];

  return (
    <div
      // className={`${bg} ${border} ${text} fixed top-4 left-1/2 -translate-x-1/2 z-[1120] border-l-4 px-4 py-3 rounded-xl shadow-md flex items-start gap-3 opacity-90`}
       className={`${bg} ${border} ${text}   fixed top-4 right-4  z-[1120] border-l-4 px-4 py-3 rounded-xl shadow-md flex items-start gap-3 opacity-90`}
    >
      {icon}
      <div className="flex-1">
        <p className="font-bold">{title}</p>
        <div dangerouslySetInnerHTML={{ __html: message }} />
        {/* <div>{message}</div> */}
      </div>
      <button
        onClick={onClose}
        className="ml-4 text-xl font-bold leading-none opacity-70 hover:opacity-100"
      >
        ×
      </button>
    </div>
  );
};
