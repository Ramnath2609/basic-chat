const mongoose = require('mongoose')
const Schema = mongoose.Schema

const messageSchema = new Schema({
    body : {
        type : String,
        required : true,
        
    },
    username : {
        type : String,
        required : true
    }
})

const Message = mongoose.model('Message', messageSchema)

module.exports = Message