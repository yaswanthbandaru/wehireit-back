const express = require('express');
const { createUser, getUser } = require('../services/user_services');
const userRouter = express.Router();

userRouter.get('/:userId',  async(req, res) => {
    const response = await getUser(req.params.userId)
    res.json(response)
})

// export your router
moduel.exports = userRouter;