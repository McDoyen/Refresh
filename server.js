const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
var bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");

require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const db = process.env.DATABASE;

mongoose
    .connect(db, { useNewURLParser: true })
    .then(() => console.log("database initialized"))
    .catch((error) => console.log(error));

const User = require("./models/user");

app.post("/signup", (request, response) => {
    const newUser = new User({
        userName: request.body.data.userName,
        email: request.body.data.email,
        password: bcrypt.hashSync(request.body.data.password, 10),
        confirmPassword: bcrypt.hashSync(request.body.data.confirmPassword, 10),
    });
    User.create(newUser)
        .then((dbUser) => { response.json(dbUser) })
        .catch((error) => response.json(error));
});

app.post("/login", (request, response) => {
    const { userName, password } = request.body.data;
    User.findOne({ userName }, (error, user) => {
        if (error) {
            response.status(500).send({ message: error })
            return;
        }
        if (!user) {
            return response.send({ message: 'Incorrect username or password' })
        }
        if (user) {
            var passwordIsValid = bcrypt.compareSync(
                password, user.password
            )
            var token = jwt.sign({ id: user._id }, "secret-key", {
                expiresIn: 86400
            })

            if (!passwordIsValid) {
                return response.send({ message: 'Incorrect username or password' })
            }

            response.status(200).send({
                id: user._id,
                userName: user.userName,
                email: user.email,
                accessToken: token
            })

        }
    });
});

const PORT = process.env.SERVER_PORT || 8081;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});
