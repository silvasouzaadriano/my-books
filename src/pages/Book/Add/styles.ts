import styled from 'styled-components';
import { shade } from 'polished';

export const Title = styled.div`
  max-width: 65vw;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 50px;

  a {
    display: flex;
    align-items: center;

    color: #3a3a3a;
    text-decoration: none;
    margin-right: 16px;
    transition: color 0.2s;

    &:hover {
      color: ${shade(0.2, '#04d361')};
    }
  }

  svg {
    margin-right: 16px;
    color: #04d361;
  }
`;

export const Content = styled.div`
  margin-top: 50px;

  select {
    margin-bottom: 10px;
    background: #f5f5f5;
    padding: 16px;
    width: 100%;
    color: #bce0fd;
    font-weight: 700;
    border: 0;

    display: flex;
    align-items: center;

    &:hover {
      cursor: pointer;
    }

    option {
      font-weight: 700;
    }
  }

  button {
    background-color: #04d361;
    transition: background-color 0.2s;

    &:hover {
      background: ${shade(0.2, '#04d361')};
    }
  }
`;
