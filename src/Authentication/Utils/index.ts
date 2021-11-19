const userData = localStorage.getItem("userData") as string;
const accessToken = userData ? JSON.parse(userData).accessToken : "";

export const userName = userData ? JSON.parse(userData).userName : "";

export const logout = () => {
  localStorage.clear();
};

export const isLoggedIn = () => {
  if (accessToken) {
    return true;
  }

  return false;
};
