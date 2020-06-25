import styled from 'styled-components';
import { shade } from 'polished';

export const Container = styled.div`
  max-width: 65vw;
  display: flex;
  align-items: center;

  a {
    text-decoration: none;
  }

  div {
    display: flex;
    flex-direction: row;
    align-items: center;
  }

  img {
    width: 52px;
    height: 52px;
  }

  h1 {
    font-size: 5vh;
    margin-left: 16px;
    color: #3a3a3a;
    line-height: 56px;

    transition: color 0.2s;

    &:hover {
      color: ${shade(0.2, '#04d361')};
    }
  }
`;
