const express = require('express'),
    router = express.Router(),
    todoController = require('./controller')

router.get('/', todoController.getAll)
router.get('/:userId', todoController.getById)
router.get('/completed/:userId', todoController.getCompleted)
router.get('/uncompleted/:userId', todoController.getUncompleted)
router.delete('/:userId/:id', todoController.deleteOne)
router.post('/:userId', todoController.addOne)
router.put('/:userId/:id', todoController.updateOne)
router.put('/completed/:userId/:id', todoController.setAsCompleted)

module.exports = router