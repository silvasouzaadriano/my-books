import React, { createContext, useContext } from 'react';

export const BookCategoryOtions = [
  { value: 'none', label: 'None' },
  { value: 'reading', label: 'Currently Reading' },
  { value: 'wantToRead', label: 'Wanto to React' },
  { value: 'read', label: 'read' },
];

const bookCategoryData = [
  {
    id: 'none',
    title: 'None',
  },
  {
    id: 'reading',
    title: 'Currently Reading',
  },
  {
    id: 'wantToRead',
    title: 'Want to Read',
  },
  {
    id: 'read',
    title: 'Read',
  },
];

export interface BookCategoryState {
  id: string;
  title: string;
}

interface BookCategoryContextData {
  bookCategory: Array<BookCategoryState>;
}

const BookCategoryContext = createContext<BookCategoryContextData>(
  {} as BookCategoryContextData,
);

export const BookCategoryProvider: React.FC = ({ children }) => {
  const bookCategory = bookCategoryData;

  return (
    <BookCategoryContext.Provider value={{ bookCategory }}>
      {children}
    </BookCategoryContext.Provider>
  );
};

export function useBookCategory(): BookCategoryContextData {
  const context = useContext(BookCategoryContext);

  if (!context) {
    throw new Error(
      'useBookCategory must be used within a BookCategoryProvider',
    );
  }

  return context;
}
