import { ChangeEvent, createElement, useState } from 'react';

import axios from 'axios';
import { useNavigate } from 'react-router';
import Cookies from 'js-cookie';
import LoginComponent from './LoginComponent';

interface ChangeProps {
    target: {
        name: string;
        value: string;
        files: any;
    };
    preventDefault: () => void;
}

function LoginContainer({ setLoggedIn }: any) {
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState('');
    const [signupError, setSignupError] = useState('');
    const [registering, setRegistering] = useState(false);
    const [data, setData] = useState({
        userName: '',
        email: '',
        password: '',
        confirmPassword: '',
        profilePicture: ''
    });

    const handleChange = (event: ChangeProps) => {
        event.preventDefault();
        const { name, value, files } = event.target;

        if (files) {
            setData({ ...data, [name]: files[0] });
        } else {
            setData({ ...data, [name]: value });
        }
        setErrorMessage('');
        setSignupError('');
    };

    const handleSignup = () => {
        const filled = Object.values(data)
            .slice(0, 1)
            .every((value) => value.length > 0);
        if (registering && filled) {
            const {
                userName,
                email,
                password,
                confirmPassword,
                profilePicture
            } = data;
            const file = new FormData();
            file.append('userName', userName);
            file.append('email', email);
            file.append('password', password);
            file.append('confirmPassword', confirmPassword);
            file.append('pic', profilePicture);
            axios
                .post('http://localhost:8081/signup', file)
                .catch((error) => console.log(error));
            setRegistering(false);
        } else if (registering && !filled) {
            setSignupError('Please fill all requires fields');
        } else {
            setRegistering(true);
        }
    };

    const handleLogin = (event: ChangeEvent) => {
        event.preventDefault();
        axios
            .post('http://localhost:8081/login', data)
            .then((response) => {
                const { id, token, message, userName } = response.data;
                if (token && token.accessToken) {
                    Cookies.set('token', JSON.stringify(token));
                    Cookies.set('userName', userName);
                    Cookies.set('userID', id);
                    setLoggedIn(true);
                    navigate('/chat');
                } else {
                    setErrorMessage(message);
                }
            })
            .catch((error) => console.log(`Error: ${error}`));
    };

    return createElement(LoginComponent, {
        handleLogin,
        handleSignup,
        handleChange,
        errorMessage,
        signupError,
        registering,
        data
    });
}

export default LoginContainer;
