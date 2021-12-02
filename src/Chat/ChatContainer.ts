import axios from "axios";
import { createElement, useEffect, useState } from "react";

import { userName } from "../Authentication/Utils";
import ChatComponent from "./ChatComponent";
import Cookies from "js-cookie";

interface SyntheticBaseEvent {
  target: { value: string }[];
  preventDefault: () => void;
}

function ChatContainer() {
  const [chats, updateChats] = useState([]);
  const [messageValue, setMessageValue] = useState("");
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    axios
      .get("http://localhost:8081/retrieveMessages")
      .then((response) => {
        updateChats(response.data);
        setFetching(false);
      })
      .catch((error) => console.error(error));
  });

  const handleChange = (event: any) => {
    setMessageValue(event.target.value);
  };

  const handleSubmit = (event: SyntheticBaseEvent) => {
    event.preventDefault();
    let data = event.target[0].value;
    if (data) {
      const newChat = {
        userID: Cookies.get("userID"),
        data,
        time: new Date().toLocaleTimeString(),
        orientation: "right" as const,
      };
      updateChats((oldChats): any => [...oldChats, newChat]);

      axios
        .post("http://localhost:8081/addMessage", { newChat })
        .catch((error) => console.error(error));

      setMessageValue("");
    }
  };

  return fetching
    ? createElement("p", {}, "Skeleton")
    : createElement(ChatComponent, {
        userName: userName(),
        chats,
        messageValue,
        handleChange,
        handleSubmit,
      });
}

export default ChatContainer;
