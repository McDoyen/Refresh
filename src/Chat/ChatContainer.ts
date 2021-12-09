import axios from 'axios';
import { createElement, useEffect, useState } from 'react';

import Cookies from 'js-cookie';
import { userName } from '../Authentication/Utils';
import ChatComponent from './ChatComponent';

interface SyntheticBaseEvent {
    target: { value: string }[];
    preventDefault: () => void;
}

function ChatContainer() {
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
        if (data) {
            const newChat = {
                userID: Cookies.get('userID'),
                data,
                time: new Date().toLocaleTimeString()
            };
            updateChats((oldChats): any => [...oldChats, newChat]);
            axios
                .post('http://localhost:8081/addMessage', { newChat })
                .catch((error) => console.error(error));

            setMessageValue('');
        }
    };

    return fetching
        ? createElement('p', {}, 'Skeleton')
        : createElement(ChatComponent, {
              users,
              userName: userName(),
              chats,
              messageValue,
              handleChange,
              handleSubmit
          });
}

export default ChatContainer;
