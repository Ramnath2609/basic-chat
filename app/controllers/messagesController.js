const Message = require('../models/Message')

module.exports.create = (req, res) => {
    const body = req.body
    const message = new Message(body)
    message.save()
        .then(message => {
            res.send(message)
        })
        .catch(err => {
            res.send(err)
        })
}


module.exports.list = (req, res) => {
    Message.find()
        .then(messages => {
            res.send(messages)
        })
        .catch(err => {
            res.send(err)
        })
}