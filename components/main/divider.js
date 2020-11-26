import styled from "styled-components";
import { ColorPicker } from "../../theme";

const Divider = styled.div`
  display: block;
  height: 2px;
  background-color: rgb(
    ${({ color }) => (color ? ColorPicker(color) : ColorPicker("element"))}
  );
`;

export default Divider;
