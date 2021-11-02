import { createElement } from "react";

import TextField from "@mui/material/TextField";

import useStyles from "./styles";

function ChatComponent() {
  const classes = useStyles();

  return createElement(TextField, {
    fullWidth: true,
    className: classes.textField,
  });
}

export default ChatComponent;
