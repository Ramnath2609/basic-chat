const mongoose = require('mongoose')

const setUpDB = () => {
    mongoose.connect('mongodb+srv://ramanthdb:mz4258%2EY%2AX%5D%23S%3FH@cluster0-mhiwr.mongodb.net/test?retryWrites=true&w=majority' || 'mongodb://localhost:27017/basic-chat', { useNewUrlParser : true, useUnifiedTopology : true }, () => {
        console.log('connected to db')
    })
}

module.exports = setUpDB