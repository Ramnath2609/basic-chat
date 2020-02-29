const express = require('express')
const app = express()
const Message = require('./app/models/Message')
const port = 3900
const cors = require('cors')
const setUpDB = require('./config/database')
const router = require('./config/routes')
const socket = require('socket.io')

setUpDB()
app.use(express.json())
app.use(cors())
// app.use('/', router)
const server = app.listen(port, () => {
    console.log('connected to port', port)
})
io = socket(server)

io.on('connection', (socket) => {
    console.log(socket.id)
    socket.on('SEND_MESSAGE', function(data){
        console.log(data)
        const message = new Message(data)
        message.save()
            .then(message => {
                io.emit('RECEIVE_MESSAGE', message)
            })
           
    })
    socket.on('GET_MESSAGES', function(){
        Message.find()
            .then(messages => {
                io.emit('SET_MESSAGES', messages)
            })
    })
})



