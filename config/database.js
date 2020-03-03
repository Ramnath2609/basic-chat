const mongoose = require('mongoose')

const setUpDB = () => {
    mongoose.connect('mongodb+srv://ramanthdb:ramnath@cluster0-mhiwr.mongodb.net/basic-chat?retryWrites=true&w=majority', { useNewUrlParser : true, useUnifiedTopology : true }, (err) => {
    if(err){
        console.log(err)
    }
        console.log('connected to db')   
    })
}

module.exports = setUpDB