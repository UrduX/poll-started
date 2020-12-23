import styled from "styled-components";
import { ColorPicker } from "../../theme";

const Footer = () => {
  return (
    <Container>
      <div>
        <p>Copyright © 2020 Poll Started</p>
      </div>
      <div>
        <p>
          Created by{" "}
          <a href="https://github.com/UrduX?tab=repositories">Eren Balcı</a>
        </p>
      </div>
    </Container>
  );
};

export default Footer;

const Container = styled.footer`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem;
  font-size: 0.9em;
  color: rgba(255, 255, 255, 0.9);

  a {
    color: white;
    text-decoration: none;
    transition: all 0.3s ease;
    :hover {
      color: rgb(${ColorPicker("primary")});
    }
  }
`;
