

const mongoose = require('mongoose');

const MongoURl = process.env.NODE_ENV == 'production' ? process.env.PROD_MONGOOSE_URL : process.env.MONGOOSE_URL
console.log(MongoURl)

try {
    mongoose.connect(`${MongoURl}/plutoai`).then(() => {
        console.log('Mongoose connected to plutoai database');

    })
} catch (error) {
    console.error('Mongoose connection error:', error);

}