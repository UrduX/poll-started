import styled from "styled-components";

import Link from "next/link";

import { Button } from "../main";

const Guest = () => {
  return (
    <Container>
      <Logo>
        <Link href="/" passHref>
          <h2>VPoLLte</h2>
        </Link>
      </Logo>
      <ButtonGroup>
        <Link href="/signup" passHref>
          <Button transparent size="md">
            Sign Up
          </Button>
        </Link>
        <Link href="/signin" passHref>
          <Button transparent size="md">
            Sign In
          </Button>
        </Link>
      </ButtonGroup>
    </Container>
  );
};

const User = () => {
  return (
    <Container>
      <Logo>
        <Link href="/" passHref>
          <h2>vPoLLte</h2>
        </Link>
      </Logo>
    </Container>
  );
};

const Navbar = () => {
  const isLogin = false;
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

const ButtonGroup = styled.div`
  display: flex;
  align-items: center;
  align-content: center;
  justify-content: center;
  column-gap: 0.5rem;
`;
