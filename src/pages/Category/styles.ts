import styled from 'styled-components';
import { shade } from 'polished';

export const Category = styled.div`
  max-width: 65vw;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 60px;

  h1 span {
    color: #3a3a3a;
    font-weight: 100;
  }
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

export const Books = styled.div`
  max-width: 63vw;
  margin-top: 40px;

  @media (max-width: 1024px) {
    max-width: 72vw;
  }

  @media (max-width: 768px) {
    max-width: 83vw;
  }

  a {
    width: 100%;
    height: 100px;
    background: #fff;
    border-radius: 5px;
    display: block;
    text-decoration: none;

    padding: 24px;
    display: flex;
    align-items: center;
    transition: transform 0.2s;

    &:hover {
      transform: translateX(10px);
    }

    & + a {
      margin-top: 16px;
    }
  }

  div {
    > div {
      display: flex;
      align-items: center;
      justify-content: space-between;

      strong {
        font-size: 1.5vw;
        color: #3d3d4d;
        margin-right: 10px;
      }

      span {
        color: #a8a8b3;
      }
    }

    p {
      font-size: 1.2vw;
      color: #a8a8b3;
      margin-top: 5px;
    }
  }

  svg {
    margin-left: auto;
    color: #cdcdb6;
  }
`;
