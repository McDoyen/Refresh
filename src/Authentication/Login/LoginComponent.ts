import { createElement, Fragment } from "react";

import { Button, TextField } from "@mui/material";

import useStyles from "./styles";

export default function LoginComponent(props: any) {
  const classes = useStyles();

  return createElement(
    "div",
    { className: classes.container },
    createElement(
      "form",
      {
        className: classes.form,
        onSubmit: props.handleLogin,
      },
      createElement(TextField, {
        required: true,
        label: "Username",
        name: "userName",
        value: props.data.userName,
        onChange: props.handleChange,
        sx: { paddingBottom: "20px" },
      }),
      props.registering
        ? createElement(TextField, {
            required: true,
            label: "Email",
            name: "email",
            type: "email",
            value: props.data.email,
            onChange: props.handleChange,
            sx: { paddingBottom: "20px" },
          })
        : null,
      createElement(TextField, {
        required: true,
        helperText: props.errorMessage,
        label: "Password",
        name: "password",
        type: "password",
        value: props.data.password,
        onChange: props.handleChange,
        sx: { paddingBottom: "20px" },
      }),
      props.registering
        ? createElement(
            Fragment,
            {},
            createElement(TextField, {
              helperText: props.signupError,
              required: true,
              label: "Confirm Password",
              name: "confirmPassword",
              type: "password",
              value: props.data.confirmPassword,
              onChange: props.handleChange,
              sx: { paddingBottom: "20px" },
            }),
            createElement(
              "label",
              { htmlFor: "upload-button" },
              createElement("input", {
                accept: "image/*",
                id: "upload-button",
                type: "file",
                style: { display: "none" },
                onChange: props.handleChange,
              }),
              createElement(
                Button,
                {
                  fullWidth: true,
                  variant: "outlined",
                  // @ts-ignore
                  component: "span",
                  size: "large",
                  style: { marginBottom: "15px" },
                },
                "Upload Picture"
              )
            )
          )
        : null,
      createElement(
        "div",
        { style: { textAlign: "center" } },
        props.registering
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
          { onClick: props.handleSignup, variant: "contained" },
          "Sign up"
        )
      )
    )
  );
}
