const userData = localStorage.getItem("userData") as string;
const accessToken = JSON.parse(userData).accessToken;

export const userName = JSON.parse(userData).userName;

export const logout = () => {
  localStorage.clear();
};

export const isLoggedIn = () => {
  if (accessToken) {
    return true;
  }

  return false;
};
