import React, { useRef, ChangeEvent } from 'react';
import { Link } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

import { Form } from '@unform/web';

import { FormHandles } from '@unform/core';
import * as Yup from 'yup';

import { uuid } from 'uuidv4';

import Input from '../../../components/Input';
import Button from '../../../components/Button';

import { useToast } from '../../../context/ToastContext';

import getValidationErrors from '../../../utils/getValidationErrors';

import { Header, BookContainer, CommentContainer, Comment } from './styles';

const ViewDetailBook: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const { addToast } = useToast();
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
            <p>Want to Read</p>
          </div>

          <div className="creationDate">
            <span>Creation Date</span>
            <p>20/06/2020</p>
          </div>
        </div>
        <div className="title">
          <span>Title</span>
          <p>Dom Casmurro</p>
        </div>
        <div className="description">
          <span>Description</span>
          <p>
            Um livro muito importante da obra de Machado de Assis. Conta a
            história de Bentinho e Capitu. Um livro muito importante da obra de
            Machado de Assis. Conta a história de Bentinho e Capitu. Um livro
            muito importante da obra de Machado de Assis. Conta a história de
            Bentinho e Capitu. Um livro muito importante da obra de Machado de
            Assis. Conta a história de Bentinho e Capitu. Um livro muito
            importante da obra de Machado de Assis. Conta a história de Bentinho
            e Capitu.
          </p>
        </div>
        <div className="author">
          <span>Author</span>
          <p>Machado de Assis</p>
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
