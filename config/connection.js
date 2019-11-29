const {
    DATABASE_HOST,
    DATABASE_NAME
} = require('./environment'),
    MongoClient = require('mongodb').MongoClient

let mongo

console.log(DATABASE_HOST)
console.log(DATABASE_NAME)

const connect = callback => {
    MongoClient.connect(
        DATABASE_HOST,
        {
            useNewUrlParser: true,
            useUnifiedTopology: true
        },
        function (e, client) {
            if (e) {
                console.log(e)
                throw {
                    error: 'Database connection is failed'
                }
            }

            console.log('Connected to database')

            mongo = client
            callback()
        }
    )
},
    get = () => {
        return mongo.db(DATABASE_NAME)
    },
    close = () => {
        mongo.close
    }

module.exports = {
    connect,
    get,
    close
}

