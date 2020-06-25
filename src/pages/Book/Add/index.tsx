import React, {
  useState,
  useEffect,
  useCallback,
  useRef,
  ChangeEvent,
} from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import { Form } from '@unform/web';

import { FormHandles } from '@unform/core';
import * as Yup from 'yup';

import { uuid } from 'uuidv4';

import {
  useBookCategory,
  BookCategoryState,
} from '../../../context/BookCategoryContext';

import { useToast } from '../../../context/ToastContext';

import Input from '../../../components/Input';

import Button from '../../../components/Button';

import { Title, Content } from './styles';

import getValidationErrors from '../../../utils/getValidationErrors';

interface NewBookFormData {
  title: string;
  description: string;
  author: string;
}

interface NewBookData {
  id: string;
  timestamp: Date;
  title: string;
  description: string;
  author: string;
  category: string;
  deleted: boolean;
}

const AddBook: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const { bookCategory } = useBookCategory();
  const { addToast } = useToast();

  const [bookCategories, setBookCategories] = useState<BookCategoryState[]>([]);
  const [bookCategoryId, setBookcategoryId] = useState('none');
  const [newBookData, setNewBookData] = useState<NewBookData[]>(() => {
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

  useEffect(() => {
    localStorage.setItem('@MyBooks:books', JSON.stringify(newBookData));
  }, [newBookData]);

  const handleSubmit = useCallback(
    async (data: NewBookFormData) => {
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
         * After validation,  a new book will be created
         */
        const id = uuid();
        const timestamp = new Date();

        const newBook = {
          id,
          timestamp,
          title: data.title,
          description: data.description,
          author: data.author,
          category: bookCategoryId,
          deleted: false,
        };

        setNewBookData((OldBook) => [...OldBook, newBook]);
        /**
         * End
         *
         * After validation,  a new book will be created
         */

        history.push('/');
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);

          formRef.current?.setErrors(errors);

          return;
        }

        addToast({
          type: 'error',
          title: 'Error on Add Book!',
          description:
            'Occurred an error during book creation, please fill the required fields.',
        });
      }
    },
    [addToast, bookCategoryId, history],
  );

  const handleSelectCategory = useCallback(
    (event: ChangeEvent<HTMLSelectElement>) => {
      const bookCategorySelected = event.target.value;

      if (bookCategorySelected !== '0' && bookCategorySelected !== 'none')
        setBookcategoryId(bookCategorySelected);
    },
    [],
  );

  return (
    <>
      <Title>
        <h1>New Book</h1>
        <Link to="/">
          <FiArrowLeft />
          Back to home
        </Link>
      </Title>
      <Content>
        <Form ref={formRef} onSubmit={handleSubmit}>
          <select name="category" id="category" onChange={handleSelectCategory}>
            <option value="none">Choose a category</option>
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

          <Button type="submit">Create</Button>
        </Form>
      </Content>
    </>
  );
};

export default AddBook;
