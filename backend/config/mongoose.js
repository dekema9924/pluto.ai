

const mongoose = require('mongoose');

const MongoURl = process.env.NODE_ENV == 'production' ? PROD_MONGOOSE_URL : process.env.MONGOOSE_URL
console.log(MongoURl)

try {
    mongoose.connect(`${MongoURl}/plutoai`).then(() => {
        console.log('mongoose connected')
    })
} catch (error) {
    console.log(error)
}