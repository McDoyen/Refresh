import { createElement, useState } from "react";

import { userName } from "../Authentication/Utils";
import ChatComponent from "./ChatComponent";

interface SyntheticBaseEvent {
  target: { value: string }[];
  preventDefault: () => void;
}

function ChatContainer() {
  const defaultChat = { data: "", time: "", orientation: "right" as const };
  const [chats, updateChats] = useState([defaultChat]);
  const [messageValue, setMessageValue] = useState("");

  const handleChange = (event: any) => {
    setMessageValue(event.target.value);
  };
  const handleSubmit = (event: SyntheticBaseEvent) => {
    event.preventDefault();
    let data = event.target[0].value;
    if (data) {
      const newData = {
        data,
        time: new Date().toLocaleTimeString(),
        orientation: "right" as const,
      };
      setMessageValue("");
      updateChats((chats) => [...chats, newData]);
    }
  };

  return createElement(ChatComponent, {
    userName: userName(),
    chats,
    messageValue,
    handleChange,
    handleSubmit,
  });
}

export default ChatContainer;
