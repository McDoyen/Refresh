import axios from 'axios';
import Cookies from 'js-cookie';

const token = Cookies.get('token');
const tokenObject = token ? JSON.parse(token) : null;

export const logout = () => {
    Cookies.remove('token');
    Cookies.remove('userName');
    Cookies.remove('userID');
    if (tokenObject) {
        axios
            .delete(
                `http://localhost:8081/deleteToken/${tokenObject.accessToken}`
            )
            .catch((error) => console.error(error));
    }
};

export const loggedIn = () => {
    if (token) {
        return true;
    }

    return false;
};

export const userName = () => {
    const username = Cookies.get('userName');
    if (username) {
        return username;
    }

    return '';
};
