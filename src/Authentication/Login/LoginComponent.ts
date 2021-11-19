import { ChangeEvent, createElement, useState } from "react";

import { Button, TextField } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router";

import useStyles from "./styles";

interface ChangeProps {
  target: {
    name: string;
    value: string;
  };
  preventDefault: () => void;
}

export default function LoginComponent(props: any) {
  let navigate = useNavigate();
  const classes = useStyles();
  const [errorMessage, setErrorMessage] = useState("");
  const [signupError, setSignupError] = useState("");
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
    setData({ ...data, [name]: value });
    setErrorMessage("");
    setSignupError("");
  };

  const handleSignup = () => {
    const filled = Object.values(data).every((value) => value.length > 0);
    if (registering && filled) {
      axios
        .post("http://localhost:8081/signup", {
          data,
        })
        .then((response) => console.log(response))
        .catch((error) => console.log(error));
      setRegistering(false);
    } else if (registering && !filled) {
      setSignupError("Please fill all requires fields");
    } else {
      setRegistering(true);
    }
  };

  const handleLogin = (event: ChangeEvent) => {
    event.preventDefault();
    axios
      .post("http://localhost:8081/login", {
        data,
      })
      .then((response) => {
        const { accessToken, message } = response.data;
        if (accessToken) {
          localStorage.setItem("userData", JSON.stringify(response.data));
          navigate("/chat");
        } else {
          setErrorMessage(message);
        }
      })
      .catch((error) => console.log(`Error: ${error}`));
  };
  return createElement(
    "div",
    { className: classes.container },
    createElement(
      "form",
      { className: classes.form, onSubmit: handleLogin },
      createElement(TextField, {
        required: true,
        label: "Username",
        name: "userName",
        value: data.userName,
        onChange: handleChange,
        sx: { paddingBottom: "20px" },
      }),
      registering
        ? createElement(TextField, {
            required: true,
            label: "Email",
            name: "email",
            type: "email",
            value: data.email,
            onChange: handleChange,
            sx: { paddingBottom: "20px" },
          })
        : null,
      createElement(TextField, {
        required: true,
        helperText: errorMessage,
        label: "Password",
        name: "password",
        type: "password",
        value: data.password,
        onChange: handleChange,
        sx: { paddingBottom: "20px" },
      }),
      registering
        ? createElement(TextField, {
            helperText: signupError,
            required: true,
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
        registering
          ? null
          : createElement(
              Button,
              {
                type: "submit",
                variant: "contained",
                style: { marginRight: "20px" },
              },
              "Login"
            ),
        createElement(
          Button,
          { onClick: handleSignup, variant: "contained" },
          "Sign up"
        )
      )
    )
  );
}
