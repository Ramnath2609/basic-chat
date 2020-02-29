const mongoose = require('mongoose')

const setUpDB = () => {
    mongoose.connect('mongodb://localhost:27017/basic-chat', { useNewUrlParser : true, useUnifiedTopology : true }, () => {
        console.log('connected to db')
    })
}

module.exports = setUpDB