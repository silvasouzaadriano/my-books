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
    font-size: 3vw;
    margin-left: 16px;
    color: #3a3a3a;
    line-height: 56px;
  }
`;

export const Categories = styled.div`
  max-width: 65vw;
  display: flex;
  align-items: center;
  font-size: 1.4vw;
  margin-top: 50px;

  @media (max-width: 1024px) {
    max-width: 75vw;
  }

  @media (max-width: 768px) {
    max-width: 85vw;
    font-size: 1.6vw;
  }

  @media (max-width: 425px) {
    font-size: 1.4vw;
  }

  @media (max-width: 375px) {
    font-size: 1.2vw;
  }

  @media (max-width: 320px) {
    font-size: 1.1vw;
  }

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
    transition: background-color 0.2s;

    &:hover {
      background: ${shade(0.2, '#04d361')};
    }

    @media (max-width: 768px) {
      font-size: 1.5vw;
      width: 90px;
      height: 30px;
    }

    @media (max-width: 425px) {
      width: 35px;
      height: 18px;
    }

    @media (max-width: 375px) {
      width: 33px;
      height: 15px;
    }

    @media (max-width: 320px) {
      width: 30px;
      height: 10px;
    }
  }

  select {
    width: 128px;
    height: 35px;
    appearance: none;
    background: #04d361;
    border-radius: 8px;
    border: 0;
    color: #fff;
    font-weight: bold;
    padding: 10px;
    transition: background-color 0.2s;

    &:hover {
      background: ${shade(0.2, '#04d361')};
    }

    @media (max-width: 768px) {
      font-size: 1.5vw;
      width: 110px;
      height: 30px;
      padding: 8px;
    }

    @media (max-width: 425px) {
      font-size: 1.3vw;
      width: 50px;
      height: 18px;
      padding: 2px;
    }

    @media (max-width: 375px) {
      width: 45px;
      height: 15px;
    }

    @media (max-width: 320px) {
      width: 40px;
      height: 10px;
    }
  }
`;

export const Books = styled.div`
  max-width: 63vw;
  margin-top: 80px;

  @media (max-width: 1024px) {
    max-width: 72vw;
  }

  @media (max-width: 768px) {
    max-width: 83vw;
  }

  a {
    width: 100%;
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
    strong {
      font-size: 1.5vw;
      color: #3d3d4d;
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
