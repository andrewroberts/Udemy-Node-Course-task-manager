
const User = require('../models/user')

const express = require('express')
const app = express()
const router = new express.Router()

router.post('/users', async (req, res) => { 
    const user = new User(req.body)
    try {
        await user.save()
        res.status(201).send(user)
    } catch (error) {
        res.status(400).send(error)
    }
})

router.post('/users/login', async (req, res) => { 
    console.log(req.body)
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password)
        res.send(user)
    } catch (error) {
        console.log(error)
        res.status(400).send()
    }
})

router.get('/users', async (req, res) => {
    try {
        const users = await User.find({})
        res.send(users)
    } catch(error) {
        res.status(500).send()
    }
})

router.get('/users/:id', async (req, res) => {
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

router.patch('/users/:id', async (req, res) => {
    const _id = req.params.id
    const body = req.body

    if (!body) {
        return res.status(404).send()
    }  

    const allowedFields = ["name", "age", "password", "email"]
    const updateFields = Object.keys(body)
    const isValidOperation = updateFields.every((updateField) => allowedFields.includes(updateField))

    if (!isValidOperation) {
        return res.status(400).send('Error: Invalid field')
    }

    try {
        const user = await User.findById(_id)

        if (!user) {
            return res.status(400).send()
        }

        allowedFields.forEach((field) => user[field] = body[field] || user[field])

        await user.save()

        res.send(user)

    } catch(error) {
        res.status(400).send(error)
    }
})

router.delete('/users/:id', async (req, res) => {
    const id = req.params.id
    console.log(id)
    try {
        const user = await User.findByIdAndDelete(id)

        if (!user) {
            return res.status(404).send()
        }
        res.send(user)
    } catch (error) {
        res.status(500).send()
    }
})

module.exports = router
