import { createElement } from 'react';

import Cookies from 'js-cookie';

import Grid from '@mui/material/Grid';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import People from '@material-ui/icons/People';
import SendButton from '@material-ui/icons/Send';
import TextField from '@mui/material/TextField';

import {
    Avatar,
    Divider,
    Fab,
    ListItemButton,
    ListItemText
} from '@mui/material';
import useStyles from './styles';
import { StyledBadge } from './StyledBadgeComponent';

interface ChatComponentProps {
    users: any;
    userName: any;
    chats: MessageProps[];
    messageValue: string;
    handleSubmit: any;
    handleChange: any;
    profilePicture: string;
}

interface MessageProps {
    userID: string;
    data: string;
    time: any;
}

function ChatComponent(props: ChatComponentProps) {
    const classes = useStyles();
    const {
        chats,
        users,
        userName,
        profilePicture,
        handleSubmit,
        messageValue,
        handleChange
    } = props;
    const messages = chats;
    const username = userName.charAt(0).toUpperCase() + userName.slice(1);
    const userID = Cookies.get('userID');

    return createElement(
        'div',
        { className: classes.main },
        createElement(
            'div',
            { style: { width: '100%', position: 'relative', height: '100vh' } },
            createElement(
                'div',
                { className: classes.memberSection },
                createElement(
                    List,
                    {},
                    createElement(
                        ListItemButton,
                        {},
                        createElement(
                            StyledBadge,
                            {
                                overlap: 'circular',
                                anchorOrigin: {
                                    vertical: 'bottom',
                                    horizontal: 'right'
                                },
                                variant: 'dot'
                            },
                            createElement(Avatar, {
                                alt: userName,
                                // @ts-ignore
                                src: { profilePicture },
                                variant: 'rounded'
                            })
                        ),
                        createElement(ListItemText, {
                            primary: username,
                            sx: {
                                position: 'absolute',
                                bottom: 0,
                                left: '60px'
                            }
                        })
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
                            user_Name.charAt(0).toUpperCase() +
                            user_Name.slice(1);
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
                'div',
                {
                    style: {
                        width: '70%',
                        flexDirection: 'column',
                        display: 'flex',
                        bottom: 0,
                        position: 'absolute',
                        right: 0,
                        height: '100%'
                    }
                },
                createElement(
                    List,
                    { style: { overflowY: 'auto', height: '100%' } },
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
                        { style: { display: 'flex', padding: '1%' } },
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
            )
        )
    );
}

export default ChatComponent;
