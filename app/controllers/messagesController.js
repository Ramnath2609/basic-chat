const Message = require('../models/Message')
const crypter = require('../middlewares/crypter')

module.exports.list = async () => {
    return Message.find()
                .then(messages => {
                    messages.forEach(msg => {
                        msg.body = crypter(msg.body)
                    })
                    return Promise.resolve(messages)
                })
                .catch(err => {
                    return Promise.reject(err)
                })  
}


module.exports.create = async (data) => {
    const message = new Message(data)
    return message.save()
                .then(msg => {
                    msg.body = crypter(msg.body)
                    return Promise.resolve(msg)
                })
                .catch(err => {
                    return Promise.reject(err)
                })       
}
    
    