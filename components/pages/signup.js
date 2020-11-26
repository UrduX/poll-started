import { RiLockPasswordLine, RiMailLine, RiUserLine } from "react-icons/ri";
import styled from "styled-components";

import Profiling from "../image/profiling.svg";

import { Button, Input, Checkbox } from "../main";
import { createRef } from "react";

export const SignUp = () => {
  const checkboxRef = createRef();

  return (
    <Container>
      <Image src={Profiling} />
      <Form>
        <Title>Sign Up</Title>
        <Input icon={<RiUserLine />} placeholder="Nickname" />
        <Input icon={<RiMailLine />} placeholder="Email" />
        <Input
          type="password"
          icon={<RiLockPasswordLine />}
          placeholder="Password"
        />
        <Input
          type="password"
          icon={<RiLockPasswordLine />}
          placeholder="Password Repeat"
        />
        <RulesContainer>
          <Checkbox ref={checkboxRef} color="primary" label="Confirm Rules" />
        </RulesContainer>
        <Button color="primary" block>
          Sign Up
        </Button>
      </Form>
    </Container>
  );
};

export default SignUp;

const Container = styled.div`
  position: relative;
  display: grid;
  grid-template-columns: 60vw 30vw;
  grid-column-gap: 5vw;
`;

const Image = styled.img`
  height: 100%;
  width: 100%;
`;

const Form = styled.form`
  position: relative;
  display: flex;
  flex-direction: column;
  row-gap: 1rem;
  justify-content: center;
`;

const Title = styled.p`
  font-size: 1.5em;
`;

const RulesContainer = styled.div`
  margin: 0px 5px;
`;
