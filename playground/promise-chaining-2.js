
require('../src/db/mongoose')
const Task = require('../src/models/task.js')
const _id = '5e2f2b987f56216ea720ca8c'

Task.deleteOne({_id: _id}).then((task) => {
    console.log(task)
    return Task.countDocuments({completed: false})
}).then((count) => {
    console.log(count)
}).catch((error) => {
    console.log('Error!', error)
})