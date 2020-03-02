const mongoose = require('mongoose')
const Schema = mongoose.Schema
const encryption = require('../middlewares/encryption')

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


messageSchema.pre('save', function(next){
    const message = this
    message.body = encryption(message.body)
    next()
})


const Message = mongoose.model('Message', messageSchema)

module.exports = Message