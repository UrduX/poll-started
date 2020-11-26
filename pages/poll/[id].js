import { motion } from "framer-motion";
import styled from "styled-components";
import useAPI from "../../hooks/useAPI";
import Vote from "../../components/poll/Vote";
import { SocketProvider } from "../../contexts/Socket";
import { PollProvider } from "../../contexts/Poll";
import Head from "next/head";
export async function getServerSideProps(context) {
  const API = useAPI();
  const id = context.query.id;
  const { data } = await API.get(`poll/${id}`);
  return {
    props: { poll: data ? data : null },
  };
}

export default function FilterById({ poll }) {
  if (!poll) return <div>not found</div>;
  return (
    <PollProvider>
      <Head>
        <title>{poll.title}</title>
      </Head>
      <SocketProvider>
        <Container>
          <Vote poll={poll} />
        </Container>
      </SocketProvider>
    </PollProvider>
  );
}

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
