import styled from 'styled-components';
import { shade } from 'polished';

export const Header = styled.div`
  max-width: 65vw;
  display: flex;
  align-items: center;

  img {
    max-width: 5%;
  }

  h1 {
    font-size: 5vh;
    margin-left: 16px;
    color: #3a3a3a;
    line-height: 56px;
  }
`;

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
