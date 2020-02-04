
const express = require('express')
require('./db/mongoose.js')

const app = express()
const port = process.env.PORT || 3000

const userRouter = require('./routers/users.js') 
const taskRouter = require('./routers/tasks.js') 

app.use(userRouter)
app.use(taskRouter)

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})
