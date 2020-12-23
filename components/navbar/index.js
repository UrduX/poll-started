import styled from "styled-components";

import Link from "next/link";

import { Button } from "../main";

const User = () => {
  return (
    <Container>
      <Logo>
        <Link href="/" passHref>
          <h1>Poll Started</h1>
        </Link>
      </Logo>
    </Container>
  );
};

const Navbar = () => {
  return <User />;
};

export default Navbar;

const Container = styled.div`
  position: relative;
  display: flex;
  align-content: center;
  align-items: center;
  justify-content: space-between;
  padding: 1em;
`;
const Logo = styled.div`
  cursor: pointer;
`;
