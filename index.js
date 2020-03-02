const express = require('express')
const app = express()
const messagesController = require('./app/controllers/messagesController')
const port = process.env.PORT || 3900
const cors = require('cors')
const path = require('path')
const setUpDB = require('./config/database')
const socket = require('socket.io')

setUpDB()

app.use(express.static(path.join(__dirname,"build"))) 
app.use(express.json())
app.use(cors())

app.get("*",(req,res) => { 
    res.sendFile(path.resolve(__dirname,  "client" ,"build" ,"index.html")) 
}) 

const server = app.listen(port, () => {
    console.log('connected to port', port)
})


io = socket(server)
io.on('connection', (socket) => {
    socket.auth = false
    socket.on('authenticate', function(data){
        if(data.secret == "secret123"){
            messagesController.list()
            .then(messages => {
                io.emit('authenticated', messages)
                socket.auth = true
            })   
        } else  {
            io.emit('INVALID_KEY')
        }
    })

    socket.on('SEND_MESSAGE', function(data){
        messagesController.create(data)
            .then(message => {
                io.emit('RECEIVE_MESSAGE', message)
            })
    })

    socket.on('GET_MESSAGES', function(){
        messagesController.list()
            .then(messages => {
                io.emit('SET_MESSAGES', messages)
            })
    })
})


