const express = require('express')
const app = express()
require('dotenv').config()

app.get('/', (req, res) => {
    res.send('Welcome to the homepage of the api!')
})

app.listen(process.env.PORT, () => {
    console.log('Server is running on http://localhost:3000')
})