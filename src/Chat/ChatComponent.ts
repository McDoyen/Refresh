import { createElement } from 'react';

import Cookies from 'js-cookie';

import Grid from '@mui/material/Grid';
import List from '@mui/material/List';
import People from '@mui/icons-material/People';
import TextField from '@mui/material/TextField';

import { Avatar, Divider, ListItemButton, ListItemText } from '@mui/material';
import useStyles from './styles';
import { StyledBadge } from './StyledBadgeComponent';
import LauncherComponent from './LauncherComponent';
import MessageList from './MessageListComponent';

interface ChatComponentProps {
    users: any;
    userName: any;
    chats: MessageProps[];
    messageValue: string;
    selected: boolean;
    selectedUser: string;
    selectedUserID: string;
    handleSubmit: any;
    handleChange: any;
    updateChat: any;
    profilePicture: string;
}

interface MessageProps {
    userID: string;
    data: string;
    time: any;
    chatID: string;
    createdAt: string;
}

function ChatComponent(props: ChatComponentProps) {
    const classes = useStyles();
    const {
        chats,
        users,
        userName,
        profilePicture,
        selected,
        selectedUser,
        selectedUserID, // TODO: Put selected user data in one object
        handleSubmit,
        messageValue,
        handleChange,
        updateChat
    } = props;
    const userID = Cookies.get('userID');
    const messages = chats
        .filter((chat) => chat.chatID === `${userID}${selectedUserID}`)
        .concat(
            chats.filter((chat) => chat.chatID === `${selectedUserID}${userID}`)
        )
        .sort((a, b) => b.time.localeCompare(a.time));
    const username = userName.charAt(0).toUpperCase() + userName.slice(1);
    // eslint-disable-next-line no-underscore-dangle
    const userList = users.filter((user: any) => user._id !== userID); // TODO: Fix this from the server

    return createElement(
        'div',
        { className: classes.main },
        createElement(
            'div',
            { className: classes.container },
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
                                src: profilePicture,
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
                    userList.map(
                        ({ userName: user_Name, _id }: any, index: number) => {
                            const Username =
                                user_Name.charAt(0).toUpperCase() +
                                user_Name.slice(1);
                            return createElement(
                                ListItemButton,
                                {
                                    key: index,
                                    onClick: () => updateChat(Username, _id)
                                },
                                createElement(People, {
                                    className: classes.displayPhoto
                                }),
                                createElement(ListItemText, {
                                    primary: Username
                                }),
                                createElement(ListItemText, {
                                    className: classes.onlineBanner,
                                    secondary: 'online'
                                })
                            );
                        }
                    )
                )
            ),
            createElement(
                // TODO: Best moved to MessageListComponent
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
                selected
                    ? MessageList({
                          messages,
                          userID,
                          handleSubmit,
                          messageValue,
                          handleChange,
                          selectedUser
                      })
                    : LauncherComponent()
            )
        )
    );
}

export default ChatComponent;
