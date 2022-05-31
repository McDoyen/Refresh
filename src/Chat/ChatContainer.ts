import axios from 'axios';
import { createElement, useEffect, useState } from 'react';

import Cookies from 'js-cookie';
import { profilePicture, userName } from '../Authentication/Utils';
// eslint-disable-next-line import/no-named-as-default
import ChatComponent from './ChatComponent';
import SkeletonComponent from './SkeletonComponent';

interface SyntheticBaseEvent {
    target: { value: string }[];
    preventDefault: () => void;
}

function ChatContainer() {
    const [{ selected, selectedUser, selectedUserID }, setMember] = useState({
        selected: false,
        selectedUser: '',
        selectedUserID: ''
    });
    const [chats, updateChats] = useState([]);
    const [messageValue, setMessageValue] = useState('');
    const [fetching, setFetching] = useState(true);
    const [users, setUsers] = useState([]);

    useEffect(() => {
        axios
            .get('http://localhost:8081/retrieveMessages')
            .then(({ data }) => {
                updateChats(data);
                setFetching(false);
            })
            .catch((error) => console.error(error));

        axios.get('http://localhost:8081/retrieveUsers').then(({ data }) => {
            setUsers(data);
            setFetching(false);
        });
    }, []);

    const handleChange = (event: any) => {
        setMessageValue(event.target.value);
    };

    const handleSubmit = (event: SyntheticBaseEvent) => {
        event.preventDefault();
        const data = event.target[0].value;
        const userID = Cookies.get('userID');
        if (data) {
            const newChat = {
                userID,
                data,
                time: new Date().toISOString(),
                chatID: `${userID}${selectedUserID}`
            };
            updateChats((oldChats): any => [...oldChats, newChat]);
            axios
                .post('http://localhost:8081/addMessage', { newChat })
                .catch((error) => console.error(error));

            setMessageValue('');
        }
    };

    const updateChat = (name: string, id: string) => {
        setMember({ selected: true, selectedUser: name, selectedUserID: id });
    };

    return fetching
        ? createElement(SkeletonComponent)
        : createElement(ChatComponent, {
              users,
              userName: userName(),
              profilePicture: profilePicture(),
              chats,
              messageValue,
              selected,
              selectedUser,
              selectedUserID,
              handleChange,
              handleSubmit,
              updateChat
          });
}

export default ChatContainer;
