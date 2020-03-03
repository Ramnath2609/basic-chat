const express = require('express')
const app = express()
const messagesController = require('./app/controllers/messagesController')
const port = process.env.PORT || 3900
require('dotenv').config()
const cors = require('cors')
const path = require('path')
const setUpDB = require('./config/database')
const socket = require('socket.io')

setUpDB()

app.use(express.static(path.join(__dirname,"client/build"))) 
app.use(express.json())
app.use(cors())

app.get("*",(req,res) => { 
    res.sendFile(path.join(__dirname + "/client/build/index.html")) 
}) 

const server = app.listen(port, () => {
    console.log('connected to port', port)
})


io = socket(server)
io.on('connection', (socket) => {
    
       if(io.eio.clientsCount > 2){
       socket.emit('ACCESS_DENIED')
       socket.disconnect()
       return
    }

    socket.on('authenticate', function(data){
        if(data.secret == process.env.SECRET_KEY){
            messagesController.list()
            .then(messages => {
                socket.emit('authenticated',  messages )
            }) 
            .catch(() => {
                socket.emit('error', { notice : 'Couldnt fetch messages'})
            })  
        } else  {
            socket.emit('INVALID_KEY')
        }
    })

    socket.on('SEND_MESSAGE', function(data){
        messagesController.create(data)
            .then(message => {
                io.emit('RECEIVE_MESSAGE', message)
            })
            .catch(() => {
                socket.emit('error', { notice : 'Message not sent, try again !'})
            })
    })

    socket.on('GET_MESSAGES', function(){
        messagesController.list()
            .then(messages => {
                io.emit('SET_MESSAGES', messages)
            })
            .catch(() => {
                socket.emit('error', { notice : 'Couldnt fetch messages' })
            })
    })
 
})


