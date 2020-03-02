const mongoose = require('mongoose')
const Schema = mongoose.Schema
const crypter = require('../middlewares/crypter')

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

messageSchema.pre('save', function(next){
    const message = this
    message.body = crypter(message.body)
    next()
})


module.exports = Message