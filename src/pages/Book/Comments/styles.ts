import styled from 'styled-components';
import { shade } from 'polished';

export const Header = styled.div`
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

    div {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      width: 100%;
    }

    input {
      width: 100%;
    }

    button {
      background-color: #04d361;
      font-size: 14px;
      font-weight: bold;
      width: 50px;
      height: 25px;
      padding: 1px;
      text-align: center;
      margin-left: 20px;

      transition: background-color 0.2s;

      &:hover {
        background: ${shade(0.2, '#04d361')};
      }
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
    div {
      display: flex;
      flex-direction: row;
      margin-left: 10px;

      button {
        background-color: #04d361;
        font-size: 10px;
        font-weight: bold;
        width: 65px;
        height: 20px;
        text-align: center;
        margin-left: 5px;

        transition: background-color 0.2s;

        &:hover {
          background: ${shade(0.2, '#04d361')};
        }
      }
    }
  }
`;

export const CommentModal = styled.div`
  width: 60vw;
  height: auto;
  position: absolute;
  top: 100%;
  left: 50%;
  right: auto;
  bottom: auto;
  margin-right: -50%;
  padding: 20px;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: #ebf8ff;

  h2 {
    margin-bottom: 20px;
  }

  input {
    width: 50vw;
  }

  div {
    display: flex;
    flex-direction: row;
    justify-content: center;
  }

  button {
    width: 90px;
    height: 30px;
    background-color: #04d361;
    font-size: 16px;
    font-weight: bold;

    text-align: center;
    margin-left: 6px;
    padding: 5px;

    transition: background-color 0.2s;

    &:hover {
      background: ${shade(0.2, '#04d361')};
    }
  }
`;
