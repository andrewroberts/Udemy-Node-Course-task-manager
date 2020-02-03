const express = require('express')
require('./db/mongoose')
const User = require('./models/user')
const Task = require('./models/task')

const app = express()
const port = process.env.PORT || 3000

app.use(express.json())

app.post('/users', async (req, res) => {  
    const user = new User(req.body)
    try {
        await user.save()
        res.status(201).send(user)
    } catch (error) {
        res.status(400).send(error)
    }
})

app.get('/users', async (req, res) => {
    try {
        const users = await User.find({})
        res.send(users)
    } catch(error) {
        res.status(500).send()
    }
})

app.get('/users/:id', async (req, res) => {
    const _id = req.params.id
    try {
        const user = await User.findById(_id)
        if (!user) {
            return res.status(404).send()
        }
        res.send(user)
    }catch(error) {
        res.status(500).send()
    }
})

app.patch('/users/:id', async (req, res) => {
    const _id = req.params.id
    const body = req.body
    const allowedFields = ["name", "age", "password", "email"]
    const updateFields = Object.keys(body)
    const isValidField = updateFields.every((updateField) => allowedFields.includes(updateField))

    if (!isValidField) {
        res.status(400).send('Error: Invalid field')
    }

    try {
        const user = await User.findByIdAndUpdate(_id, body, {new: true, runValidators: true})
        if (!user) {
            res.status(404).send()
        }
        res.send(user)
    } catch(error) {
        res.status(400).send(error)
    }
})

app.post('/tasks', async (req, res) => {
    const task = new Task(req.body)
    try {
        await task.save()
        res.status(201).send(task)
    }catch(error) {
        res.status(400).send(error)
    }
})

app.get('/tasks', async (req, res) => {
    try {
        const tasks = await Task.find({})
        res.send(tasks)
    }catch(error) {
        res.status(500).send()
    }
})

app.get('/tasks/:id', async  (req, res) => {
    const _id = req.params.id
    try {
        const task = await Task.findById(_id)
        if (!task) {
            return res.status(404).send()
        }
        res.send(task)
    }catch(error) {
        res.status(500).send()
    }
})

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})

// User Id - 5e2f2bbdcec089706462fafc
// Task ID - 5e2b4adee383f2205103b67e
