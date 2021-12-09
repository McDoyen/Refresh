import { createElement } from 'react';

import Cookies from 'js-cookie';

import Grid from '@mui/material/Grid';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import People from '@material-ui/icons/People';
import SendButton from '@material-ui/icons/Send';
import TextField from '@mui/material/TextField';

import { Divider, Fab, ListItemButton, ListItemText } from '@mui/material';
import useStyles from './styles';

interface ChatComponentProps {
    users: any;
    userName: any;
    chats: MessageProps[];
    messageValue: string;
    handleSubmit: any;
    handleChange: any;
}

interface MessageProps {
    userID: string;
    data: string;
    time: any;
}

function ChatComponent(props: ChatComponentProps) {
    const classes = useStyles();
    const { chats, users, userName, handleSubmit, messageValue, handleChange } =
        props;
    const messages = chats;
    const username = userName.charAt(0).toUpperCase() + userName.slice(1);
    const userID = Cookies.get('userID');

    return createElement(
        Grid,
        { container: true, className: classes.chatSection },
        createElement(
            Grid,
            { item: true, xs: 3, className: classes.memberSection },
            createElement(
                List,
                {},
                createElement(
                    ListItemButton,
                    {},
                    createElement(People, { className: classes.displayPhoto }),
                    createElement(ListItemText, { primary: username })
                )
            ),
            createElement(Divider),
            createElement(
                Grid,
                { item: true, xs: 12, style: { padding: '10px' } },
                createElement(TextField, {
                    fullWidth: true,
                    label: 'Search'
                })
            ),
            createElement(Divider),
            createElement(
                List,
                {},
                users.map(({ userName: user_Name }: any, index: number) => {
                    const Username =
                        user_Name.charAt(0).toUpperCase() + user_Name.slice(1);
                    return createElement(
                        ListItemButton,
                        { key: index },
                        createElement(People, {
                            className: classes.displayPhoto
                        }),
                        createElement(ListItemText, { primary: Username }),
                        createElement(ListItemText, {
                            className: classes.onlineBanner,
                            secondary: 'online'
                        })
                    );
                })
            )
        ),
        createElement(
            Grid,
            { item: true, xs: 9, className: classes.messageArea },
            createElement(
                List,
                {},
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
                    Grid,
                    { container: true, className: classes.textField },
                    createElement(
                        Grid,
                        { item: true, xs: 11 },
                        createElement(TextField, {
                            fullWidth: true,
                            label: 'Type something',
                            name: 'value',
                            value: messageValue,
                            onChange: handleChange
                        })
                    ),
                    createElement(
                        Grid,
                        { className: classes.send, xs: 1, item: true },
                        createElement(
                            Fab,
                            { color: 'primary', type: 'submit' },
                            createElement(SendButton)
                        )
                    )
                )
            )
        )
    );
}

export default ChatComponent;
