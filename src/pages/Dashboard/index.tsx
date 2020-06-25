import React, { useState, useEffect, useCallback, ChangeEvent } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiChevronRight } from 'react-icons/fi';
import { format, utcToZonedTime } from 'date-fns-tz';
import pt from 'date-fns/locale/pt-BR';

import { Categories, Container, Book } from './styles';

import {
  useBookCategory,
  BookCategoryState,
} from '../../context/BookCategoryContext';

import { useToast } from '../../context/ToastContext';

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
  const { bookCategory } = useBookCategory(); // This variable receives the categories form context

  // This state stores the categories which came from context
  // and it content is used on <select>
  const [bookCategories, setBookCategories] = useState<BookCategoryState[]>([]);

  // This state store all books and is used as database
  // to get the books (getBooks function) to be populated on screen
  const [books, setBooks] = useState<Book[]>(() => {
    const storagedBooks = localStorage.getItem('@MyBooks:books');

    if (storagedBooks) {
      return JSON.parse(storagedBooks);
    }
    return [];
  });

  // This state store the books to be populated on screen and is
  // filtered by the category default none.
  const [booksFiltered, setBooksFiltered] = useState<Book[]>(() => {
    const storagedBooks = localStorage.getItem('@MyBooks:books');

    if (storagedBooks) {
      return JSON.parse(storagedBooks);
    }
    return [];
  });

  const bookCategoryIdDefault = 'none';
  const history = useHistory();

  // This variable stores the time zone to be used to format the timestamp book field
  const { timeZone } = Intl.DateTimeFormat().resolvedOptions();

  // This variable store the toast message method to be used in validations, warnings, etc.
  const { addToast } = useToast();

  // This function get all books filtering by category default 'none'
  // and sorting the data by title as default
  const getBooks = useCallback(async () => {
    try {
      const newBookList: Book[] = books
        .filter(
          (book) => book.category === bookCategoryIdDefault && !book.deleted,
        )
        .sort(function compare(a, b) {
          if (a.title < b.title) return -1;
          if (a.title > b.title) return 1;
          return 0;
        });
      setBooksFiltered(newBookList);
    } catch (err) {
      addToast({
        type: 'error',
        title: 'Error on Load Books!',
        description:
          'Occurred an error during load books. Verify if the @MyBooks:books exists on local storage.',
      });
    }
  }, [addToast, books]);

  useEffect(() => {
    getBooks();
  }, [getBooks]);

  useEffect(() => {
    setBookCategories(bookCategory);
  }, [bookCategory]);

  // This function sort the books or by timestamp (asc) or by title (asc)
  const handleBookSort = useCallback(
    (event: ChangeEvent<HTMLSelectElement>) => {
      const bookSortSelected = event.target.value;
      if (bookSortSelected !== 'none') {
        const newBookList: Book[] = booksFiltered
          .filter(
            (book) => book.category === bookCategoryIdDefault && !book.deleted,
          )
          .sort(function compare(a, b) {
            if (bookSortSelected === 'date') {
              if (a.timestamp < b.timestamp) return -1;
              if (a.timestamp > b.timestamp) return 1;
            } else {
              if (a.title < b.title) return -1;
              if (a.title > b.title) return 1;
            }
            return 0;
          });
        setBooksFiltered(newBookList);
        setBooks(books);
      } else {
        setBooksFiltered(booksFiltered);
        setBooks(books);
      }
    },
    [booksFiltered, books],
  );

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
          <option value="0">Choose a category</option>
          {bookCategories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.title}
            </option>
          ))}
        </select>

        <select name="book-sort" id="book-sort" onChange={handleBookSort}>
          <option value="none">Sort by</option>
          <option value="title">Title</option>
          <option value="date">Date</option>
        </select>

        <Link to="/addbook">
          <button type="button">Add Book</button>
        </Link>
      </Categories>
      <Container>
        {booksFiltered.map((book) => (
          <Link to={`/viewdetailbook/${book.id}`} key={book.id}>
            <Book>
              <main>
                <strong>{book.title}</strong>
                <span>
                  {format(
                    utcToZonedTime(book.timestamp, timeZone),
                    "dd'/'MM'/'yyyy HH:mm:ss",
                    {
                      locale: pt,
                    },
                  )}
                </span>
              </main>
              <aside>
                <p>{book.description}</p>
                <div>
                  <FiChevronRight />
                </div>
              </aside>
            </Book>
          </Link>
        ))}
      </Container>
    </>
  );
};

export default Dashboard;
