const express = require('express'),
    router = express.Router(),
    userController = require('./controller')

console.log('user route')
router.get('/', userController.getAll)
router.get('/:id', userController.getById)
router.post('/sign-up', userController.signUp)
router.put('/:id', userController.updateOne)
router.delete('/:id', userController.deleteOne)
router.post('/log-in', userController.login)

module.exports = router