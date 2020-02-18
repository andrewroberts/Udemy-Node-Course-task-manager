
const express = require('express')
require('./db/mongoose.js')

const app = express()
const port = process.env.PORT || 3001

app.use(express.json())

const userRouter = require('./routers/users.js') 
const taskRouter = require('./routers/tasks.js') 

app.use(userRouter)
app.use(taskRouter)

app.listen(port, () => {
    console.log('Server is up on port ' + port) 
})

const jwt = require('jsonwebtoken')

const myFunction = () => {
    const token = jwt.sign({_id: 'abcde'}, 'thisisatoken')
    console.log(token)

    const id = jwt.verify(token, 'thisisatokenn')
    console.log(id)
}

myFunction()
