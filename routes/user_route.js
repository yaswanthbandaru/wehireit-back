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


module.exports = userRouter;