const mongoose = require('mongoose')

const connectionUrl = 'mongodb://127.0.0.1:27017/task-manager-api'
const databaseName = 'task-manager'
const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
}

mongoose.connect(connectionUrl, options)

// const User = mongoose.model('User', {
//     name: {
//         type: String
//     },
//     age: {
//         type: Number
//     }
// })

// const me = new User({
//     name: 'Andrew',
//     age: 'aa'
// })

// me.save().then((me) => {
//     console.log(me)
// }).catch((error) => {
//     console.log('Error!', error)
// })

const Task = mongoose.model('Task', {
    description: {
        type: String
    },
    completed: {
        type: Boolean
    }
})

const task1 = new Task({
    description: 'Task1',
    completed: true
})

task1.save().then((task1) => {
    console.log(task1)
}).catch((error) => {
    console.log('Error!', error)
})
