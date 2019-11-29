const { user: users } = require('../../models'),
    { get } = require('../../config')

module.exports = {
    getAll: (req, res) => {
        get()
            .collection('users')
            .find({})
            .toArray()
            .then(result => {
                res.send({
                    message: 'Get all users.',
                    data: result
                })
            })
            .catch(error => {
                console.log(error)
            })
    },
    login: (req, res) => {
        get()
            .collection('users')
            .find({
                email: req.body.email
            },
                {
                    projection: {
                        _id: 0,
                        email: 0
                    }
                }
            )
            .toArray()
            .then(result => {
                if (result.length > 0) {
                    let item = result.find(item => {
                        return item.password === req.body.password
                    })

                    if (item != null) {
                        res.send({
                            id: item.id,
                            firstName: item.firstName,
                            lastName: item.lastName
                        })
                    } else {
                        res.send({
                            message: 'Email or password is wrong!'
                        })
                    }
                } else {
                    res.send({
                        message: 'Email or password is wrong!'
                    })
                }
            })
    },
    getById: (req, res) => {
        get()
            .collection('users')
            .find({
                id: parseInt(req.params.id)
            })
            .toArray()
            .then(result => {
                res.send({
                    message: 'Get user by id.',
                    data: result
                })
            })
            .catch(error => {
                console.log(error)
            })
    },
    deleteOne: (req, res) => {
        get()
            .collection('users')
            .deleteOne(
                {
                    id: parseInt(req.params.id)
                }
            )
            .then(result => {
                res.send({
                    message: 'User is successfully deleted.',
                    data: result
                })
            })
            .catch(error => {
                console.log(error)
            })
    },
    signUp: (req, res) => {
        get()
            .collection('users')
            .find({
                email: req.body.email
            })
            .toArray()
            .then(result1 => {
                if (result1.length > 0) {
                    res.send({
                        message: 'Email have been used!'
                    })

                    return null
                }

                get()
                    .collection('users')
                    .find({})
                    .toArray()
                    .then(result2 => {
                        get()
                            .collection('users')
                            .insertOne({
                                id: parseInt(result2.length) + 1,
                                firstName: req.body.firstName,
                                lastName: req.body.lastName,
                                email: req.body.email,
                                password: req.body.password
                            })
                            .then(result3 => {
                                res.send({
                                    message: 'User is successfully added.'
                                })
                            })
                            .catch(error => {
                                console.log(error)
                            })
                    })
            })
            .catch(error => {
                console.log(error)
            })
    },
    updateOne: (req, res) => {
        get()
            .collection('users')
            .updateOne(
                {
                    id: parseInt(req.params.id)
                },
                {
                    $set: {
                        id: parseInt(req.params.id),
                        firstName: req.body.firstName,
                        lastName: req.body.lastName,
                        email: req.body.email,
                        password: req.body.password
                    }
                }
            )
            .then(result => {
                res.send({
                    message: 'User is successfully updated.',
                    data: result
                })
            })
            .catch(error => {
                console.log(error)
            })
    }
}