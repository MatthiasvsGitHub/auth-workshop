const verifyToken = require('./verifyToken')
const express = require("express");
const userRouter = express.Router();
userRouter.use(express.urlencoded({extended: false}))

userRouter.get("/", verifyToken, (req, res) => {
    res.json(req.user)
});

module.exports = userRouter;