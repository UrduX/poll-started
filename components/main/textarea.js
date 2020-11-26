import React, { forwardRef } from "react";

import styled from "styled-components";

import { ColorPicker } from "../../theme";

const TextArea = forwardRef((props, ref) => {
  const { color, icon } = props;

  return (
    <Container color={color}>
      {icon && <Icon color={color}>{icon}</Icon>}
      <Input ref={ref} {...props} />
    </Container>
  );
});

export default TextArea;

const Container = styled.label`
  position: relative;
  display: block;
  border-radius: 15px;
  height: 100%;
  border: 2px solid rgb(${ColorPicker("element")});
  background-color: rgb(${ColorPicker("background")});
  overflow: hidden;
  transition: all 0.3s ease;
`;

const Icon = styled.label`
  position: absolute;
  display: flex;
  align-items: center;
  align-content: center;
  justify-items: center;
  justify-content: center;
  margin-top: 5px;
  margin-left: 5px;
  height: 32px;
  width: 32px;
  font-size: 1.5rem;
  border-radius: 100%;
  background: transparent;
  color: rgb(${({ color }) => (color ? ColorPicker(color) : "255,255,255")});
  /* box-shadow: 0px 10px 20px -8px rgba(${({ color }) =>
    color ? ColorPicker(color) : ColorPicker("element")}, 0.5); */
`;

const Input = styled.textarea`
  position: relative;
  font-family: "Poppins", sans-serif;
  display: inline-block;
  font-size: 0.9rem;
  color: #ffffff;
  line-height: 1rem;
  background-color: rgb(${ColorPicker("background")});
  outline: none;
  border: none;
  border-radius: 15px;
  padding: ${({ icon }) => (icon ? "0px 15px 0px 40px" : "0px 15px")};

  resize: none;
  padding: 1rem 1rem;
  overflow: auto;
  overflow-x: hidden;
  width: 100%;
  height: 100%;
  transition: all 0.1s ease;
  ::placeholder {
    color: #aaa;
  }
  :focus {
    ::placeholder {
      transition: all 0.3s ease;
      transform: translateX(-10px);
      opacity: 0;
    }
  }

  :hover {
    transition: all 0.3s ease;
    background: rgba(${ColorPicker("layout")}, 0.5);
    box-shadow: 0px 5px 10px -5px rgba(${ColorPicker("element")}, 0.5);
  }
  :focus {
    transition: all 0.3s ease;
    background: rgba(${ColorPicker("layout")}, 0.5);
    box-shadow: 0px 5px 10px 0px rgba(${ColorPicker("element")}, 0.5);
  }
`;
