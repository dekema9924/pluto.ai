

const mongoose = require('mongoose');

try {
    mongoose.connect(process.env.MONGOOSE_URL).then(() => {
        console.log('mongoose connected')
    })
} catch (error) {
    console.log(error)
}