const {
    JWT_SECRET_KEY,
    get
} = require('../../config'),
    {
        comparePassword,
        hashPassword
    } = require('../../helpers'),
    jwt = require('jsonwebtoken')

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
        try {
            get()
                .collection('users')
                .find(
                    {
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
                .then(async result => {
                    if (result.length > 0) {
                        let id = result[0].id,
                            firstName = result[0].firstName,
                            lastName = result[0].lastName,
                            password = result[0].password

                        let decision = await comparePassword(req.body.password, password)

                        if (decision) {
                            const token = jwt.sign(
                                {
                                    id,
                                    firstName,
                                    lastName
                                },
                                JWT_SECRET_KEY,
                                {
                                    expiresIn: '1d'
                                }
                            )

                            res.send({
                                token
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
        } catch (error) {
            console.log(error)
        }

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
                    .then(async result2 => {
                        let password = await hashPassword(req.body.password)

                        get()
                            .collection('users')
                            .insertOne({
                                id: parseInt(result2.length) + 1,
                                firstName: req.body.firstName,
                                lastName: req.body.lastName,
                                email: req.body.email,
                                password: password
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