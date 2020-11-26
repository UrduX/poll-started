import { motion } from "framer-motion";
import styled from "styled-components";
import { Button, Radio } from "../main";
import { ColorPicker } from "../../theme";
import useAPI from "../../hooks/useAPI";
import { useState } from "react";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import { Pie } from "react-chartjs-2";
import { usePollStore } from "../../contexts/Poll";
export default function Chart({ poll }) {
  const reVote = ({ pollID, optionID }) => {
    if (!pollID) return;
    if (!optionID) {
      return toast.info("Select one option for voting", { autoClose: 1500 });
    }
    API.post("poll/vote", { pollID, optionID })
      .then(() => toast.success("Voted"))
      .catch(() => toast.error("not Voted"));
  };
  const [options, setOptions] = useState(poll.options);

  if (!poll) return <div>not found</div>;
  return (
    <Container>
      <Card>
        <Top>
          <Title>Chart Title</Title>
        </Top>
        <Content></Content>
      </Card>
    </Container>
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

const Card = styled(motion.div)`
  position: relative;
  display: flex;
  flex-direction: column;
  row-gap: 1.5rem;
  background: rgb(${ColorPicker("layout")});
  box-shadow: 0px 5px 10px 2px rgba(${ColorPicker("layout")}, 0.5);
  border-radius: 30px;
  padding: 1rem;
  max-height: 30rem;
`;
const Top = styled.div`
  padding: 0.5rem;
`;
const Title = styled.p`
  font-size: 1.4em;
`;
const Content = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  row-gap: 1rem;
`;
const OptionList = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  overflow-x: hidden;
  max-height: 10rem;
  row-gap: 1rem;
  ::-webkit-scrollbar-thumb {
    background: rgb(${ColorPicker("element")});
    border: 0px none #ffffff;
    border-radius: 50px;
  }
`;
const Bottom = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  margin: 0.1rem;
`;
const ButtonGroup = styled.div`
  position: relative;
  display: flex;
  column-gap: 0.5rem;
`;
const ErrorText = styled.p`
  color: rgb(${ColorPicker("danger")});
  font-size: 0.8em;
`;
