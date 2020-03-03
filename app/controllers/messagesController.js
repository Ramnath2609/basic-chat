const Message = require('../models/Message')
const crypter = require('../middlewares/crypter')

module.exports.list = () => {
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


module.exports.create = (data) => {
    const message = new Message(data)
    return message.save()
                .then(message => {
                    message.body = crypter(message.body)
                    return Promise.resolve(message)
                })
                .catch(err => {
                    return Promise.reject(err)
                })       
}
    
    