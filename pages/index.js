import { Button, Input } from "../components/main";
import styled from "styled-components";
import { motion } from "framer-motion";
import { ColorPicker } from "../theme";
import Link from "next/link";
import Image from "next/image";
import Head from "next/head";
import { useRouter } from "next/router";
export default function Home() {
  const router = useRouter();
  return (
    <Container>
      <Head>
        <title>Home</title>
      </Head>
      <FirstSection>
        <TextSection>
          <Content>
            <Title>The place to create instant, real-time polls for free</Title>
          </Content>

          <LetsStart
            onClick={() => router.push("/poll")}
            border
            color="primary"
          >
            <p>Let's Start</p>
          </LetsStart>
        </TextSection>
        <Image src="/images/voting.svg" width={300} height={300} />
      </FirstSection>
      <SecondSection>
        <Card>
          <Image src="/images/user_group.svg" width={250} height={250} />
          <Content>Share poll's url with others.</Content>
        </Card>
        <Card>
          <Image
            src="/images/report_presentation_monochromatic.svg"
            width={250}
            height={250}
          />
          <Content>You can see votes exhaustive via data tables.</Content>
        </Card>
        <Card>
          <Image
            src="/images/security_monochromatic.svg"
            width={250}
            height={250}
          />
          <Content>Votes send via unique ip addresses.</Content>
        </Card>
      </SecondSection>
    </Container>
  );
}

const Container = styled.div`
  position: relative;
  display: grid;
  grid-template-rows: repeat(2, minmax(90vh, auto));
  grid-row-gap: 10vh;
`;

const FirstSection = styled.div`
  position: relative;
  display: grid;
  justify-content: center;
  grid-template-columns: 40vw 40vw;
  grid-column-gap: 10vw;

  @media (max-width: 720px) {
    grid-row-gap: 0vh;
    grid-template-columns: 1fr;
  }
`;

const SecondSection = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  column-gap: 2rem;
  row-gap: 2rem;
  flex-wrap: wrap;
`;

const TextSection = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-content: flex-start;
  justify-content: center;
  padding: 2rem;
  row-gap: 0.5rem;
`;

const Title = styled.p`
  font-size: 3em;
`;

const Content = styled.div`
  font-size: 1.1em;
`;

const Card = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  row-gap: 1.5rem;
  background: rgb(${ColorPicker("layout")});
  box-shadow: 0px 5px 10px 2px rgba(${ColorPicker("layout")}, 0.5);
  border-radius: 30px;
  padding: 1rem;
  height: 25rem;
  width: 25rem;
`;

const LetsStart = styled(Button)`
  font-size: 1.25em;

  p {
    ::selection {
      background: transparent;
    }
  }
`;
