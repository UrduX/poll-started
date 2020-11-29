import React from "react";

import { createGlobalStyle, ThemeProvider } from "styled-components";
import dynamic from "next/dynamic";

const theme = {
  colors: {
    layout: "36,37,38",
    background: "24,25,28",
    element: "58, 59, 60",
    primary: "26,92,255",
    // #1a5cff
    success: "23,201,100",
    danger: "255,71,87",
    warning: "255,186,0",
  },
};

const GlobalStyle = createGlobalStyle`

*{
    margin:0px;
    padding:0px;
    box-sizing:border-box;
}
}
html body{
    font-family: 'Poppins', sans-serif;
    background-color:rgb(${theme.colors.background});
    color:#ffffff;
    display:grid;
     overflow:visible;
     p{
      font-family: 'Poppins', sans-serif;
 }
}
::-webkit-scrollbar {
  width: 10px;
  height: 10px;

}
::-webkit-scrollbar-button {
  width: 0px;
  height: 0px;
}
::-webkit-scrollbar-thumb {
  background: rgb(${theme.colors.layout});
  border: 0px none #ffffff;
  border-radius: 50px;
}
::-webkit-scrollbar-thumb:hover {
  transition:all 0.3s ease;
  background: rgb(${theme.colors.element});
}
::-webkit-scrollbar-thumb:active {
    background: rgb(${theme.colors.element});
}
::-webkit-scrollbar-track {
  transition:all 0.3s ease;
  background: rgb(${theme.colors.background});
  border: 0px none #ffffff;
  border-radius: 50px;
}
::-webkit-scrollbar-corner {
  background: transparent;
}

.search-box-enter {
  height:0px;
}
.search-box-enter-active {
  height:300px;
  transition: all 300ms;
}
.search-box-exit {
  height:300px;
}
.search-box-exit-active {
  height:0px;
  transition: all 300ms;
}

.modal-overlay-enter {
  opacity: 0;
}
.modal-overlay-enter-active {
  opacity: 1;
  transition: opacity 300ms;
}
.modal-overlay-exit {
  opacity: 1;
}
.modal-overlay-exit-active {
  opacity: 0;
  transition: opacity 300ms;
}

.modal-content-enter {
  transform:scale(0) !important;
   }
.modal-content-enter-active {
transform:scale(1);
 transition: transform 400ms;
}
.modal-content-exit {
  transform:scale(1);
}
.modal-content-exit-active {
  transform:scale(0);
  transition: transform 400ms;
}

.drawer-right-enter {
  transform:translateX(300px) ;
   }
.drawer-right-enter-active {
transform:translateX(0px) ;
 transition: all 300ms ease;
}
.drawer-right-exit {
  transform:translateX(0px) ;
}
.drawer-right-exit-active {
transform:translateX(300px) ;;
  transition: all 300ms ease-out;
}

.divider-left-enter {
  transform:translateX(0px) ;
   }
.divider-left-enter-active {
transform:translateX(0px) ;
 transition: all 300ms ease;
}
.divider-left-exit {
  transform:translateX(0px) ;
}
.divider-left-exit-active {
  transform:translateX(0px) ;
  transition: all 300ms ease-out;
}

.Toastify__toast {
  border-radius:15px;
  color:#ffffff;
   font-family: 'Poppins', sans-serif;
   font-size:14px;
}
.Toastify__toast--rtl {
}
.Toastify__toast--dark {
}
.Toastify__toast--default {
    background:rgb(${theme.colors.element});
}
.Toastify__toast--info {
    background:rgb(${theme.colors.primary});
}
.Toastify__toast--success {
    background:rgb(${theme.colors.success});
}
.Toastify__toast--warning {
    background:rgb(${theme.colors.warning});
}
.Toastify__toast--error {
    background:rgb(${theme.colors.danger});
}
.Toastify__toast-body {
}

`;

export const ColorPicker = (color) => {
  const index = Object.keys(theme.colors).find((value) => value === color);
  return theme.colors[index];
};

export const GlobalThemeProvider = ({ children }) => {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      {children}
    </ThemeProvider>
  );
};
