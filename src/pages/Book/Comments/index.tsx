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

import { Header, Comment, CommentModal } from './styles';

interface NewBookCommentsForm {
  author: string;
  body: string;
}

interface UpdateBookCommentsForm {
  authorModal: string;
  bodyModal: string;
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
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [bookCommentId, setBookCommentId] = useState('');
  const [bookCommentAuthor, setBookCommentAuthor] = useState('');
  const [bookCommentBody, setBookCommentBody] = useState('');
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const openModal = useCallback(() => {
    setModalIsOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setModalIsOpen(false);
  }, []);

  // This function handle the process about a new comment
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

  // This function handle the comment updated based based on modal fields
  const handleUpdateCommentSubmit = useCallback(
    async (data: UpdateBookCommentsForm) => {
      try {
        formRef.current?.setErrors({});

        // Validate the form
        const schema = Yup.object().shape({
          authorModal: Yup.string()
            .required('Author is required')
            .max(30, 'Author exceeded 30 characters'),
          bodyModal: Yup.string()
            .required('Message is required')
            .max(100, 'Message exceeded 100 characters'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        /**
         * Begin
         *
         * After validation, the book comment will be updated
         */

        const bookCommentIndex = bookComments.findIndex(
          (comment) => comment.id === bookCommentId,
        );

        if (bookCommentIndex >= 0) {
          // Recreating the state of bookComments with the book marked as deleted
          // Also recreating the local storage with new state
          bookComments[bookCommentIndex].author = data.authorModal;
          bookComments[bookCommentIndex].body = data.bodyModal;
          setBookComments(bookComments);
          localStorage.setItem(
            '@MyBooks:bookComments',
            JSON.stringify(bookComments),
          );

          // Recreating the state of bookCommentFiltered with the new state of bookComments
          const newBookCommentsFiltered: BookComments[] = bookComments.filter(
            (book) => book.parentId === bookId && !book.deleted,
          );
          setBookCommentsFiltered(newBookCommentsFiltered);
        }

        /**
         * End
         *
         * After validation, the book comment will be updated
         */

        setBookCommentId('');
        setBookCommentAuthor('');
        setBookCommentBody('');

        closeModal();
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);

          formRef.current?.setErrors(errors);

          return;
        }

        setBookCommentId('');
        setBookCommentAuthor('');
        setBookCommentBody('');
        closeModal();
        addToast({
          type: 'error',
          title: 'Error on Updating Comment!',
          description:
            'Occurred an error during book comment update, please fill the required fields.',
        });
      }
    },
    [addToast, closeModal, bookComments, bookId, bookCommentId],
  );

  // Based on modal delete button, which receives the comment id, this function
  // handle the process to mark the the comment as deleted.
  const handleMarkBookCommentAsDeleted = useCallback(
    (id: string) => {
      try {
        // Set as delete the current book comment and then updating the localstorage
        const bookCommentIndex = bookComments.findIndex(
          (comment) => comment.id === id,
        );

        if (bookCommentIndex >= 0) {
          // Recreating the state of bookComments with the book marked as deleted
          // Also recreating the local storage with new state
          bookComments[bookCommentIndex].deleted = true;
          setBookComments(bookComments);
          localStorage.setItem(
            '@MyBooks:bookComments',
            JSON.stringify(bookComments),
          );

          // Recreating the state of bookCommentFiltered with the new state of bookComments
          const newBookCommentsFiltered: BookComments[] = bookComments.filter(
            (book) => book.parentId === bookId && !book.deleted,
          );
          setBookCommentsFiltered(newBookCommentsFiltered);
        }

        addToast({
          type: 'success',
          title: 'Book Comment Deletion!',
          description: 'The book comment was marked as deleted successfully.',
        });
      } catch (err) {
        addToast({
          type: 'error',
          title: 'Error on Book Comment Deletion!',
          description:
            'Occurred an error during book comment deletion, please check if the @MyBooks:bookComments exists on local storage.',
        });
      }
    },
    [bookComments, addToast, bookId],
  );

  // This function,  based on comment to be changed, prepare the modal fields with it values
  const handleSetModalBookCommentForUpdate = useCallback(
    (id: string) => {
      try {
        const modalBookComment = bookComments.filter(
          (comment) => comment.id === id,
        );

        setBookCommentId(id);
        setBookCommentAuthor(modalBookComment[0].author);
        setBookCommentBody(modalBookComment[0].body);

        openModal();
      } catch (err) {
        addToast({
          type: 'error',
          title: 'Error on set Book Comment for update!',
          description:
            'Occurred an error during seeting book comment for update, please check if the @MyBooks:bookComments exists on local storage.',
        });
        setBookCommentId('');
        setBookCommentAuthor('');
        setBookCommentBody('');
      }
    },
    [bookComments, addToast, openModal],
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

      {modalIsOpen && (
        <CommentModal>
          <h2>Edit Book Comment</h2>
          <Form ref={formRef} onSubmit={handleUpdateCommentSubmit}>
            <Input
              name="authorModal"
              type="text"
              placeholder="Author"
              defaultValue={bookCommentAuthor}
            />
            <Input
              name="bodyModal"
              type="text"
              placeholder="Comment"
              defaultValue={bookCommentBody}
            />
            <div>
              <Button type="submit">Update</Button>
              <Button type="button" onClick={closeModal}>
                Close
              </Button>
            </div>
          </Form>
        </CommentModal>
      )}

      {bookCommentsFiltered.map((comment) => (
        <Comment key={comment.id}>
          <main>
            <strong>{comment.author}</strong>
            <span>
              {format(
                utcToZonedTime(comment.timestamp, timeZone),
                "dd'/'MM'/'yyyy HH:mm:ss",
                {
                  locale: pt,
                },
              )}
            </span>
          </main>
          <aside>
            <p>{comment.body}</p>
            <div>
              <Button
                type="button"
                onClick={() => handleSetModalBookCommentForUpdate(comment.id)}
              >
                Edit
              </Button>
              <Button
                type="button"
                onClick={() => handleMarkBookCommentAsDeleted(comment.id)}
              >
                Delete
              </Button>
            </div>
          </aside>
        </Comment>
      ))}
    </>
  );
};

export default Comments;
