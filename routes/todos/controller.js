const { get } = require('../../config')

module.exports = {
    getAll: (req, res) => {
        get()
            .collection('todos')
            .find({})
            .toArray()
            .then(result => {
                res.send({
                    message: 'Get all datas.',
                    data: result
                })
            })
            .catch(error => {
                console.log(error)
            })
    },
    getById: (req, res) => {
        get()
            .collection('todos')
            .find({
                userId: parseInt(req.params.userId)
            })
            .toArray()
            .then(result => {
                res.send({
                    message: 'Get data by id.',
                    data: result
                })
            })
            .catch(error => {
                console.log(error)
            })
    },
    getCompleted: (req, res) => {
        get()
            .collection('todos')
            .find({
                userId: parseInt(req.params.userId),
                status: 'completed'
            })
            .toArray()
            .then(result => {
                res.send({
                    message: 'Get completed data.',
                    data: result
                })
            })
            .catch(error => {
                console.log(error)
            })
    },
    getUncompleted: (req, res) => {
        get()
            .collection('todos')
            .find({
                userId: parseInt(req.params.userId),
                status: 'uncompleted'
            })
            .toArray()
            .then(result => {
                res.send({
                    message: 'Get uncompleted data.',
                    data: result
                })
            })
            .catch(error => {
                console.log(error)
            })
    },
    deleteOne: (req, res) => {
        get()
            .collection('todos')
            .updateOne(
                {
                    id: parseInt(req.params.id),
                    userId: parseInt(req.params.userId)
                },
                {
                    $set: {
                        status: 'deleted'
                    }
                }
            )
            .then(result => {
                get()
                    .collection('todos')
                    .find({
                        userId: parseInt(req.params.userId),
                    })
                    .toArray()
                    .then(result2 => {
                        res.send({
                            message: 'Data is successfully updated.',
                            data: result2
                        })
                    })
                    .catch(error => {
                        console.log(error)
                    })
            })
            .catch(error => {
                console.log(error)
            })
    },
    addOne: (req, res) => {
        get()
            .collection('todos')
            .find({})
            .toArray()
            .then(result1 => {
                get()
                    .collection('todos')
                    .insertOne({
                        id: parseInt(result1.length) + 1,
                        userId: parseInt(req.params.userId),
                        status: 'uncompleted',
                        todos: req.body.todos
                    })
                    .then(result2 => {
                        get()
                            .collection('todos')
                            .find({
                                userId: parseInt(req.params.userId),
                            })
                            .toArray()
                            .then(result3 => {
                                res.send({
                                    message: 'Data is successfully added.',
                                    data: result3
                                })
                            })
                            .catch(error => {
                                console.log(error)
                            })
                    })
                    .catch(error => {
                        console.log(error)
                    })
            })
            .catch(error => {
                console.log(error)
            })
    },
    updateOne: (req, res) => {
        get()
            .collection('todos')
            .updateOne(
                {
                    userId: parseInt(req.params.userId),
                    id: parseInt(req.params.id)
                },
                {
                    $set: {
                        todos: req.body.todos
                    }
                }
            )
            .then(result => {
                get()
                    .collection('todos')
                    .find({
                        userId: parseInt(req.params.userId),
                    })
                    .toArray()
                    .then(result2 => {
                        res.send({
                            message: 'Data is successfully updated.',
                            data: result2
                        })
                    })
                    .catch(error => {
                        console.log(error)
                    })
            })
            .catch(error => {
                console.log(error)
            })
    },
    setAsCompleted: (req, res) => {
        get()
            .collection('todos')
            .updateOne(
                {
                    id: parseInt(req.params.id),
                    userId: parseInt(req.params.userId)
                },
                {
                    $set: {
                        status: 'completed'
                    }
                }
            )
            .then(result => {
                get()
                    .collection('todos')
                    .find({
                        userId: parseInt(req.params.userId),
                    })
                    .toArray()
                    .then(result2 => {
                        res.send({
                            message: 'Data is successfully updated.',
                            data: result2
                        })
                    })
                    .catch(error => {
                        console.log(error)
                    })
            })
            .catch(error => {
                console.log(error)
            })
    }
}