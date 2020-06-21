import styled from 'styled-components';
import { shade } from 'polished';

export const Header = styled.div`
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

export const BookContainer = styled.div`
  margin-top: 20px;
  overflow: hidden;
  word-break: break-all;

  span {
    font-size: 1.6vw;
    font-weight: 700;
  }

  p {
    margin-top: 5px;
    margin-bottom: 20px;
    font-size: 1.2vw;
    font-weight: 100;
  }

  .buttons {
    display: flex;
    align-items: center;

    button {
      background-color: #04d361;
      font-size: 1.2vw;
      width: 10vw;
      height: 5vh;
      text-align: center;
      margin-right: 20px;
    }
  }

  .head {
    margin-top: 30px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }
`;

export const CommentContainer = styled.div`
  max-width: 100%;
  margin-top: 40px;

  strong {
    font-size: 1.6vw;
    font-weight: 700;
  }

  form div {
    margin-top: 10px;
    display: flex;
    align-items: center;

    button {
      margin-top: 10px;
      background-color: #04d361;
      font-size: 1.2vw;
      width: 10vw;
      height: 2vw;

      text-align: center;
      margin-left: 20px;
    }
  }
`;

export const Comment = styled.div`
  margin-top: 10px;
  display: block;
  overflow: hidden;
  word-break: break-all;
  max-height: 100px;
  background-color: #fff;
  border-radius: 5px;
  padding: 10px;

  .container {
    display: flex;
    flex-direction: row;
  }

  .content {
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
      flex-direction: row;
      align-items: center;

      p {
        align-items: left;
        font-size: 1.2vw;
        color: #a8a8b3;
        margin-top: 5px;
      }
    }
  }

  .buttons {
    display: flex;
    flex-direction: row;
    margin-left: 10px;

    button {
      background-color: #04d361;
      font-size: 0.8vw;
      width: 5vw;
      height: 2vw;

      text-align: center;
      margin-left: 5px;
    }
  }
`;
