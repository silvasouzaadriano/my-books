import React, {
  useState,
  useEffect,
  useCallback,
  useRef,
  ChangeEvent,
} from 'react';
import { Link, useHistory, useRouteMatch } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import { Form } from '@unform/web';

import { FormHandles } from '@unform/core';
import * as Yup from 'yup';

import {
  useBookCategory,
  BookCategoryState,
} from '../../../context/BookCategoryContext';

import { useToast } from '../../../context/ToastContext';

import Input from '../../../components/Input';

import Button from '../../../components/Button';

import { Title, Content } from './styles';

import getValidationErrors from '../../../utils/getValidationErrors';

interface UpdateBookFormData {
  title: string;
  description: string;
  author: string;
}

interface Book {
  id: string;
  timestamp: Date;
  title: string;
  description: string;
  author: string;
  category: string;
  deleted: boolean;
}

interface BookIdParam {
  id: string;
}

interface bookCategory {
  value: string;
  label: string;
}

const UpdateBook: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const { params } = useRouteMatch<BookIdParam>();
  const { bookCategory } = useBookCategory();
  const { addToast } = useToast();

  const [bookCategories, setBookCategories] = useState<BookCategoryState[]>([]);
  const [bookCategoryId, setBookcategoryId] = useState('none');

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

  const history = useHistory();

  useEffect(() => {
    setBookCategories(bookCategory);
    setBookDetail(bookDetail);
  }, [bookCategory, bookDetail]);

  const handleBookDetail = useCallback(async () => {
    try {
      const bookFiltered = books.filter((book) => book.id === params.id);

      setBookDetail(bookFiltered);

      setBookcategoryId(bookFiltered[0].category);

      formRef.current?.setData({ category: bookFiltered[0].category });
      formRef.current?.setData({ title: bookFiltered[0].title });
      formRef.current?.setData({ description: bookFiltered[0].description });
      formRef.current?.setData({ author: bookFiltered[0].author });
    } catch (err) {
      addToast({
        type: 'error',
        title: 'Error on Update Category Book!',
        description: 'Occurred an error during book category update.',
      });
    }
  }, [addToast, books, params.id]);

  useEffect(() => {
    handleBookDetail();
  }, [handleBookDetail]);

  const handleSubmit = useCallback(
    async (data: UpdateBookFormData) => {
      try {
        formRef.current?.setErrors({});

        // Validate the form
        const schema = Yup.object().shape({
          title: Yup.string()
            .required('Title is required')
            .max(50, 'Title exceeded 50 characters'),
          description: Yup.string()
            .required('Description is required')
            .max(150, 'Description exceeded 150 characters'),
          author: Yup.string()
            .required('Author is required')
            .max(30, 'Auhtor exceeded 50 characters'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        /**
         * Begin
         *
         * After validation, the book will be updated
         */

        const bookIndex = books.findIndex((book) => book.id === params.id);

        if (bookIndex >= 0) {
          books[bookIndex].title = data.title;
          books[bookIndex].description = data.description;
          books[bookIndex].author = data.author;
          books[bookIndex].category = bookCategoryId;
          setBooks(books);
          localStorage.setItem('@MyBooks:books', JSON.stringify(books));
        }

        /**
         * End
         *
         * After validation, the book will be updated
         */

        addToast({
          type: 'success',
          title: 'Book Update!',
          description: 'The book was updated successfully.',
        });

        setTimeout(() => {
          history.push(`/viewdetailbook/${params.id}`);
        }, 3000);
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);

          formRef.current?.setErrors(errors);

          return;
        }

        addToast({
          type: 'error',
          title: 'Error on Update Book!',
          description:
            'Occurred an error during book update, please fill the required fields.',
        });
      }
    },
    [addToast, bookCategoryId, history, books, params.id],
  );

  const handleSelectCategory = useCallback(
    (event: ChangeEvent<HTMLSelectElement>) => {
      const bookCategorySelected = event.target.value;

      if (bookCategorySelected !== '0') {
        setBookcategoryId(bookCategorySelected);
      }
    },
    [],
  );

  return (
    <>
      <Title>
        <h1>Update Book</h1>
        <Link to={() => `/viewdetailbook/${params.id}`}>
          <FiArrowLeft />
          Back to Book Detail
        </Link>
      </Title>
      <Content>
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
          <Input name="title" type="text" placeholder="Inform a title" />
          <Input
            name="description"
            type="text"
            placeholder="Inform a description"
          />
          <Input name="author" type="text" placeholder="Inform a author" />

          <Button type="submit">Update</Button>
        </Form>
      </Content>
    </>
  );
};

export default UpdateBook;
