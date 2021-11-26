import { ChangeEvent, createElement, useState } from "react";

import LoginComponent from "./LoginComponent";
import axios from "axios";
import { useNavigate } from "react-router";

interface ChangeProps {
  target: {
    name: string;
    value: string;
  };
  preventDefault: () => void;
}

function LoginContainer({ setLoggedIn }: any) {
  let navigate = useNavigate();
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
        const { token, message, userName } = response.data;
        if (token.accessToken) {
          localStorage.setItem("token", JSON.stringify(token));
          localStorage.setItem("userName", userName);
          setLoggedIn(true);
          navigate("/chat");
        } else {
          setErrorMessage(message);
        }
      })
      .catch((error) => console.log(`Error: ${error}`));
  };

  return createElement(LoginComponent, {
    handleLogin,
    handleSignup,
    handleChange,
    errorMessage,
    signupError,
    registering,
    data,
  });
}

export default LoginContainer;
