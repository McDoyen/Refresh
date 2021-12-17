import {
    Divider,
    Fab,
    Grid,
    List,
    ListItem,
    ListItemText,
    TextField
} from '@mui/material';
import { createElement, Fragment } from 'react';
import SendButton from '@material-ui/icons/Send';
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
    handleChange
}: any) {
    const classes = useStyles();

    return createElement(
        Fragment,
        {},
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
                messages.map((chat: MessageProps, index: number) =>
                    createElement(
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
                                    secondary: chat.time
                                })
                            )
                        )
                    )
                )
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
