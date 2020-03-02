const Message = require('../models/Message')
const encryption = require('../middlewares/encryption')

module.exports.list = async () => {
    const messages = await Message.find()
    messages.forEach(msg => {
        msg.body = encryption(msg.body)
    })
    return Promise.resolve(messages)
    
}


module.exports.create = async (data) => {
    const message = new Message(data)
    const msg = await message.save()
    msg.body = encryption(msg.body)
    return Promise.resolve(msg)

}