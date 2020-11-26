import { motion } from "framer-motion";
import styled from "styled-components";
import { Button, Radio, Divider } from "../main";
import { ColorPicker } from "../../theme";
import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import cookie from "js-cookie";
import { useSocket } from "../../contexts/Socket";
import dynamic from "next/dynamic";
import { Pie } from "react-chartjs-2";
import jwt from "jsonwebtoken";
import { useAuth } from "../../contexts/Auth";
import { RiFileCopyLine, RiGroupLine } from "react-icons/ri";
import ReactCopyToClipboard from "react-copy-to-clipboard";

export const Vote = ({ poll }) => {
  const router = useRouter();
  const socket = useSocket();
  const [checkAuthAgain] = useAuth();

  const [options, setOptions] = useState(poll.options);
  const [selectedOption, setSelectedOption] = useState({ _id: "", text: " " });
  const [showResults, setShowResults] = useState(false);

  const createVote = useCallback(async () => {
    if (!selectedOption.text) return;
    await checkAuthAgain();
    socket.emit("vote", {
      pollID: router.query.id,
      optionID: selectedOption._id,
    });
    toast.info(`you voted ${selectedOption.text}`, {
      autoClose: 950,
    });
  });

  useEffect(async () => {
    socket.on("connect", () => {
      socket.emit("joinPoll", router.query.id);
    });
    socket.on("vote", ({ options: sentOptions }) => {
      setOptions(sentOptions);
    });
  }, []);
  useEffect(async () => {
    const { ip: userIP } = await jwt.verify(
      cookie.get("token"),
      process.env.SECRET_KEY
    );
    const defaultVote = options.map(({ voters }) =>
      voters.find(({ ip }) => ip == userIP)
    );
    for (let i = 0; i < defaultVote.length; i++) {
      if (defaultVote[i] && defaultVote[i].ip == userIP) {
        setSelectedOption({ _id: defaultVote[i].voted_option_id });
      }
    }
  }, [options]);

  return (
    <Container>
      <Card>
        <Top>
          <Title>{poll.title}</Title>
          <ReactCopyToClipboard
            onCopy={() => toast.info("Poll's url copied.", { autoClose: 1000 })}
            text={process.env.WEB_URL + router.asPath}
          >
            <Button
              icon={<RiFileCopyLine size={20} />}
              color="primary"
              circle
            />
          </ReactCopyToClipboard>
        </Top>
        <Content>
          {showResults ? (
            <Pie
              data={{
                labels: options.map(({ text }) => text),
                datasets: [
                  {
                    label: "# of Votes",
                    data: options.map((option) => option.voters.length),
                    backgroundColor: [
                      "#ff0000",
                      "#00ff00",
                      "#ffff00",
                      "#0000ff",
                      "#ff00ff",
                      "#00ffff",
                      "#ffffff",
                    ],
                    // backgroundColor: options.map(
                    //   () =>
                    //  `#${Math.floor(Math.random() * 16777215).toString(16)}`
                    // ),
                    borderWidth: 2,
                  },
                ],
              }}
            />
          ) : (
            options.map(({ _id, text, voters }, index) => (
              <OptionCard key={index}>
                <Radio
                  name="option"
                  checked={_id === selectedOption._id ? true : false}
                  label={text}
                  onChange={() => setSelectedOption({ _id, text })}
                  value={text}
                  color="primary"
                />
                <OptionVoters>
                  <RiGroupLine size={16} />
                  <OptionVotersLength>{voters.length}</OptionVotersLength>
                </OptionVoters>
              </OptionCard>
            ))
          )}
          <Divider />
          <Bottom>
            <ErrorText></ErrorText>
            <ButtonGroup>
              <Button onClick={() => setShowResults((v) => !v)} color="primary">
                {showResults ? "Back" : "Chart"}
              </Button>
              {!showResults && (
                <Button onClick={createVote} color="success">
                  Vote
                </Button>
              )}
            </ButtonGroup>
          </Bottom>
        </Content>
      </Card>
    </Container>
  );
};
export default dynamic(async () => await Vote);
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
`;
const Top = styled.div`
  display: flex;
  justify-content: space-between;
  column-gap: 1rem;
  align-items: center;
  padding: 1rem;
`;
const Title = styled.p`
  word-break: break-all;
  font-size: 1.4em;
`;
const Content = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  row-gap: 1rem;
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
const OptionCard = styled(motion.div)`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem;
  margin: 0.2rem;
  border-radius: 15px;
  background-color: rgb(${ColorPicker("element")});
  word-break: break-all;
`;
const OptionVoters = styled.div`
  position: relative;
  display: flex;
  column-gap: 0.2rem;
  padding: 0rem 1rem;
`;
const OptionVotersLength = styled.div`
  position: relative;
  word-break: break-all;
  p {
    word-break: break-all;
  }
`;
