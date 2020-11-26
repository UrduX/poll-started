import styled from "styled-components";

import CreatePollScreen from "../../components/poll/CreatePollScreen";

import { PollProvider } from "../../contexts/Poll";
import Head from "next/head";
const Vote = () => {
  return (
    <PollProvider>
      <Head>
        <title>Create Poll</title>
      </Head>
      <Container>
        <CreatePollScreen />
      </Container>
    </PollProvider>
  );
};

export default Vote;

const Container = styled.div`
  position: relative;
  display: grid;
  align-content: center;
  justify-content: center;
  grid-template-columns: minmax(40vw, 40vw);
  grid-template-rows: auto;
  padding: 2.5rem;
  @media (max-width: 1035px) {
    grid-template-columns: 60vw;
  }
  @media (max-width: 720px) {
    grid-template-columns: 80vw;
  }
  @media (max-width: 520px) {
    grid-template-columns: 100%;
  }
`;
