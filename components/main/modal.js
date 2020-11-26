import React, { useEffect, useLayoutEffect, useRef } from "react";
import { CSSTransition } from "react-transition-group";
import styled from "styled-components";
import { ColorPicker } from "../../theme";
import Button from "./button";
import { RiCloseLine } from "react-icons/ri";
const Modal = ({
  isOpen,
  setOpen,
  closeable,
  children,
  onClickOutsideClose,
}) => {
  const outside = useRef();
  const content = useRef();
  const handleClickOutside = (e) => {
    if (
      outside.current.contains(e.target) &&
      !content.current.contains(e.target) &&
      isOpen &&
      onClickOutsideClose
    )
      setOpen(false);
  };
  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  });

  return (
    <Container ref={outside}>
      <CSSTransition
        in={isOpen}
        timeout={300}
        unmountOnExit
        classNames="modal-overlay"
      >
        <Overlay>
          <CSSTransition
            in={isOpen}
            timeout={400}
            unmountOnExit
            classNames="modal-content"
          >
            <Content ref={content}>
              {children}
              {closeable && (
                <CloseButton
                  onClick={() => {
                    setOpen(!isOpen);
                  }}
                  circle
                  icon={<RiCloseLine size={16} />}
                />
              )}
            </Content>
          </CSSTransition>
        </Overlay>
      </CSSTransition>
    </Container>
  );
};

export default Modal;

const Container = styled.div`
  position: fixed;
  z-index: 9999;
  box-sizing: border-box;
`;

const Overlay = styled.div`
  box-sizing: border-box;
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
  overflow: auto;
  background: rgba(0, 0, 0, 0.5);
  z-index: 4;
`;

const Content = styled.div`
  position: relative;
  height: auto;
  width: auto;
  background: rgb(${ColorPicker("layout")});
  box-shadow: 0px 5px 10px 2px rgba(${ColorPicker("layout")}, 0.5);
  border-radius: 30px;
  padding: 1rem;
  margin: 0rem 1rem;
`;

const CloseButton = styled(Button)`
  position: absolute;
  top: 1em;
  right: 1em;
`;
