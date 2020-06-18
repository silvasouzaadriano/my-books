import React from 'react';

import { ToastProvider } from './ToastContext';
import { BookCategoryProvider } from './BookCategoryContext';

const AppProvider: React.FC = ({ children }) => {
  return (
    <BookCategoryProvider>
      <ToastProvider>{children}</ToastProvider>
    </BookCategoryProvider>
  );
};

export default AppProvider;
