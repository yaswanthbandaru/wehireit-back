const express = require('express');
const { isValidCredentials, generateToken } = require('../services/login_services');
const { createUser, getUser, updateUser } = require('../services/user_services');
const userRouter = express.Router();


userRouter.get('/:userId',  async(req, res) => {
    const response = await getUser(req.params.userId)
    // console.log(response)
    res.json(response)
})

userRouter.post('/', async (req, res) => {
    const response = await createUser(req.body);
    res.json(response);
})

userRouter.put('/', async (req, res) => {
    const response = await updateUser(req.body);
    res.json(response);
})

// userRouter.post('/login', (req, res) => {
    
//     // Extract username and password from the request body
//     const { username, password } = req.body;

//     // Validate the credentials (e.g., check aganist the database)
//     if (isValidCredentials(username, password)) {
//         // Generate a JWT token using the 'jsonwebtoken' library
//         const token = generateToken(username);

//         // Send the JWT as the response
//         res.json({ token });
//     } else {
//         // If The credentials are invalid, send an error response
//         res.status(401).json({ error: 'Invalid credentials' });
//     } // 63ea7d6012913d71cb2e17f2

//     // res.json({ message: 'Login page'});
//     // res.send(req.body);
// })
// // export your router
module.exports = userRouter;