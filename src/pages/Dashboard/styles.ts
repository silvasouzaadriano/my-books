import styled from 'styled-components';
import { shade } from 'polished';

export const Categories = styled.div`
  max-width: 65vw;
  display: flex;
  align-items: center;
  margin-top: 60px;

  strong {
    margin-right: 16px;
  }

  a {
    color: #3a3a3a;
    text-decoration: none;
    margin-right: 16px;
    transition: color 0.2s;

    &:hover {
      color: ${shade(0.2, '#04d361')};
    }
  }

  button {
    width: 95px;
    height: 35px;
    background: #04d361;
    border-radius: 8px;
    border: 0;
    color: #fff;
    font-weight: bold;
    font-size: 2.5vh;
    transition: background-color 0.2s;
    flex-wrap: wrap;

    &:hover {
      background: ${shade(0.2, '#04d361')};
    }

    @media (max-width: 768px) {
      font-size: 2.5vh;
    }

    @media (max-width: 425px) {
      width: 60px;
      height: 30px;
      font-size: 2vh;
    }
  }

  select {
    width: 130px;
    height: 35px;
    appearance: none;
    background: #04d361;
    border-radius: 8px;
    border: 0;
    color: #fff;
    font-weight: bold;
    padding: 10px;
    margin-right: 16px;
    transition: background-color 0.2s;

    &:hover {
      background: ${shade(0.2, '#04d361')};
    }

    @media (max-width: 425px) {
      width: 90px;
      height: 30px;
      font-size: 2vh;
    }
  }
`;

export const Container = styled.div`
  max-width: 100%;
  margin-top: 50px;
  a {
    text-decoration: none;
  }
`;

export const Book = styled.div`
  margin-top: 10px;
  display: block;
  overflow: hidden;
  word-break: break-all;
  max-height: 100px;
  background-color: #fff;
  border-radius: 5px;
  padding: 10px;

  main {
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

  aside {
    margin-top: 5px;
    display: flex;
    justify-content: space-between;

    p {
      align-items: left;
      font-size: 1.2vw;
      color: #a8a8b3;
      margin-top: 5px;
    }
    svg {
      margin-left: auto;
      margin-right: -10px;
      color: #cdcdb6;
      font-size-adjust: 20px;
    }
  }
`;
