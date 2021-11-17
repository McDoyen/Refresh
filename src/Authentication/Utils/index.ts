export const logout = () => {
  localStorage.removeItem("accessToken");
};

export const isLoggedIn = () => {
  if (localStorage.getItem("accessToken")) {
    return true;
  }

  return false;
};
