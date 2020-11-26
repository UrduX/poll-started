import React from "react";

import styled from "styled-components";

import { ColorPicker } from "../../theme";

import { forwardRef } from "react";

import { RiCheckDoubleLine } from "react-icons/ri";

const Checkbox = forwardRef(
  ({ name, value, onChange, checked, color, disabled, label }, ref) => {
    return (
      <MainContainer>
        <Container>
          <CheckboxContainer>
            <Input
              ref={ref}
              type="checkbox"
              name={name}
              value={value}
              onChange={onChange}
              checked={checked}
              ref={ref}
              color={color}
              disabled={disabled}
            />
            <CheckboxTick color={color}>
              <RiCheckDoubleLine />
            </CheckboxTick>
          </CheckboxContainer>
          <Text>{label}</Text>
        </Container>
      </MainContainer>
    );
  }
);

export default Checkbox;

const MainContainer = styled.div`
  position: relative;
  display: inline-flex;
`;

const Container = styled.label`
  position: relative;
  display: flex;
  align-items: center;
`;

const CheckboxContainer = styled.div`
  position: relative;
  margin-right: 0.5rem;
  height: 24px;
  width: 24px;
  border-radius: 5px;
  background: rgb(${ColorPicker("background")});
  border: 2px solid rgb(${ColorPicker("element")});
  transition: all 0.2s ease;
  :hover {
    background: rgba(${ColorPicker("layout")}, 0.5);
    box-shadow: 0px 5px 10px -5px rgba(${({ color }) => (color ? ColorPicker(color) : ColorPicker("element"))}, 0.5);
  }
`;

const CheckboxTick = styled.label`
  position: absolute;
  top: -2px;
  left: -2px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 5px;
  padding: 3px;
  height: 24px;
  width: 24px;
  opacity: 0;
  transform: scale(0);
  font-size: 0;
  :hover {
    box-shadow: 0px 5px 10px -2px rgba(${({ color }) => (color ? ColorPicker(color) : ColorPicker("primary"))}, 0.5);
  }
  transition: all 0.3s ease;
`;

const Text = styled.p`
  display: inline-flex;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 0.9rem;

  ::selection {
    background: transparent;
  }
  :hover {
    color: rgba(255, 255, 255, 0.7);
  }
`;

const Input = styled.input`
  position: absolute;
  top: -2px;
  left: -2px;
  opacity: 0;
  z-index: 3;
  height: 24px;
  width: 24px;
  cursor: pointer;

  :checked + ${CheckboxTick} {
    opacity: 1;
    transform: scale(1);
    font-size: 24px;
    background: rgb(
      ${({ color }) => (color ? ColorPicker(color) : ColorPicker("element"))}
    );
    box-shadow: 0px 5px 10px 1px
      rgba(
        ${({ color }) => (color ? ColorPicker(color) : ColorPicker("element"))},
        0.5
      );
  }
`;
