import React from 'react';

import { Container } from './styles';

import logoImg from '../../assets/logo.jpg';

const Header: React.FC = () => {
  return (
    <Container>
      <img src={logoImg} alt="My Books" />
      <h1>MyBooks</h1>
    </Container>
  );
};

export default Header;
