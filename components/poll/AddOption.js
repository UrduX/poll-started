import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import styled from "styled-components";
import { uid } from "uid";
import { usePollStore } from "../../contexts/Poll";
import { ColorPicker } from "../../theme";
import { Button, Input } from "../main";

const AddOption = () => {
  const { register, handleSubmit, errors, reset } = useForm();

  const [poll, { addOption }] = usePollStore();

  const isUniqueOption = ({ text }) => {
    return !poll.options.find(
      (value) => value.text.trim().toLowerCase() == text.trim().toLowerCase()
    );
  };

  const addOptionSubmit = ({ option }) => {
    addOption({ id: uid(), text: option });
    toast.success("Option added", { autoClose: 1500 });
    reset();
  };

  return (
    <Container onSubmit={handleSubmit(addOptionSubmit)}>
      <Top>
        <Title>Add Option</Title>
      </Top>
      <Content>
        <Input
          name="option"
          ref={register({
            required: "Required",
            maxLength: { value: 50, message: "Your input exceed maxLength" },
            validate: (value) =>
              isUniqueOption({ text: value })
                ? null
                : "Option must be unique !",
          })}
        />
      </Content>
      <Bottom>
        <div>
          {errors.option && <ErrorText>{errors.option.message}</ErrorText>}
        </div>
        <ButtonGroup>
          <Button color="success">Add</Button>
        </ButtonGroup>
      </Bottom>
    </Container>
  );
};

export default AddOption;

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
