import React from "react";
import styled from "styled-components";
import { ColorPicker } from "../../theme";
import { forwardRef } from "react";

const Switch = forwardRef(
  ({ name, color, onChange, checked, value, disabled }, ref) => {
    return (
      <Container>
        <SwitchInput
          name={name}
          value={value}
          onChange={onChange}
          checked={checked}
          ref={ref}
          color={color}
          disabled={disabled}
          type="checkbox"
        />
        <SwitchDot />
      </Container>
    );
  }
);
export default Switch;

const Container = styled.div`
  position: relative;
  display: inline-block;
  border: 2px solid rgb(${ColorPicker("element")});
  margin: 0.5rem;
  border-radius: 30px;
  width: 64px;
  height: 32px;
  transition: all 0.3s ease;
  background: rgb(${ColorPicker("background")});
  :hover {
    background: rgba(${ColorPicker("layout")}, 0.3);
    box-shadow: 0px 5px 10px -5px rgba(${({ color }) => (color ? ColorPicker(color) : ColorPicker("element"))}, 0.5);
  }
`;

const SwitchDot = styled.label`
  position: absolute;
  top: 2px;
  left: 2px;
  background: rgb(${ColorPicker("element")});
  border-radius: 100%;
  height: 24px;
  width: 24px;
  transition: all 0.3s ease;
`;
const SwitchInput = styled.input`
  position: relative;
  opacity: 0;
  height: 100%;
  width: 100%;
  cursor: pointer;
  z-index: 1;
  :checked + ${SwitchDot} {
    left: 34px;
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
