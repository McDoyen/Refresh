import { createElement, Fragment, useState } from 'react';

import SettingsIcon from '@material-ui/icons/Settings';
import { Menu, MenuItem } from '@mui/material';
import { useNavigate } from 'react-router';

import { logout } from '../Authentication/Utils';

function SettingsComponent({ setLoggedIn, setVisibility }: any) {
    const [anchorEl, setAnchorEl] = useState(null);
    const menuState = Boolean(anchorEl);
    const navigate = useNavigate();

    const handleClick = (event: any) => {
        setAnchorEl(event.currentTarget);
    };

    const handleLogout = () => {
        setAnchorEl(null);
        logout();
        setLoggedIn(false);
        setVisibility(false);
        navigate('/login');
    };

    return createElement(
        Fragment,
        {},
        createElement(
            Fragment,
            {},
            createElement(SettingsIcon, {
                fontSize: 'large',
                style: {
                    bottom: '10px',
                    position: 'fixed'
                },
                type: 'button',
                onClick: handleClick
            }),
            createElement(
                Menu,
                { open: menuState, anchorEl, onClose: () => setAnchorEl(null) },
                createElement(MenuItem, { onClick: handleLogout }, 'Logout')
            )
        )
    );
}

export default SettingsComponent;
