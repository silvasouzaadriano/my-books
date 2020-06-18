import React from 'react';
import { useRouteMatch, Link } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

import { Category } from './styles';

interface BookCategoryParams {
  id: string;
  title: string;
}

const BookListByCategory: React.FC = () => {
  const { params } = useRouteMatch<BookCategoryParams>();

  return (
    <Category>
      <h1>
        Category: <span>{params.title}</span>
      </h1>
      <Link to="/">
        <FiArrowLeft />
        Back to home
      </Link>
    </Category>
  );
};

export default BookListByCategory;
