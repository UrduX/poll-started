import { useState } from "react";
import styled from "styled-components";
import { ColorPicker } from "../../theme";
import { Button, Checkbox, Divider, Input } from "../main";
import Modal from "./Modal";
import Option from "./Option";
import AddOption from "./AddOption";
import { usePollStore } from "../../contexts/Poll";
import { useForm } from "react-hook-form";
import { AnimatePresence, AnimateSharedLayout, motion } from "framer-motion";

const CreatePollScreen = () => {
  const [show, setShow] = useState(false);

  const { register, errors, handleSubmit } = useForm();

  const [poll, { setTitle, createPoll }] = usePollStore();

  const createPollSubmit = () => {
    createPoll();
  };

  return (
    <>
      <Container>
        <Top>
          <Title>Create Poll</Title>
        </Top>
        <Content onSubmit={(e) => e.preventDefault()}>
          <Input
            name="title"
            placeholder="Poll Title"
            onChange={({ currentTarget }) => setTitle(currentTarget.value)}
            ref={register({
              required: "Title is required",
              maxLength: { value: 100, message: "Your input exceed maxLength" },
            })}
          />
          <ErrorText>{errors.title && errors.title.message}</ErrorText>
          <Divider />
          <OptionList>
            <AnimatePresence>
              {poll.options.length > 0 &&
                poll.options.map(({ id, text }) => (
                  <Option key={id} id={id} text={text} />
                ))}
            </AnimatePresence>
          </OptionList>
        </Content>
        <Bottom>
          <div></div>
          <ButtonGroup>
            <Button
              type="button"
              onClick={() => setShow((value) => !value)}
              color="primary"
            >
              Add Option
            </Button>

            <Button
              onClick={handleSubmit(createPollSubmit)}
              type="submit"
              color="success"
            >
              Create Poll
            </Button>
          </ButtonGroup>
        </Bottom>
      </Container>
      <Modal show={show} setShow={setShow}>
        <AddOption />
      </Modal>
    </>
  );
};

export default CreatePollScreen;

const Container = styled(motion.div)`
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
const Top = styled.div``;
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

// const EmptyOptions = styled.p``;
