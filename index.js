let server = require('express'),
    app = server(),
    port = 3000,
    bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.get('/hello', (req, res) => {
    res.status(200).send('Hello I\'m learning express.')
})

app.get('/say', (req, res) => {
    res.status(200).send('Say')
    res.redirect(301, '/hello')
})

app.get('/delete-status', (req, res) => {
    res.status(200).send('Success to delete a post.')
})

app.get('/add-status', (req, res) => {
    res.status(200).send('Success to add a post.')
})

app.get('edit-status', (req, res) => {
    res.status(200).send('Success to edit a post.')
})

app.delete('/delete/post', () => {
    console.log('DELETE')
    res.redirect(301, '/delete-status')
})

app.post('/add/post', (req, res) => {
    res.redirect(301, '/add-status')
})

app.put('/edit/post', (req, res) => {
    console.log('PUT')
})

app.patch('/hi', (req, res) => {
    console.log('PATCH')
})

app.get('/login', (req, res) => {
    res.redirect(301, '/hello')
})

app.get('/pages/:id', (req, res) => {
    res.send(req.params.id + ' is param of this url.')
})

app.get('/download/file', (req, res) => {
    res.download('./index.js')
})

app.post('/sign-up', (req, res) => {
    res.status(200).json({
        email: req.body.email,
        password: req.body.password
    })
})

app.get('*', (req, res) => {
    res.send('Hello World!')
})

app.listen(port, () => {
    console.log('This app is listening on PORT: ' + port)
})