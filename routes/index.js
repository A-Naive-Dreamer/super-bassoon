const express = require('express'),
    router = express.Router()

router.get('/', (req, res) => {
    res.send({ message: 'Welcome to my api' })
})

module.exports = router