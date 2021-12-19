/* eslint-disable no-underscore-dangle */
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const multer = require('multer');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const path = require('path');

require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/public/profile_pictures', express.static('public/profile_pictures'));

const db = process.env.DATABASE;

mongoose
    .connect(db, { useNewURLParser: true })
    .then(() => console.log('database initialized'))
    .catch((error) => console.log(`Oopps ${error}`));

const Token = require('./models/token');
const User = require('./models/user');
const Chat = require('./models/chat');

const directory = 'public/profile_pictures/';

const storage = multer.diskStorage({
    destination: (request, file, callback) => {
        callback(null, directory);
    },
    filename: (request, file, callback) => {
        const name = file.originalname;
        const fileName = `${name.split('.')[0].trim()}${path.extname(name)}`;
        callback(null, fileName);
    }
});

const upload = multer({ storage });

app.post('/signup', upload.single('pic'), (request, response) => {
    const newUser = new User({
        userName: request.body.userName,
        email: request.body.email,
        password: bcrypt.hashSync(request.body.password, 10),
        confirmPassword: bcrypt.hashSync(request.body.confirmPassword, 10),
        profilePicture: request.file.path
    });
    User.create(newUser)
        .then((dbUser) => {
            response.json(dbUser);
        })
        .catch((error) => response.json(error));
});

app.post('/login', (request, response) => {
    const { userName, password } = request.body;
    User.findOne({ userName }, (error, user) => {
        if (error) {
            response.send(error);
            return;
        }
        if (!user) {
            response.send({ message: userName });
        }
        if (user) {
            const passwordIsValid = bcrypt.compareSync(password, user.password);
            const accessToken = jwt.sign(
                { id: user._id },
                process.env.JWT_SECRET,
                {
                    expiresIn: 86400
                }
            );
            const refreshToken = jwt.sign(
                { id: user._id },
                process.env.JWT_REFRESH_TOKEN_SECRET,
                { expiresIn: 172800 }
            );

            const newToken = new Token({
                userID: user._id,
                token: refreshToken
            });
            Token.create(newToken).catch((tokenError) => {
                console.error(tokenError);
            });

            if (!passwordIsValid) {
                response.send({
                    message: 'Incorrect username or password'
                });
            }
            response.status(200).send({
                id: user._id,
                userName: user.userName,
                email: user.email,
                profilePicture: user.profilePicture,
                token: {
                    accessToken,
                    refreshToken
                }
            });
        }
    });
});

app.delete('/deleteToken/:accessToken', (request) => {
    const { accessToken } = request.params;

    Token.deleteOne({ accessToken }).catch((error) => console.error(error));
});

app.post('/addMessage', (request, response) => {
    const { userID, data, time, chatID } = request.body.newChat;
    const newMessage = new Chat({
        userID,
        data,
        time,
        chatID
    });
    Chat.create(newMessage)
        .then((dbmessage) => {
            response.json(dbmessage);
        })
        .catch((error) => response.json(error));
});

app.get('/retrieveMessages', (request, response) => {
    Chat.find({}, { _id: 0, userID: 1, data: 1, time: 1, chatID: 1 })
        .then((chats) => {
            response.send(chats);
        })
        .catch((error) => response.json(error));
});

app.get('/retrieveUsers', (request, response) => {
    User.find({}, { _id: 0, _id: 1, userName: 1 })
        .then((users) => {
            response.send(users); // TODO: Send an object
        })
        .catch((error) => response.json(error));
});

const PORT = process.env.SERVER_PORT || 8081;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});
