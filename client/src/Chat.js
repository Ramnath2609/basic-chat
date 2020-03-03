import React from 'react'
import io from 'socket.io-client'
import Swal from 'sweetalert2'
import { crypter } from './crypter'


class Chat extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            username : '',
            message : '',
            messages : [],
            secret : '',
            authenticated : false
        }

        this.socket = io('localhost:3900')

        this.socket.on('RECEIVE_MESSAGE', function(message){ 
            message.body = crypter(message.body)
            addMessage(message);
        })
        this.socket.on('SET_MESSAGES', function(messages){
            messages.forEach(msg => {
                msg.body = crypter(msg.body)
            })
            setMessages(messages)
        })

        this.socket.on('error', function(data){
            Swal.fire('Oops !', data.notice, 'error')
        })

        this.socket.on('authenticated', function(messages){
            Swal.fire('Good job!', 'Successful', 'success')
            messages.forEach(msg => {
                msg.body = crypter(msg.body)
            })
            setMessages(messages)
        })

        this.socket.on('ACCESS_DENIED', function(){
            Swal.fire('Oops!', 'Access denied', 'error')
        })

        this.socket.on('INVALID_KEY', function(){
            Swal.fire('Oops !', 'Invalid key', 'error')
        })

        const addMessage = (message) => {
            this.setState({ messages: [...this.state.messages, message] });
        }

        const setMessages = (messages) => {
            this.setState({ messages , authenticated : true })
        }
    }

    handleChange = (e) => {
        this.setState({ [e.target.name ] : e.target.value })
    }

    handleSecret = (e) => {
        e.preventDefault()
        this.socket.emit('authenticate', {
            secret : this.state.secret
        })
    }

    handleExit = () => {
        this.setState({ authenticated : false, secret : '' })
    }

    sendMessage = (e) => {
        e.preventDefault()
        this.socket.emit('SEND_MESSAGE', {
            username: this.state.username,
            body : this.state.message,
            secret : this.state.secret
        })
        this.setState({ message: '' })
    }

    render(){
            return (
                <div>
                    <div className="container">
                    <div className="row">
                        { !this.state.authenticated ? (
                            <div className = "offset-md-3 col-md-4" style = {{marginTop : '100px'}}>
                                <h3>Please enter your secret key</h3>
                            <form onSubmit = { this.handleSecret }>
                            <div className = "form-group">
                                    <input type = "text" className ="form-control" name = "username" value = { this.state.username } onChange = { this.handleChange } placeholder = "enter username" />
                                </div>
                                <div className = "form-group">
                                    <input type = "text" className ="form-control" name = "secret" value = { this.state.secret } onChange = { this.handleChange } placeholder = "enter secret key" />
                                </div>
                                 <button type = "submit" className = "btn btn-primary">Submit</button>
                            </form>
                        </div>
                        ) : (
                            <div className="offset-md-3 col-md-4" style = {{marginTop : '100px'}}>
                            <div className="card">
                                <div className="card-body">
                                    <div className="card-title">Chat</div>
                                    <hr/>
                                    <div className="messages">
                                        {
                                            this.state.messages.map(msg => {
                                                return (
                                                    <div key = {msg._id}>
                                                        {msg.username} : {msg.body}
                                                    </div>
                                                )
                                            })
                                        }
                                    </div>
                                </div>
                                <div className="card-footer">
                                        <input type="text" name = "message" placeholder="Message" value = { this.state.message } onChange = { this.handleChange } className="form-control"/>
                                        <br/>
                                        <button onClick={this.sendMessage} className="btn btn-primary form-control">Send</button><hr/>
                                        <button className = "btn btn-primary form-control" onClick ={this.handleExit}>Exit</button>
                                </div>
                            </div>
                        </div>
                        )
                            
                        }
                       
                    </div>
                </div>
                </div>
            )
        
        
    }
}

export default Chat