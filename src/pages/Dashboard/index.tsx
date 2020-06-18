import React, { useState, useEffect, useCallback, ChangeEvent } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiChevronRight } from 'react-icons/fi';

import { Categories, Books } from './styles';

import {
  useBookCategory,
  BookCategoryState,
} from '../../context/BookCategoryContext';

interface Book {
  id: string;
  timestamp: Date;
  title: string;
  description: string;
  author: string;
  category: string;
  deleted?: boolean;
}

const Dashboard: React.FC = () => {
  const { bookCategory } = useBookCategory();
  const [bookCategories, setBookCategories] = useState<BookCategoryState[]>([]);
  const [books, setBooks] = useState<Book[]>(() => {
    const storagedBooks = localStorage.getItem('@MyBooks:books');

    if (storagedBooks) {
      return JSON.parse(storagedBooks);
    }
    return [];
  });

  const history = useHistory();

  useEffect(() => {
    setBookCategories(bookCategory);
  }, [bookCategory]);

  const handleSelectCategory = useCallback(
    (event: ChangeEvent<HTMLSelectElement>) => {
      const bookCategorySelected = event.target.value;
      const bookCategorySelectedIndex = event.target.options.selectedIndex;
      const bookCategoryTextSelected =
        event.target.options[bookCategorySelectedIndex].innerText;

      if (bookCategorySelected !== '0' && bookCategorySelected !== 'none')
        history.push(
          `/booklistbycategory/${bookCategorySelected}/${bookCategoryTextSelected}`,
        );
    },
    [history],
  );

  return (
    <>
      <Categories>
        <select
          name="book-category"
          id="book-category"
          onChange={handleSelectCategory}
        >
          <option value="0">Select a category</option>
          {bookCategories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.title}
            </option>
          ))}
        </select>

        <select name="book-ordering" id="book-ordering" onChange={() => {}}>
          <option value="none">Select a ordering</option>
          <option value="title">Title</option>
          <option value="date">Date</option>
        </select>

        <Link to="/addbook">
          <button type="button">Add Book</button>
        </Link>
      </Categories>

      <Books>
        {books.map((book) => (
          <Link to="/viewdetailbook">
            <div>
              <div>
                <strong>{book.title}</strong>
                <span>{book.timestamp}</span>
              </div>
              <p>{book.description}</p>
            </div>
            <FiChevronRight size={20} />
          </Link>
        ))}
      </Books>
    </>
  );
};

export default Dashboard;
