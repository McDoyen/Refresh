import { createElement } from "react";

import { Button, TextField } from "@mui/material";

import useStyles from "./styles";
import { login } from "../Utils";

export default function LoginComponent(props: any) {
  const classes = useStyles();
  const handleSubmit = (event: any) => {
    event.preventDefault();
    login();
    props.history.push("/chat");
  };
  return createElement(
    "div",
    { className: classes.container },
    createElement(
      "form",
      { className: classes.form, onSubmit: handleSubmit },
      createElement(TextField, { label: "Username" }),
      createElement(TextField, { label: "Password" }),
      createElement(
        "div",
        {},
        createElement(Button, { type: "submit" }, "Login")
      )
    )
  );
}
