import React from "react";
import styled, { css } from "styled-components";
import { ColorPicker } from "../../theme";
import { CircleLoader } from "react-spinners";

const ButtonDesign = (props) => {
  const { textAlign, circle, loading, icon, children } = props;
  return (
    <div>
      <Button {...props}>
        <Container textAlign={textAlign} circle={circle}>
          {!loading && icon}
          {!loading && !circle && children}
          {loading && (
            <CircleLoader color={`rgb(${ColorPicker("primary")})`} size={30} />
          )}
        </Container>
      </Button>
    </div>
  );
};

export default ButtonDesign;

const Container = styled.div`
  display: flex;
  align-items: center;
  ${({ textAlign }) => {
    switch (textAlign) {
      case "start":
        return css`
          justify-content: flex-start;
        `;
      case "center":
        return css`
          justify-content: center;
        `;
      case "end":
        return css`
          justify-content: end;
        `;
      default:
        return css`
          justify-content: center;
        `;
    }
  }}
  ${({ textAlign }) => {
    switch (textAlign) {
      case "start":
        return css`
          text-align: start;
        `;
      case "center":
        return css`
          text-align: center;
        `;
      case "end":
        return css`
          text-align: end;
        `;
      default:
        return css`
          text-align: center;
        `;
    }
  }}
  height: 100%;
  width: 100%;

  ::selection {
    background: transparent;
  }
  ion-icon {
    height: 24px;
    width: 24px;
    padding-right: ${({ circle }) => (circle ? "0px" : "5px")};
    font-size: 16px;
  }
`;

const Button = styled.button`
  display: inline-block;
  /* DEFAULT BUTTON */
  position: relative;
  color: #ffffffff;
  font-family: "Poppins", sans-serif;
  font-size: 1rem;
  outline: none;
  border-radius: 15px;
  transition: all 0.3s ease;
  text-decoration: none;
  :hover {
    cursor: pointer;
    transform: translateY(-2px);
    box-shadow: 0px 10px 20px -10px rgba(${({ color }) => (color ? ColorPicker(color) : ColorPicker("element"))}, 0.5);
  }
  /* COLOR */
  background-color: rgb(
    ${({ color }) => (color ? ColorPicker(color) : ColorPicker("element"))}
  );
  /* SIZE */
  padding: ${({ size }) => {
    switch (size) {
      case "lg":
        return "16px 32px";
      case "md":
        return "8px 16px";
      case "sm":
        return "4px 8px";
      default:
        return "8px 16px";
    }
  }};

  /* BORDER */
  ${({ border, color }) => {
    if (border) {
      return css`
        border: 2px solid
          rgb(${color ? ColorPicker(color) : ColorPicker("element")});
        background: transparent;
        transition: all 0.3s ease;
        color: rgb(${color ? ColorPicker(color) : "#fffffff"});
        :hover {
          border: 2px solid
            rgba(${color ? ColorPicker(color) : ColorPicker("element")}, 0.5);
        }
        :focus {
          color: #ffffff;
          background: ${color
            ? `rgb(${ColorPicker(color)})`
            : `rgb(${ColorPicker("element")})`};
        }
      `;
    } else {
      return css`
        border: none;
      `;
    }
  }}

  /* TRANSPARENT */
  ${({ transparent, color }) =>
    transparent &&
    css`
      background: transparent !important;
      color: rgb(${color ? ColorPicker(color) : "255,255,255"});
      :hover {
        background: rgba(
          ${color ? ColorPicker(color) : ColorPicker("element")},
          0.5
        ) !important;
        color: #ffffff;
      }
      :focus {
        background: rgba(
          ${color ? ColorPicker(color) : ColorPicker("element")},
          0.5
        ) !important;
        color: #ffffff;
      }
    `}

/* CIRCLE */
${({ circle, icon }) => {
    if (circle && icon)
      return css`
        ion-icon {
          padding: 0px !important;
          font-size: 24px;
        }
        padding: 8px !important;
        border-radius: 100% !important;
      `;
  }}

/* BLOCK */
${({ block }) =>
    block
      ? css`
          display: block;
          width: 100%;
        `
      : css`
          display: inline-block;
        `}
`;
