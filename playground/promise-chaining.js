require('../src/db/mongoose')
const User = require('../src/models/user.js')
const _id = '5e2f292bf6b98d51da689b41'

// User.findOneAndUpdate(_id, {age: 1}).then((user) => {
//     console.log(user)
//     return User.countDocuments({age: 1})
// }).then((count) => {
//     console.log(count)
// }).catch((error) => {
//     console.log('Error!', error)
// })

const updateAgeAndCount = async (id, age) => {
    const user = await User.findByIdAndUpdate(_id, {age})
    const count = await User.countDocuments({age})
    return count
}

updateAgeAndCount(_id, 2).then((count) => {
    console.log(count)
}).catch((error) => {
    console.log('Error!', error)
})