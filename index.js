const express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    {
        PORT,
        JWT_SECRET_KEY,
        connect
    } = require('./config'),
    cors = require('cors'),
    jwt = require('express-jwt')

app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(
    jwt({ secret: JWT_SECRET_KEY }).unless({
        path: [
            {
                url: '/',
                method: ['GET']
            },
            {
                url: '/user/sign-up',
                method: ['POST']
            },
            {
                url: '/user/log-in',
                method: ['POST']
            }
        ]
    })
)
app.use((err, req, res, next) => {
    if (err.name === 'UnauthorizedError') {
        return res.status(401).json({
            message: 'You are not allowed to enter this endpoints.'
        })
    }

    return next()
})

app.use('/', require('./routes'))
app.use('/todo', require('./routes/todos'))
app.use('/user', require('./routes/users'))

connect(() => {
    app.listen(PORT, () => {
        console.log(`This app listening on port: ${PORT || 3000}`)
    })
})
