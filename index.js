const express = require('express')
const app = express()
const mongoose = require('mongoose')
const port = process.env.PORT || 3000
require('dotenv').config()
const userRouter = require('./routes/users')
const authRouter = require('./routes/auth')
const cors = require('cors')
app.use(cors())

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

mongoose.connect(process.env.MONGO_DB, {useNewUrlParser : true, useUnifiedTopology : true})

app.use('/', userRouter)
app.use('/users', authRouter)

app.listen(port, console.log(`Server is listening on port ${port}`));