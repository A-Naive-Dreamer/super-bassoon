const compared = require('./compared'),
    hash = require('./hash')

module.exports = {
    hashPassword: hash,
    comparePassword: compared
}