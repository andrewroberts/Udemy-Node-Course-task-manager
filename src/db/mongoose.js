const mongoose = require('mongoose')

const connectionUrl = 'mongodb://127.0.0.1:27017/task-manager-api'
const databaseName = 'task-manager'
const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
}

mongoose.connect(connectionUrl, options)