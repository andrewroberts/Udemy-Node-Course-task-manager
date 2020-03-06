
/*

NOTES: Cannot create, login and then get profile. My Postman is different to Andrews

*/


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

// const bcryptjs = require('bcryptjs')

// const myFunction = async () => {
//     const password = 'red12345!'
//     // const encoded = '$2a$08$gpMzekr2rrWRBm9hb5X/qOQIVoon0mwcgDI2TehWb73j7d2hy1y1O'
//     // const isMatch = await bcryptjs.compare(password, encoded)
//     const encoded = await bcryptjs.hash(password, 8)
//     console.log(encoded)
//     // console.log(isMatch)
// }

// myFunction()
