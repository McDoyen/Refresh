import axios from "axios";

const token = localStorage.getItem("token");
const tokenObject = token ? JSON.parse(token) : null;
const accessToken = tokenObject ? tokenObject.accessToken : null;

export const logout = () => {
  localStorage.clear();
  if (accessToken) {
    axios.delete(`http://localhost:8081/deleteToken/${accessToken}`);
  }
};

export const loggedIn = () => {
  if (accessToken) {
    return true;
  } else {
    return false;
  }
};

export const userName = () => {
  const userName = localStorage.getItem("userName");
  if (userName) {
    return userName;
  }
};
