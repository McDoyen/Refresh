import axios from "axios";
import Cookies from "js-cookie";

const token = Cookies.get("token");
const tokenObject = token ? JSON.parse(token) : null;
const accessToken = tokenObject ? tokenObject.accessToken : null;

export const logout = () => {
  Cookies.remove("token");
  Cookies.remove("userName");
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
  const userName = Cookies.get("userName");
  if (userName) {
    return userName;
  }
};
