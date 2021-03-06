const mongoose = require('mongoose')
const validator = require('validator')
const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        trim: true,
        validate(value) {
            if (value.length < 7) {
                throw new Error('The password must be 7 chars or longer')
            }
            if (value.toLowerCase().includes('password')) {
                throw new Error('"password" can not be used')
            }
        }

    },
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        unique: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('Invalid email')
            }
        }
    },
    age: {
        type: Number,
        default: 0,
        validate(value) {
            if (value < 0) {
                throw new Error('Age must be a positive number')
            }
        }
    },
    tokens: [{
        token:{
            type: String,
            required: true
        }
    }]
})

userSchema.methods.generateAuthToken = async function() {
    const user = this
    const token = jwt.sign({_id: user._id.toString()}, 'thisismytoken')

    user.tokens = user.tokens.concat({token})
    await user.save()

    return token
}

userSchema.statics.findByCredentials = async (email, password) => {
    const user = await User.findOne({email})

    if (!user) {
        throw new Error('Unable to login')
    }

    try {

        console.log('password:' + password + ', user.password:' + user.password)
        const isMatch = await bcryptjs.compare(password, user.password)

        if (!isMatch) {
            throw new Error('Unable to login')
        }

    } catch (error) {

        throw new Error('Internal error: findByCredentials()')
    }

    return user
}

userSchema.pre('save', async function(next) {
    const user = this

    if (user.isModified()) {
        user.password = await bcryptjs.hash(user.password, 8)
    }

    next()
})

const User = mongoose.model('User', userSchema)

module.exports = User