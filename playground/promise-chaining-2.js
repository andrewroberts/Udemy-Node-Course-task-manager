
require('../src/db/mongoose')
const Task = require('../src/models/task.js')
const _id = '5e2f2bb2cec089706462fafb'

// Task.deleteOne({_id: _id}).then((task) => {
//     console.log(task)
//     return Task.countDocuments({completed: false})
// }).then((count) => {
//     console.log(count)
// }).catch((error) => {
//     console.log('Error!', error)
// })

const deleteTaskAndCount = async (_id) => {
    await Task.deleteOne({_id})
    const count = await Task.countDocuments({completed: false})
    return count
}

deleteTaskAndCount(_id).then((count) => {
    console.log(count)
}).catch((error) => {
    console.log('Error!' + error)
})