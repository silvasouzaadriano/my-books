import React, { useState, useEffect, useCallback, ChangeEvent } from 'react';
import { useRouteMatch, Link } from 'react-router-dom';
import { FiArrowLeft, FiChevronRight } from 'react-icons/fi';
import { format, utcToZonedTime } from 'date-fns-tz';
import pt from 'date-fns/locale/pt-BR';

import { Category, Container, Book } from './styles';

interface Book {
  id: string;
  timestamp: Date;
  title: string;
  description: string;
  author: string;
  category: string;
  deleted?: boolean;
}

interface BookCategoryParams {
  id: string;
  title: string;
}

const { timeZone } = Intl.DateTimeFormat().resolvedOptions();

const BookListByCategory: React.FC = () => {
  const { params } = useRouteMatch<BookCategoryParams>();
  const [books, setBooks] = useState<Book[]>(() => {
    const storagedBooks = localStorage.getItem('@MyBooks:books');

    if (storagedBooks) {
      return JSON.parse(storagedBooks);
    }
    return [];
  });

  const bookCategoryId = params.id;

  useEffect(() => {
    const newBookList: Book[] = books
      .filter((book) => book.category === bookCategoryId && !book.deleted)
      .sort(function compare(a, b) {
        if (a.title < b.title) return -1;
        if (a.title > b.title) return 1;
        return 0;
      });
    setBooks(newBookList);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleBookSort = useCallback(
    (event: ChangeEvent<HTMLSelectElement>) => {
      const bookSortSelected = event.target.value;
      if (bookSortSelected !== 'none') {
        const newBookList: Book[] = books
          .filter((book) => book.category === bookCategoryId && !book.deleted)
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
        setBooks(newBookList);
      } else {
        setBooks(books);
      }
    },
    [books, bookCategoryId],
  );

  return (
    <>
      <Category>
        <main>
          <strong>
            Category: <span>{params.title}</span>
          </strong>
          <div />
          <select
            name="book-ordering"
            id="book-ordering"
            onChange={handleBookSort}
          >
            <option value="none">Sort by</option>
            <option value="title">Title</option>
            <option value="date">Date</option>
          </select>

          <Link to="/addbook">
            <button type="button">Add Book</button>
          </Link>
        </main>

        <aside>
          <Link to="/">
            <div>
              <FiArrowLeft />
              <span>Back to home</span>
            </div>
          </Link>
        </aside>
      </Category>

      <Container>
        {books.map((book) => (
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

export default BookListByCategory;
