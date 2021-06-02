const authRouter = require('express').Router()
const User = require('../models/User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

authRouter.post('/register', async (req, res) => {
    const emailExist = await User.findOne({email : req.body.email})
    if (emailExist) return res.status(400).send('Email already exist')

    const salt = await bcrypt.genSalt(10)
    const hashPassword = await bcrypt.hash(req.body.password, salt)

    const user = new User({
        name : req.body.name,
        email : req.body.email,
        password : hashPassword
    })  

    user.save()
    res.json({user})

})

authRouter.post('/login', async (req, res) => {
    const user = await User.findOne({email : req.body.email})
    if (!user) return res.status(400).send('Email not found')
    
    const comparePassword = await bcrypt.compare(req.body.password, user.password)
    if(!comparePassword) return res.status(400).send('Wrong password')

    const token = jwt.sign({user}, process.env.SECRET)
    res.header('auth-token', token)
    res.json(token)

})


module.exports = authRouter