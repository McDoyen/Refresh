const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const multer = require('multer');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');

require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const db = process.env.DATABASE;

mongoose
    .connect(db, { useNewURLParser: true })
    .then(() => console.log('database initialized'))
    .catch((error) => console.log(`Oopps ${error}`));

const Token = require('./models/token');
const User = require('./models/user');
const Chat = require('./models/chat');

const dir = './public/profile_pictures/';

var uploaded = multer({ dest: dir });

app.post('/signup', uploaded.single('pic'), (request, response) => {
    const url = `${request.protocol}://${request.get('host')}`;
    const newUser = new User({
        userName: request.body.userName,
        email: request.body.email,
        password: bcrypt.hashSync(request.body.password, 10),
        confirmPassword: bcrypt.hashSync(request.body.confirmPassword, 10),
        profilePicture: `${url}${dir}${request.file.originalname}`
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
            return response.send({ message: 'Incorrect username or password' });
        }
        if (user) {
            var passwordIsValid = bcrypt.compareSync(password, user.password);
            var accessToken = jwt.sign(
                { id: user._id },
                process.env.JWT_SECRET,
                {
                    expiresIn: 86400
                }
            );
            var refreshToken = jwt.sign(
                { id: user._id },
                process.env.JWT_REFRESH_TOKEN_SECRET,
                { expiresIn: 172800 }
            );

            const newToken = new Token({
                userID: user._id,
                token: refreshToken
            });
            Token.create(newToken).catch((error) => {
                console.error(error);
            });

            if (!passwordIsValid) {
                return response.send({
                    message: 'Incorrect username or password'
                });
            }

            response.status(200).send({
                id: user._id,
                userName: user.userName,
                email: user.email,
                token: {
                    accessToken,
                    refreshToken
                }
            });
        }
    });
});

app.delete('/deleteToken/:accessToken', (request, response) => {
    var accessToken = request.params.accessToken;

    Token.deleteOne({ accessToken }).catch((error) => console.error(error));
});

app.post('/addMessage', (request, response) => {
    const { userID, data, time } = request.body.newChat;
    const newMessage = new Chat({
        userID,
        data,
        time
    });
    Chat.create(newMessage)
        .then((dbmessage) => {
            response.json(dbmessage);
        })
        .catch((error) => response.json(error));
});

app.get('/retrieveMessages', (request, response) => {
    Chat.find({}, { _id: 0, userID: 1, data: 1, time: 1 })
        .then((chats) => {
            response.send(chats);
        })
        .catch((error) => response.json(error));
});

app.get('/retrieveUsers', (request, response) => {
    User.find({}, { _id: 0, userName: 1 })
        .then((users) => {
            response.send(users);
        })
        .catch((error) => response.json(error));
});

const PORT = process.env.SERVER_PORT || 8081;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});
