import React, {
  useState,
  useEffect,
  useCallback,
  useRef,
  ChangeEvent,
} from 'react';
import { Link, useRouteMatch, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import { format, utcToZonedTime } from 'date-fns-tz';
import pt from 'date-fns/locale/pt-BR';

import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';

import Button from '../../../components/Button';

import {
  useBookCategory,
  BookCategoryState,
} from '../../../context/BookCategoryContext';

import { useToast } from '../../../context/ToastContext';

import Comments from '../Comments';

import { Header, BookContainer, BookDetailModal } from './styles';

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

interface bookCategory {
  value: string;
  label: string;
}

const { timeZone } = Intl.DateTimeFormat().resolvedOptions();

const ViewDetailBook: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
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
  const [bookCategories, setBookCategories] = useState<BookCategoryState[]>([]);
  const [bookCategoryId, setBookcategoryId] = useState('none');

  const history = useHistory();

  const openModal = useCallback(() => {
    setModalIsOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setModalIsOpen(false);
  }, []);

  const handleSelectCategory = useCallback(
    (event: ChangeEvent<HTMLSelectElement>) => {
      const bookCategorySelected = event.target.value;

      if (bookCategorySelected !== '0') {
        setBookcategoryId(bookCategorySelected);
      }
    },
    [],
  );

  const handleBookDetail = useCallback(async () => {
    try {
      const bookFiltered = books.filter((book) => book.id === params.id);

      const bookCategoryFiltered = bookCategory.filter(
        (category) => category.id === bookFiltered[0].category,
      );

      setBookDetail(bookFiltered);
      setBookCategoryTitle(bookCategoryFiltered[0].title);
      setBookcategoryId(bookFiltered[0].category);
    } catch (err) {
      addToast({
        type: 'error',
        title: 'Error on Update Category Book!',
        description: 'Occurred an error during book category update.',
      });
    }
  }, [addToast, bookCategory, books, params.id]);

  const handleSubmit = useCallback(async () => {
    try {
      /**
       * Begin
       *
       * Book category updated
       */

      const bookIndex = books.findIndex((book) => book.id === params.id);

      if (bookIndex >= 0) {
        books[bookIndex].category = bookCategoryId;
        setBooks(books);
        localStorage.setItem('@MyBooks:books', JSON.stringify(books));
        handleBookDetail();
      }

      /**
       * End
       *
       * Book category updated
       */

      closeModal();
      history.push(`/viewdetailbook/${params.id}`);
    } catch (err) {
      addToast({
        type: 'error',
        title: 'Error on Update Category Book!',
        description: 'Occurred an error during book category update.',
      });
    }
  }, [
    addToast,
    bookCategoryId,
    history,
    books,
    params.id,
    handleBookDetail,
    closeModal,
  ]);

  useEffect(() => {
    setBookCategories(bookCategory);
  }, [bookCategory]);

  useEffect(() => {
    handleBookDetail();
  }, [handleBookDetail]);

  const handleMarkBookAsDeleted = useCallback(
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

      {modalIsOpen && (
        <BookDetailModal>
          <h2>Edit Book Category</h2>
          <Form ref={formRef} onSubmit={handleSubmit}>
            <select
              name="category"
              id="category"
              onChange={handleSelectCategory}
              value={bookCategoryId}
            >
              <option value="0">Select a category</option>
              {bookCategories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.title}
                </option>
              ))}
            </select>
            <Button type="submit">Update</Button>
            <Button type="button" onClick={closeModal}>
              Close
            </Button>
          </Form>
        </BookDetailModal>
      )}

      <BookContainer>
        <div className="buttons">
          <Button
            type="button"
            onClick={() => history.push(`/editbook/${params.id}`)}
          >
            Edit Book
          </Button>
          <Button
            type="button"
            onClick={() => handleMarkBookAsDeleted(params.id)}
          >
            Delete Book
          </Button>
          <Button type="button" onClick={openModal}>
            Edit Category
          </Button>
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
                utcToZonedTime(bookDetail[0].timestamp, timeZone),
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

      <Comments bookId={params.id} />
    </>
  );
};

export default ViewDetailBook;
