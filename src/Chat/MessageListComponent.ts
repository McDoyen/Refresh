import {
    AppBar,
    Avatar,
    Divider,
    Fab,
    Grid,
    List,
    ListItem,
    ListItemText,
    TextField,
    Toolbar,
    Typography
} from '@mui/material';
import { createElement, Fragment } from 'react';
import SendButton from '@mui/icons-material/Send';
import CallIcon from '@mui/icons-material/Call';
import VideoCallIcon from '@mui/icons-material/VideoCall';
import useStyles from './styles';

interface MessageProps {
    userID: string;
    data: string;
    time: any;
}

function MessageList({
    messages,
    userID,
    handleSubmit,
    messageValue,
    handleChange,
    selectedUser
}: any) {
    const classes = useStyles();

    return createElement(
        Fragment,
        {},
        createElement(
            AppBar,
            { position: 'static' },
            createElement(
                Toolbar,
                { variant: 'dense', sx: { justifyContent: 'space-between' } },
                createElement(Avatar, { sx: { mr: 2 } }),
                createElement(
                    Typography,
                    { sx: { flexGrow: 1 } },
                    selectedUser
                ),
                createElement(CallIcon, { sx: { mr: 2 } }),
                createElement(VideoCallIcon)
            )
        ),
        createElement(
            List,
            {
                style: {
                    overflowY: 'auto',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column-reverse'
                }
            },
            messages &&
                messages.map((chat: MessageProps, index: number) => {
                    const time = new Date(chat.time).toLocaleTimeString();
                    return createElement(
                        ListItem,
                        { key: index },
                        createElement(
                            Grid,
                            { container: true },
                            createElement(
                                Grid,
                                {
                                    item: true,
                                    xs: 12,
                                    style: {
                                        textAlign:
                                            userID === chat.userID
                                                ? 'right'
                                                : 'left'
                                    }
                                },
                                createElement(ListItemText, {
                                    primary: chat.data
                                }),
                                createElement(ListItemText, {
                                    secondary: time
                                })
                            )
                        )
                    );
                })
        ),
        createElement(Divider),
        createElement(
            'form',
            { onSubmit: handleSubmit },
            createElement(
                'div',
                { className: classes.form },
                createElement(TextField, {
                    fullWidth: true,
                    label: 'Type something',
                    name: 'value',
                    value: messageValue,
                    onChange: handleChange
                }),
                createElement(
                    Fab,
                    {
                        color: 'primary',
                        type: 'submit',
                        style: { marginLeft: '10px' }
                    },
                    createElement(SendButton)
                )
            )
        )
    );
}

export default MessageList;
