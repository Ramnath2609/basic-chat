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
    },
    secret : {
        type : String
    }
})


messageSchema.pre('save', function(next){
    const message = this
    const body = []
    for(let i = 0; i < message.body.length; i++){
        let val = String(message.body.charCodeAt(i))
       if(val.length == 2){
           val = '0' + val
       }
        body.push(val)
    }
    body.reverse()
    message.body = body.join('')
    next()
})


const Message = mongoose.model('Message', messageSchema)

module.exports = Message