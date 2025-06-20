import { useState } from 'react';

export const useToast = () => {
  const [toast, setToast] = useState({
    type: '',
    message: '',
    isVisible: false
  });

  const showToast = (type, message) => {
    setToast({
      type,
      message,
      isVisible: true
    });
  };

  const hideToast = () => {
    setToast(prev => ({ ...prev, isVisible: false }));
  };

  return { toast, showToast, hideToast };
};
