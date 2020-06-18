import styled, { css } from 'styled-components';

import Tooltip from '../Tooltip';

interface ContainerProps {
  isFocused: boolean;
  isFilled: boolean;
  isErrorred: boolean;
}

export const Container = styled.div<ContainerProps>`
  background: #F5F5F5;
  border: 1px solid #BCE0FD;
  padding: 16px;
  width: 100%;
  color: #BCE0FD;

  display: flex;
  align-items: center;

  & + div {
    margin-top: 10px;
  }

  svg {
    margin-right: 16px;
  }

  ${(props) =>
    props.isErrorred &&
    css`
      border-color: #c53030;
    `}

  ${(props) =>
    props.isFocused &&
    css`
      color: #020202;
      border: 2px solid #bce0fd;
    `}

  ${(props) =>
    props.isFilled &&
    css`
      color: #020202;
    `}

  input {
    background: transparent;
    color: #020202;
    flex: 1;
    border: 0;

    &::placeholder {
      font-size: 14px;
      color: #bce0fd;
    }

  }
`;

export const Error = styled(Tooltip)`
  height: 20px;
  margin-left: 16px;

  svg {
    margin: 0;
  }

  span {
    background: #c53030;
    color: #f5f5f5;

    &::before {
      border-color: #c53030 transparent;
    }
  }
`;
