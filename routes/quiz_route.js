const express = require('express');
const { createQuiz, getQuiz, updateQuiz } = require('../services/quiz_services');
const quizRouter = express.Router();

quizRouter.get('/:quizId', async (req, res) => {
    const response = await getQuiz(req.params.quizId);
    res.json(response);
});

quizRouter.post("/", async (req, res) => {
    const response = await createQuiz(req.body);
    res.json(response);
});

