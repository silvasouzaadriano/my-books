/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useCallback, useRef } from 'react';

import { format, utcToZonedTime } from 'date-fns-tz';

import pt from 'date-fns/locale/pt-BR';

import { Form } from '@unform/web';

import { FormHandles } from '@unform/core';

import * as Yup from 'yup';
import { uuid } from 'uuidv4';

import getValidationErrors from '../../../utils/getValidationErrors';

import { useToast } from '../../../context/ToastContext';

import Input from '../../../components/Input';
import Button from '../../../components/Button';

import { Header, Comment } from './styles';

interface NewBookCommentsForm {
  author: string;
  body: string;
}

interface BookComments {
  id: string;
  parentId: string;
  timestamp: Date;
  body: string;
  author: string;
  deleted: boolean;
}

interface BookCommentsProps {
  bookId: string;
}

const { timeZone } = Intl.DateTimeFormat().resolvedOptions();

const Comments: React.FC<BookCommentsProps> = ({ bookId }) => {
  const formRef = useRef<FormHandles>(null);
  const { addToast } = useToast();
  const [bookComments, setBookComments] = useState<BookComments[]>(() => {
    const storagedBookComments = localStorage.getItem('@MyBooks:bookComments');

    if (storagedBookComments) {
      return JSON.parse(storagedBookComments);
    }
    return [];
  });

  const [bookCommentsFiltered, setBookCommentsFiltered] = useState<
    BookComments[]
  >(() => {
    const storagedBookComments = localStorage.getItem('@MyBooks:bookComments');

    if (storagedBookComments) {
      return JSON.parse(storagedBookComments);
    }
    return [];
  });

  // This action update the localStorage with a new comment
  useEffect(() => {
    localStorage.setItem('@MyBooks:bookComments', JSON.stringify(bookComments));
  }, [bookComments]);

  // This action get the comments filtered by book ID
  useEffect(() => {
    const newBookComments: BookComments[] = bookCommentsFiltered.filter(
      (book) => book.parentId === bookId && !book.deleted,
    );
    setBookCommentsFiltered(newBookComments);
  }, []);

  const handleSubmit = useCallback(
    async (data: NewBookCommentsForm) => {
      try {
        formRef.current?.setErrors({});

        // Validate the form
        const schema = Yup.object().shape({
          author: Yup.string()
            .required('Author is required')
            .max(30, 'Author exceeded 30 characters'),
          body: Yup.string()
            .required('Message is required')
            .max(100, 'Message exceeded 100 characters'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        /**
         * Begin
         *
         * After validation,  a new book comment will be created
         */
        const id = uuid();
        const timestamp = new Date();

        const newBookComment = {
          id,
          parentId: bookId,
          timestamp,
          body: data.body,
          author: data.author,
          deleted: false,
        };

        setBookComments((OldBookComment) => [
          ...OldBookComment,
          newBookComment,
        ]);

        setBookCommentsFiltered((OldBookComment) => [
          ...OldBookComment,
          newBookComment,
        ]);

        // Cleanning up fields after message created
        formRef.current?.setData({ author: '' });
        formRef.current?.setData({ body: '' });

        /**
         * End
         *
         * After validation,  a new book comment will be created
         */
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);

          formRef.current?.setErrors(errors);

          return;
        }

        addToast({
          type: 'error',
          title: 'Error on Add Book Comment!',
          description:
            'Occurred an error during book comment creation, please fill the required fields.',
        });
      }
    },
    [addToast, bookId],
  );

  return (
    <>
      <Header>
        <h1>Comments</h1>
        <Form ref={formRef} onSubmit={handleSubmit}>
          <div>
            <div>
              <Input name="author" type="text" placeholder="Author" />
              <Input name="body" type="text" placeholder="Comment" />
            </div>
            <Button type="submit">Add</Button>
          </div>
        </Form>
      </Header>

      {bookCommentsFiltered.map((comment) => (
        <Comment key={comment.id}>
          <main>
            <strong>{comment.author}</strong>
            <span>
              {format(
                utcToZonedTime(comment.timestamp, timeZone),
                "dd'/'MM'/'yyyy HH:mm:ss.SSS",
                {
                  locale: pt,
                },
              )}
            </span>
          </main>
          <aside>
            <p>{comment.body}</p>
            <div>
              <Button type="button">Edit</Button>
              <Button type="button">Delete</Button>
            </div>
          </aside>
        </Comment>
      ))}
    </>
  );
};

export default Comments;
