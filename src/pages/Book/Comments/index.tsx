import React, { useRef } from 'react';

import { Form } from '@unform/web';

import { FormHandles } from '@unform/core';

import Input from '../../../components/Input';
import Button from '../../../components/Button';

import { Container, Content } from './styles';

interface CommentsProps {
  bookId: string;
}

const Comments: React.FC<CommentsProps> = ({ bookId }) => {
  const formRef = useRef<FormHandles>(null);
  return (
    <>
      <Container>
        <h1>Comments about bookId: {bookId}</h1>
        <Form ref={formRef} onSubmit={() => {}}>
          <div>
            <div>
              <Input name="author" type="text" placeholder="Author" />
              <Input name="comment" type="text" placeholder="Comment" />
            </div>
            <Button type="submit">Add</Button>
          </div>
        </Form>

        <Content>
          <div className="container">
            <div className="content">
              <main>
                <span>Author</span>
                <span>20/06/2020 22:22:36.236</span>
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
        </Content>

        <Content>
          <div className="container">
            <div className="content">
              <main>
                <span>Author</span>
                <span>20/06/2020 22:22:36.236</span>
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
        </Content>

        <Content>
          <div className="container">
            <div className="content">
              <main>
                <span>Author</span>
                <span>20/06/2020 22:22:36.236</span>
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
        </Content>
      </Container>
    </>
  );
};

export default Comments;
