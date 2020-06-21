import styled from 'styled-components';

export const Container = styled.div`
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

    button {
      background-color: #04d361;
      font-size: 1.2vw;
      width: 10vw;
      height: 3vw;

      text-align: center;
      margin-left: 20px;
    }
  }
`;

export const Content = styled.div`
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
