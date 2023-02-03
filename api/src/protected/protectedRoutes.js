// use auth middleware

const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/auth');
const requireParamsMiddleware = require('../middlewares/requireParams')

const Spotted = require('../models/Spotted');
const Comment = require('../models/Comment');

const maxSpottedTextLength = 1024;

router.use(authMiddleware);

router.get('/', (req, res) => {
    res.status(200).send({ message: 'ok'});
});

router.post('/spotteds', requireParamsMiddleware(['text']), async (req, res) => {
    const { text } = req.body;
    const isTextTooLarge = text.replaceAll(' ', '').length > maxSpottedTextLength;

    if(isTextTooLarge){
        res.status(400).send({ success: false, message: "The spotted length exceeds the limit"});
    }

    else{
        try {
            await Spotted.sync();
            newSpotted = await Spotted.create(
                {
                    text: text
                }
            );
            res.status(200).send({ success: true, message: "The spotted was created", internal_code: 7});
        } catch (err) {
            res.status(200).send({ success: false, message: "An error has occurred", internal_code: 8});
        }
    }
});

router.get('/spotteds', async (req, res) => {
    try {
        await Spotted.sync();
        const allSpotteds = await Spotted.findAll();
        const allSpottedsResult = JSON.parse(JSON.stringify(allSpotteds))
        res.status(200).send({ success: true, message: "The server returned all spotteds", result: allSpottedsResult, internal_code: 9});
    } catch (err) {
        res.status(200).send({ success: false, message: "An error has occurred", internal_code: 10});
    }
});

router.get('/spotteds/comments', requireParamsMiddleware(['postId']), async (req, res) => {
    const { postId } = req.body;

    try {
        await Comment.sync();
        const doesPostExist = await Spotted.findOne({where: {id: postId}});
    
        if(!doesPostExist){
            res.status(400).send({ success: false, message: "The spotted id is invalid"});
        }

        const allComments = await Comment.findAll({where: {spotted_id: postId}});
        const allCommentsResult = await JSON.parse(JSON.stringify(allComments))
        await res.status(200).send({ success: true, message: "The server returned all comments from post", result: allCommentsResult, internal_code: 9});
    } catch (err) {
        res.status(200).send({ success: false, message: "An error has occurred"});
    }
});

router.post('/spotteds/comments', requireParamsMiddleware(['text', 'postId']), async (req, res) => {
    const { text, postId } = req.body;
    try {
        await Comment.sync();
        const doesPostExist = await Spotted.findOne({where: {id: postId}});
        const isTextTooLarge = text.replaceAll(' ', '').length > maxSpottedTextLength;
    
        if(!doesPostExist){
            res.status(400).send({ success: false, message: "The spotted id is invalid"});
        }
        if(isTextTooLarge){
            res.status(400).send({ success: false, message: "The comment length exceeds the limit"});
        }

        const newComment = await Comment.create(
            {
                text: text,
                spotted_id: postId
            }
        );
        res.status(200).send({ success: true, message: "Comment created"});
    } catch (err){
        res.status(200).send({ success: false, message: "An error has occurred"});
    }
})

module.exports = app => app.use('/protected', router);