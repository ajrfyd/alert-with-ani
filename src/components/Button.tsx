import React from "react";
import styled, { css } from "styled-components";

type ButtonProps = {
  children: React.ReactNode;
  color: string;
  closeAlertHandler: () => void;
}

const Button = ({ children, color, closeAlertHandler }: ButtonProps) => {

  return <CustomButton color={color} onClick={closeAlertHandler}>{children}</CustomButton>
}

export default Button;

Button.defaultProps = {
  color: '#6200ee'
}

const CustomButton = styled.button`
  display: inline-flex;
  border: none;
  outline: none;
  border-radius: 4px;
  font-weight: bold;
  font-size: 1rem;
  cursor: pointer;
  padding: .2rem 1rem;
  background-color: color;

  ${({color}) => {
    return css`
      background-color: ${color};
    `
  }}

  &:hover {
    color: #fff;
  }

  &:active {
    transform: translateY(-5px);
    color: #000;
  }

  & + & {
    margin-left: 1rem;
  }
`