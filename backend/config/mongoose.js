

const mongoose = require('mongoose');

const MongoURl = process.env.NODE_ENV == 'production' ? process.env.PROD_MONGOOSE_URL : process.env.MONGOOSE_URL

try {
    mongoose.connect(MongoURl).then(() => {
        console.log(` Mongoose connected to database: ${mongoose.connection.name}`);


    })
} catch (error) {
    console.error('Mongoose connection error:', error);

}