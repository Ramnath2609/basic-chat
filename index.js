const express = require('express')
const app = express()
const Message = require('./app/models/Message')
const port = process.env.PORT || 3900
const decrypt = require('./app/middlewares/decryption')
const cors = require('cors')
const path = require('path')
const setUpDB = require('./config/database')
const socket = require('socket.io')

setUpDB()
app.use(express.json())
app.use(cors())

app.use(express.static(path.join(__dirname,"client/build"))) 
app.get("*",(req,res) => { 
    res.sendFile(path.join(__dirname + "/client/build/index.html")) 
}) 

const server = app.listen(port, () => {
    console.log('connected to port', port)
})
io = socket(server)


io.on('connection', (socket) => {
    socket.auth = false
    socket.on('authenticate', function(data){
        if(data.secret == "secret123"){
            Message.find()
            .then(messages => {
                messages.forEach(msg => {
                    msg.body = decrypt(msg.body)
                })
                io.emit('SET_MESSAGES', messages)
            })
            socket.auth = true
        }
    })
    socket.on('SEND_MESSAGE', function(data){
    const message = new Message(data)
    message.save()
        .then(message => {
            message.body = decrypt(message.body)
            io.emit('RECEIVE_MESSAGE', message)
        })
    })
        socket.on('GET_MESSAGES', function(){
            Message.find()
                .then(messages => {
                    messages.forEach(msg => {
                        msg.body = decrypt(msg.body)
                    })
                    io.emit('SET_MESSAGES', messages)
                })
        })
})



