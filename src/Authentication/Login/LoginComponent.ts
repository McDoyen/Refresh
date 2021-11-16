import { ChangeEvent, createElement, useState } from "react";

import { Button, TextField } from "@mui/material";

import useStyles from "./styles";
import { login } from "../Utils";
import axios from "axios";

interface ChangeProps {
  target: {
    name: string;
    value: string;
  };
  preventDefault: () => void;
}

export default function LoginComponent(props: any) {
  const classes = useStyles();
  const [registering, setRegistering] = useState(false);
  const [data, setData] = useState({
    userName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (event: ChangeProps) => {
    event.preventDefault();
    const { name, value } = event.target;
    console.log(data);
    setData({ ...data, [name]: value });
  };

  const handleSignup = () => {
    if (registering) {
      axios
        .post("http://localhost:8081/signup", {
          data,
        })
        .then((response) => console.log(response))
        .catch((error) => console.log(error));
      setRegistering(false);
    } else {
      setRegistering(true);
    }
  };

  const handleSubmit = (event: ChangeEvent) => {
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
      createElement(TextField, {
        label: "Username",
        name: "userName",
        value: data.userName,
        onChange: handleChange,
        sx: { paddingBottom: "20px" },
      }),
      registering
        ? createElement(TextField, {
            label: "Email",
            name: "email",
            value: data.email,
            onChange: handleChange,
            sx: { paddingBottom: "20px" },
          })
        : null,
      createElement(TextField, {
        label: "Password",
        name: "password",
        type: "password",
        value: data.password,
        onChange: handleChange,
        sx: { paddingBottom: "20px" },
      }),
      registering
        ? createElement(TextField, {
            label: "Confirm Password",
            name: "confirmPassword",
            type: "password",
            value: data.confirmPassword,
            onChange: handleChange,
            sx: { paddingBottom: "20px" },
          })
        : null,
      createElement(
        "div",
        {},
        createElement(Button, { type: "submit" }, "Login"),
        createElement(Button, { onClick: handleSignup }, "Sign up")
      )
    )
  );
}
