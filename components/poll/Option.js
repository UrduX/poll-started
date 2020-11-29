import { useEffect, useLayoutEffect, useState } from "react";
import { RiCloseLine, RiEditLine } from "react-icons/ri";
import styled from "styled-components";
import { ColorPicker } from "../../theme";
import { Button } from "../main";
import Modal from "./Modal";
import EditOption from "./EditOption";
import { usePollStore } from "../../contexts/Poll";
import { AnimatePresence, motion } from "framer-motion";
const Option = ({ id, text }) => {
  const [show, setShow] = useState(false);

  const [poll, { deleteOption }] = usePollStore();

  const [textChanged, setTextChanged] = useState(false);
  useLayoutEffect(() => {
    return () => {
      setTextChanged(true);
      setTimeout(() => {
        setTextChanged(false);
      }, 500);
    };
  }, [text]);
  return (
    <Container
      initial={{ opacity: 0.5, translateX: -800 }}
      animate={{ opacity: 1, translateX: 0 }}
      exit={{
        opacity: 0,
        scale: 0,
        transition: { duration: 0.5 },
      }}
    >
      <Text>
        <motion.p
          initial={{ scale: 1, opacity: 1, transition: { duration: 2 } }}
          animate={
            textChanged
              ? {
                  scale: 1.05,
                  filter: "contrast(200%)",
                }
              : { scale: 1, opacity: 1, transition: { duration: 2 } }
          }
        >
          {text}
        </motion.p>
      </Text>
      <ButtonGroup>
        <Button
          onClick={() => setShow((value) => !value)}
          circle
          color="primary"
          icon={<RiEditLine />}
        />
        <Button
          onClick={() => deleteOption(id)}
          circle
          color="danger"
          icon={<RiCloseLine />}
        />
      </ButtonGroup>
      <Modal show={show} setShow={setShow}>
        <EditOption id={id} text={text} setShow={setShow} />
      </Modal>
    </Container>
  );
};

export default Option;

const Container = styled(motion.div)`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem;
  margin: 0.2rem;
  border-radius: 15px;
  column-gap: 0.5rem;
  background-color: rgb(${ColorPicker("element")});
`;
const Text = styled.div`
  position: relative;
  p {
    word-break: break-all;
  }
`;

const ButtonGroup = styled.div`
  position: relative;
  display: flex;
  column-gap: 0.5rem;
`;
