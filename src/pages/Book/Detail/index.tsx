/* eslint-disable import/no-duplicates */
import React, { useRef, useState, useEffect, ChangeEvent } from 'react';
import { Link, useRouteMatch } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import { format, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt-BR';

import { Form } from '@unform/web';

import { FormHandles } from '@unform/core';
import * as Yup from 'yup';

import { uuid } from 'uuidv4';

import Input from '../../../components/Input';
import Button from '../../../components/Button';

import { useToast } from '../../../context/ToastContext';

import getValidationErrors from '../../../utils/getValidationErrors';

import { useBookCategory } from '../../../context/BookCategoryContext';

import { Header, BookContainer, CommentContainer, Comment } from './styles';

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
  const formRef = useRef<FormHandles>(null);
  const { addToast } = useToast();
  const [bookDetail, setBookDetail] = useState<Book[]>(() => {
    const storagedBooks = localStorage.getItem('@MyBooks:books');

    if (storagedBooks) {
      return JSON.parse(storagedBooks);
    }
    return [];
  });
  const { bookCategory } = useBookCategory();

  useEffect(() => {
    const bookFiltered = bookDetail.filter((book) => book.id === params.id);

    const bookCategoryFiltered = bookCategory.filter(
      (category) => category.id === bookFiltered[0].category,
    );

    bookFiltered[0].category = bookCategoryFiltered[0].title;

    setBookDetail(bookFiltered);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
          <Button type="button">Delete Book</Button>
          <Button type="button">Edit Category</Button>
        </div>
        <div className="head">
          <div className="category">
            <span>Category </span>
            <p>{bookDetail[0].category}</p>
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

      <CommentContainer>
        <h1>Comments</h1>
        <Form ref={formRef} onSubmit={() => {}}>
          <div>
            <Input name="comment" type="text" placeholder="Add a comment" />
            <Button type="submit">Add</Button>
          </div>
        </Form>

        <Comment>
          <div className="container">
            <div className="content">
              <main>
                <span>20/06/2020</span>
              </main>
              <aside>
                <p>
                  Comment Comment Comment Comment Comment Comment Comment
                  Comment Comment Comment Comment Comment Comment
                </p>
              </aside>
            </div>

            <div className="buttons">
              <Button type="button">Edit</Button>
              <Button type="button">Delete</Button>
            </div>
          </div>
        </Comment>

        <Comment>
          <div className="container">
            <div className="content">
              <main>
                <span>20/06/2020</span>
              </main>
              <aside>
                <p>
                  Comment Comment Comment Comment Comment Comment Comment
                  Comment Comment Comment Comment Comment Comment
                </p>
              </aside>
            </div>

            <div className="buttons">
              <Button type="button">Edit</Button>
              <Button type="button">Delete</Button>
            </div>
          </div>
        </Comment>

        <Comment>
          <div className="container">
            <div className="content">
              <main>
                <span>20/06/2020</span>
              </main>
              <aside>
                <p>
                  Comment Comment Comment Comment Comment Comment Comment
                  Comment Comment Comment Comment Comment Comment
                </p>
              </aside>
            </div>

            <div className="buttons">
              <Button type="button">Edit</Button>
              <Button type="button">Delete</Button>
            </div>
          </div>
        </Comment>
      </CommentContainer>
    </>
  );
};

export default ViewDetailBook;
