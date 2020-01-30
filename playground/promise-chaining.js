require('../src/db/mongoose')
const User = require('../src/models/user.js')
const _id = '5e2b54be35fad00510d47046'

User.findOneAndUpdate(_id, {age: 1}).then((user) => {
    console.log(user)
    return User.countDocuments({age: 1})
}).then((count) => {
    console.log(count)
}).catch((error) => {
    console.log('Error!', error)
})