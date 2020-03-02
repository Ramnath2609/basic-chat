const Message = require('../models/Message')
const encryption = require('../middlewares/encryption')

module.exports.list = async () => {
    return Message.find()
                .then(messages => {
                    messages.forEach(msg => {
                        msg.body = encryption(msg.body)
                    })
                    return Promise.resolve(messages)
                })  
}


module.exports.create = async (data) => {
    const message = new Message(data)
    return message.save()
                .then(msg => {
                    msg.body = encryption(msg.body)
                    return Promise.resolve(msg)
                })       
}
    
    