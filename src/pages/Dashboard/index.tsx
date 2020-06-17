import React from 'react';
import { Link } from 'react-router-dom';
import { FiChevronRight } from 'react-icons/fi';

import logoImg from '../../assets/logo.jpg';

import { Header, Categories, Books } from './styles';

const Dashboard: React.FC = () => {
  const handleBookOrdering = () => {
    return null;
  };

  return (
    <>
      <Header>
        <img src={logoImg} alt="My Books" />
        <h1>My Books</h1>
      </Header>

      <Categories>
        <strong>Choose a category:</strong>
        <Link to="/">None</Link>
        <Link to="/booklistbycategory/reading">Currently Reading</Link>
        <Link to="/booklistbycategory/wantToRead">Want to Read</Link>
        <Link to="/booklistbycategory/read">Read</Link>
        <Link to="/addbook">
          <button type="button">Add Book</button>
        </Link>
        <select
          name="book-ordering"
          id="book-ordering"
          onChange={handleBookOrdering}
        >
          <option value="none">Select a ordering</option>
          <option value="asc">Ascending</option>
          <option value="date">Date</option>
        </select>
      </Categories>

      <Books>
        <Link to="/viewdetailbook">
          <div>
            <strong>Dom Casmurro</strong>
            <p>
              Em “Dom Casmurro”, lançado em 1900, Machado de Assis cria um
              enredo enigmático, cheio de lacunas e indícios que ora apontam
              para o adultério de Capitu, ora o descreditam.
            </p>
          </div>
          <FiChevronRight size={20} />
        </Link>
        <Link to="/viewdetailbook">
          <div>
            <strong>Dom Casmurro</strong>
            <p>
              Em “Dom Casmurro”, lançado em 1900, Machado de Assis cria um
              enredo enigmático, cheio de lacunas e indícios que ora apontam
              para o adultério de Capitu, ora o descreditam.
            </p>
          </div>
          <FiChevronRight size={20} />
        </Link>
        <Link to="/viewdetailbook">
          <div>
            <strong>Dom Casmurro</strong>
            <p>
              Em “Dom Casmurro”, lançado em 1900, Machado de Assis cria um
              enredo enigmático, cheio de lacunas e indícios que ora apontam
              para o adultério de Capitu, ora o descreditam.
            </p>
          </div>
          <FiChevronRight size={20} />
        </Link>
      </Books>
    </>
  );
};

export default Dashboard;
