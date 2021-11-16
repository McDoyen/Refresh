const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const db = "mongodb://localhost/refresh";

mongoose
    .connect(db, { useNewURLParser: true })
    .then(() => console.log("db connected"))
    .catch((error) => console.log(error));

const User = require("./models/user");

app.post("/signup", (request, response) => {
    const newUser = new User({
        userName: request.body.data.userName,
        email: request.body.data.email,
        password: request.body.data.password,
        confirmPassword: request.body.data.confirmPassword,
    });
    User.create(newUser)
        .then((dbUser) => response.json(dbUser))
        .catch((error) => response.json(error));
});

const PORT = process.env.PORT || 8081;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});
