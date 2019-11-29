const express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    {
        PORT,
        connect
    } = require('./config'),
    cors = require('cors')

app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use('/', require('./routes'))
app.use('/todo', require('./routes/todos'))
app.use('/user', require('./routes/users'))

connect(() => {
    app.listen(PORT, () => {
        console.log(`This app listening on port: ${PORT || 3000}`)
    })
})
