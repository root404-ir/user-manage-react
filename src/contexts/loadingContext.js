import React, { createContext, useState, useContext } from 'react';

// ایجاد کانتکست
const LoadingContext = createContext();

// کامپوننت Provider
export const LoadingProvider = ({ children }) => {
  const [buttonLoading, setButtonLoading] = useState(false);

  // توابع مدیریت لودینگ
  const startLoading = () => setButtonLoading(true);
  const stopLoading = () => setButtonLoading(false);

  return (
    <LoadingContext.Provider value={{ buttonLoading, startLoading, stopLoading }}>
      {children}
    </LoadingContext.Provider>
  );
};

// هوک برای دسترسی به کانتکست
export const useLoading = () => useContext(LoadingContext);
