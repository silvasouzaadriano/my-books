/* eslint-disable import/no-duplicates */
import React, { useRef, useState, useEffect, useCallback } from 'react';
import { Link, useRouteMatch, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import { format, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt-BR';

import { Form } from '@unform/web';

import { FormHandles } from '@unform/core';

import Input from '../../../components/Input';
import Button from '../../../components/Button';

import { useBookCategory } from '../../../context/BookCategoryContext';

import { useToast } from '../../../context/ToastContext';

import Comments from '../Comments';

import { Header, BookContainer } from './styles';

interface Book {
  id: string;
  timestamp: Date;
  title: string;
  description: string;
  author: string;
  category: string;
  deleted?: boolean;
}

interface BookIdParam {
  id: string;
}

const ViewDetailBook: React.FC = () => {
  const { params } = useRouteMatch<BookIdParam>();

  const { addToast } = useToast();
  const [bookDetail, setBookDetail] = useState<Book[]>(() => {
    const storagedBooks = localStorage.getItem('@MyBooks:books');

    if (storagedBooks) {
      return JSON.parse(storagedBooks);
    }
    return [];
  });
  const [books, setBooks] = useState<Book[]>(() => {
    const storagedBooks = localStorage.getItem('@MyBooks:books');

    if (storagedBooks) {
      return JSON.parse(storagedBooks);
    }
    return [];
  });

  const { bookCategory } = useBookCategory();
  const [bookCategoryTitle, setBookCategoryTitle] = useState('');

  const history = useHistory();

  useEffect(() => {
    const bookFiltered = bookDetail.filter((book) => book.id === params.id);

    const bookCategoryFiltered = bookCategory.filter(
      (category) => category.id === bookFiltered[0].category,
    );

    setBookDetail(bookFiltered);
    setBookCategoryTitle(bookCategoryFiltered[0].title);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleMarlBookAsDeleted = useCallback(
    (id: string) => {
      try {
        const bookIndex = books.findIndex((book) => book.id === id);

        if (bookIndex >= 0) {
          books[bookIndex].deleted = true;
          setBooks(books);
          localStorage.setItem('@MyBooks:books', JSON.stringify(books));
        }
        addToast({
          type: 'success',
          title: 'Book Deletion!',
          description: 'The book was marked as deleted successfully.',
        });

        setTimeout(() => {
          history.push('/');
        }, 3000);
      } catch (err) {
        addToast({
          type: 'error',
          title: 'Error on Book Deletion!',
          description:
            'Occurred an error during book deletion, please check if the @MyBooks:books exists on local storage.',
        });
      }
    },
    [books, addToast, history],
  );

  return (
    <>
      <Header>
        <h1>Book Detail</h1>
        <Link to="/">
          <FiArrowLeft />
          Back to home
        </Link>
      </Header>

      <BookContainer>
        <div className="buttons">
          <Button type="button">Edit Book</Button>
          <Button
            type="button"
            onClick={() => handleMarlBookAsDeleted(bookDetail[0].id)}
          >
            Delete Book
          </Button>
          <Button type="button">Edit Category</Button>
        </div>
        <div className="head">
          <div className="category">
            <span>Category </span>
            <p>{bookCategoryTitle}</p>
          </div>

          <div className="creationDate">
            <span>Creation Date</span>
            <p>
              {format(
                parseISO(String(bookDetail[0].timestamp)),
                "dd'/'MM'/'yyyy HH:mm:ss.SSS",
                {
                  locale: pt,
                },
              )}
            </p>
          </div>
        </div>
        <div className="title">
          <span>Title</span>
          <p>{bookDetail[0].title}</p>
        </div>
        <div className="description">
          <span>Description</span>
          <p>{bookDetail[0].description}</p>
        </div>
        <div className="author">
          <span>Author</span>
          <p>{bookDetail[0].author}</p>
        </div>
      </BookContainer>

      <Comments bookId={bookDetail[0].id} />
    </>
  );
};

export default ViewDetailBook;
