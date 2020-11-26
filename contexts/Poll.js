import { createContext, useContext, useMemo, useState } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import useApi from "../hooks/useAPI";

const PollContext = createContext();

export const PollProvider = ({ children }) => {
  const router = useRouter();
  const API = useApi();
  const [poll, setPoll] = useState({
    title: "",
    options: [],
    type: "private",
  });

  const addOption = (option) => {
    setPoll((value) => ({
      ...value,
      options: [...value.options, option],
    }));
  };
  const setTitle = (text) => setPoll((value) => ({ ...value, title: text }));

  const setOptionText = (id, text) => {
    const index = poll.options.findIndex((value) => value.id == id);
    let editedOption = [...poll.options];
    editedOption[index] = { ...editedOption[index], id, text };
    setPoll((value) => ({
      ...value,
      options: editedOption,
    }));
  };

  const deleteOption = (id) => {
    setPoll((value) => ({
      ...value,
      options: [...value.options.filter((value) => value.id != id)],
    }));
  };

  const createPoll = () => {
    if (poll.options.length == 0) {
      return toast.error("Option must be  ", { autoClose: 1300 });
    }
    if (poll.options.length < 2)
      return toast.error("Option must be more than one   ", {
        autoClose: 1300,
      });
    if (poll.title.trim() == "") {
      toast.error("Title is required !  ", {
        autoClose: 1300,
      });
      return;
    }

    API.post("poll/create", { poll })
      .then(({ data }) => {
        toast.success("created poll", {
          autoClose: 1100,
          onClose() {
            router.push(`/poll/${data._id}`);
          },
        });
      })
      .catch(() => toast.error("poll couldn't create", { autoClose: 1300 }));
  };

  const votePoll = ({ pollID, optionID }) => {
    if (!pollID) return;
    if (!optionID) {
      return toast.info("Select one option for voting", { autoClose: 1300 });
    }

    API.post("poll/vote", { pollID, optionID })
      .then(() => toast.success("Voted"))
      .catch(() => toast.error("not Voted"));
  };

  const providerValues = useMemo(
    () => [
      poll,
      {
        createPoll,
        addOption,
        setTitle,
        setOptionText,
        deleteOption,
        votePoll,
      },
    ],
    [
      poll,
      createPoll,
      addOption,
      setTitle,
      setOptionText,
      deleteOption,
      votePoll,
    ]
  );

  return (
    <PollContext.Provider value={providerValues}>
      {children}
    </PollContext.Provider>
  );
};

export const usePollStore = () => useContext(PollContext);
