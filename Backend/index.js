const express = require('express')
const { PORT } = require('./utils/helpers')
require('./config/mongoConfig')
const notifyBeforeDueDate = require('./config/scheduler')
const cors = require('cors')
const app = express()

app.use(express.json())
app.use(cors({
    origin: '*'
}))

app.use('/user', require('./routes/user.routes'))
app.use('/task', require('./routes/task.routes'))
app.use('/group', require('./routes/group.routes'))

// notifyBeforeDueDate()

app.get('/', (req, res) => {
    res.send('🚀 WorkGrid API is running...')
})

app.listen(PORT, () => {
    console.log(`⚡ Server running on port ${PORT}`)
})