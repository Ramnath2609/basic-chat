const Message = require('../models/Message')
const crypter = require('../middlewares/crypter')

module.exports.list = () => {
    return Message.find()
                .then(messages => {
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
                    return Promise.resolve(message)
                })
                .catch(err => {
                    return Promise.reject(err)
                })       
}
    
    