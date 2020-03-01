import React from 'react'
import io from 'socket.io-client'

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

        this.socket.on('RECEIVE_MESSAGE', function(data){
            addMessage(data);
        })
        this.socket.on('SET_MESSAGES', function(data){
            setMessages(data)
        })

        const addMessage = data => {
            this.setState({messages: [...this.state.messages, data]});
            console.log(this.state.messages);
        }

        const setMessages = data => {
            this.setState({ messages : data, authenticated : true })
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

    sendMessage = (e) => {
        e.preventDefault()
        this.socket.emit('SEND_MESSAGE', {
            username: this.state.username,
            body : this.state.message,
            secret : this.state.secret
        })
        this.setState({message: ''})
    }

    render(){
            return (
                <div>
                    <div className="container">
                    <div className="row">
                        { !this.state.authenticated ? (
                            <div className = "col-md-3" style = {{marginTop : '100px'}}>
                            <form onSubmit = { this.handleSecret }>
                                <div className = "form-group">
                                    <input type = "text" className ="form-control" name = "secret" value = { this.state.secret } onChange = { this.handleChange } placeholder = "enter secret key" />
                                </div>
                                 <button type = "submit" className = "btn btn-primary">Submit</button>
                            </form>
                        </div>
                        ) : (
                            <div className=" col-md-4">
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
                                        <input type="text" name = "username" placeholder="Username" onChange = { this.handleChange } value = { this.state.username } className="form-control"/>
                                        <br/>
                                        <input type="text" name = "message" placeholder="Message" value = { this.state.message } onChange = { this.handleChange } className="form-control"/>
                                        <br/>
                                        <button onClick={this.sendMessage} className="btn btn-primary form-control">Send</button>
    
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