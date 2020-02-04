
const Task = require('../models/task')

const express = require('express')
const app = express()
const router = new express.Router()

router.patch('/tasks/:id', async (req, res) => {
    const id = req.params.id
    const body = req.body
    const validFields = ["description", "completed"]
    const updateFields = Object.keys(body)
    console.log(updateFields)
    const isValidField = validFields.every((updateField) => validFields.includes(updateField))

    if (!isValidField) {
        return res.status(400).send('Invalid field "' + updateFields + '"')
    }

    try {
        const task = await Task.findByIdAndUpdate(id, body, {new: true, runValidators: true})
        if (!task) {
            res.status(404).send('Invlaid ID')
        }
        res.send(task)
    } catch (error) {
        res.status(500).send(error)
    }
})

router.post('/tasks', async (req, res) => {
    const task = new Task(req.body)
    try {
        await task.save()
        res.status(201).send(task)
    } catch(error) {
        res.status(400).send(error)
    }
})

router.get('/tasks', async (req, res) => {
    console.log('Get')
    try {
        const tasks = await Task.find({})
        res.send(tasks)
    } catch(error) {
        res.status(500).send()
    }
})

router.get('/tasks/:id', async  (req, res) => {
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

router.delete('/tasks/:id', async (req, res) => {
    const id = req.params.id
    console.log(id)
    try {
        const task = await Task.findByIdAndDelete(id)

        if (!task) {
            return res.status(404).send()
        }
        res.send(user)
    } catch (error) {
        res.status(500).send()
    }
})

module.exports = router
