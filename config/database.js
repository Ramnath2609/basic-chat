const mongoose = require('mongoose')

const setUpDB = () => {
    mongoose.connect(process.env.DB_URI, { useNewUrlParser : true, useUnifiedTopology : true }, (err) => {
    if(err){
        console.log(err)
    }
        console.log('connected to db')   
    })
}

module.exports = setUpDB