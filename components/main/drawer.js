import React, { useLayoutEffect, useRef } from "react";

import styled, { css } from "styled-components";

import Button from "./button";

import { ColorPicker } from "../../theme";

import { CSSTransition } from "react-transition-group";

import { RiCloseLine } from "react-icons/ri";
const Divider = ({
  isOpen,
  setOpen,
  closeable,
  onClickOutsideClose,
  position,
}) => {
  const outside = useRef();

  const handleClickOutside = (e) => {
    if (!outside.current.contains(e.target) && isOpen && onClickOutsideClose)
      setOpen(false);
  };

  useLayoutEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  });

  const PositionSelector = (position) => {
    switch (position) {
      case "right":
        return "drawer-right";
      case "left":
        return "drawer-left";
      default:
        return "drawer-right";
    }
  };

  return (
    <div ref={outside}>
      <CSSTransition
        in={isOpen}
        timeout={300}
        unmountOnExit
        classNames={PositionSelector(position)}
      >
        <Container {...position}>
          {closeable && (
            <CloseButton
              color="layout"
              onClick={() => {
                setOpen(!isOpen);
              }}
              circle
              icon={<RiCloseLine />}
            />
          )}
        </Container>
      </CSSTransition>
    </div>
  );
};

export default Divider;

const Container = styled.div`
  position: fixed;
  top: 0;
  ${({ position }) => {
    switch (position) {
      case "right":
        return css`
          right: 0;
        `;
      case "left":
        return css`
          left: 0 !important;
        `;
      default:
        return css`
          right: 0;
        `;
    }
  }}
  width: 300px;
  height: 100%;
  border-radius: 30px 0px 0px 30px;
  padding: 1rem;
  transform: translateX(0px);
  background: rgb(${ColorPicker("element")});
  box-shadow: 0px 5px 10px 2px rgba(${ColorPicker("layout")}, 0.5);
  z-index: 4;
`;

const CloseButton = styled(Button)`
  position: absolute;
  top: 1em;
  right: 1em;
  z-index: 5;
`;
