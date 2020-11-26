import { RiLockPasswordLine, RiMailLine, RiUserLine } from "react-icons/ri";
import styled from "styled-components";

import FingerPrint from "../image/finger_print.svg";

import { Button, Input, Checkbox } from "../main";

export const SignUp = () => {
  return (
    <Container>
      <Image src={FingerPrint} />
      <Form>
        <Title>Sign In</Title>
        <Input icon={<RiMailLine />} placeholder="Email" />
        <Input
          type="password"
          icon={<RiLockPasswordLine />}
          placeholder="Password"
        />
        <ForgotPassword>
          <p>Did you forget your password ?</p>
        </ForgotPassword>
        <Button color="primary" block>
          Sign In
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

const ForgotPassword = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  p {
    font-size: 0.9em;
    cursor: pointer;
    :hover {
      transition: all;
      color: rgba(255, 255, 255, 0.7);
    }
  }
`;
