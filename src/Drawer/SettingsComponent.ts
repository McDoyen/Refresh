import { createElement, Fragment, useState } from "react";

import SettingsIcon from "@material-ui/icons/Settings";
import { Menu, MenuItem } from "@mui/material";
import { logout } from "../Authentication/Utils";
import { useHistory } from "react-router";

function SettingsComponent() {
  const [anchorEl, setAnchorEl] = useState(null);
  const menuState = Boolean(anchorEl);
  const history = useHistory();

  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleLogout = () => {
    setAnchorEl(null);
    logout();
    history.push("/login");
  };

  return createElement(
    Fragment,
    {},
    createElement(
      Fragment,
      {},
      createElement(SettingsIcon, {
        fontSize: "large",
        style: {
          bottom: "10px",
          position: "fixed",
        },
        type: "button",
        onClick: handleClick,
      }),
      createElement(
        Menu,
        { open: menuState, anchorEl, onClose: () => setAnchorEl(null) },
        createElement(MenuItem, { onClick: handleLogout }, "Logout")
      )
    )
  );
}

export default SettingsComponent;
