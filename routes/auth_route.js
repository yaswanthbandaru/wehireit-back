const authRoute = require('express').Router();
const { UserModel } = require("../models/userSchema");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

authRoute.post('/register', async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if(!email || !password || !name ) {
            res.status(400).send('All input is required');
        }

        const oldUser = await UserModel.findOne({ email });

        if (oldUser) {
            return res.status(409).send("User Already Exists. Please Login");
        }

        // encrypt user password
        const encryptedPassword = await bcrypt.hash(password, 10);

        const user = await UserModel.create({
            name,
            email: email.toLowerCase(), // sanitize : convert email to lowecase
            password: encryptedPassword,
        });

        // Create token 
        const token = jwt.sign(
            { user_id: user._id, email },
            process.env.TOKEN_KEY,
            {
                expiresIn: "2h",
            }
        );

        // save the created token into user model
        user.token = token;

        // return new user
        res.status(201).send(user);

    } catch (err) {
        console.log(err);
    }
});

authRoute.post('/login', async (req, res) => {
    try {
        // Get user input
        const { email, password } = req.body;

        // Validate user input
        if(!(email && password)) {
            res.status(400).send("All input is required");
        }

        // Validate if user exits in our database
        const user = await UserModel.findOne({ email });

        // Validate and compare the password from req and server
        if(user && (await bcrypt.compare(password, user.password))) {
            // Create token
            const token = jwt.sign(
                { user_id: user._id, email },
                process.env.TOKEN_KEY,
                {
                    expiresIn: "2h",
                }
            );

            // save user token
            user.token = token;

            // return the user
            res.status(200).json(user);
        }
        res.status(400).send("Invalid Credentials");

    } catch (err) {
        console.log(err);
    }
});


module.exports = authRoute;