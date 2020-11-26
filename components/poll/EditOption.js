import { useForm } from "react-hook-form";
import styled from "styled-components";
import { usePollStore } from "../../contexts/Poll";
import { ColorPicker } from "../../theme";
import { Button, Input } from "../main";

const EditOption = (props) => {
  const { register, errors, handleSubmit } = useForm();
  const { id, text, setShow } = props;
  const [poll, { setOptionText }] = usePollStore();

  const isUniqueOption = (optionValue) => {
    return !poll.options.find(
      (value) =>
        value.text.toLowerCase().trim() == optionValue.toLowerCase().trim()
    );
  };
  const editOptionSubmit = ({ option }) => {
    setOptionText(id, option);
    setShow(false);
  };

  return (
    <Container onSubmit={handleSubmit(editOptionSubmit)}>
      <Top>
        <Title>Edit Option</Title>
      </Top>
      <Content>
        <Input
          defaultValue={text}
          name="option"
          ref={register({
            required: "Required",
            validate: (value) =>
              isUniqueOption(value) ? null : "Option must be unique !",
          })}
        />
      </Content>
      <Bottom>
        <ErrorText>{errors.option && errors.option.message}</ErrorText>
        <ButtonGroup>
          <Button color="success">Edit</Button>
        </ButtonGroup>
      </Bottom>
    </Container>
  );
};

export default EditOption;

const Container = styled.form`
  position: relative;
  display: flex;
  flex-direction: column;
  row-gap: 1rem;
  padding: 1rem;
  height: auto;
  width: 25rem;
  background-color: rgb(${ColorPicker("layout")});
  border-radius: 30px;
  box-shadow: 0px 5px 10px 2px rgba(${ColorPicker("layout")}, 0.5);
`;

const ErrorText = styled.p`
  color: rgb(${ColorPicker("danger")});
  font-size: 0.8em;
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
