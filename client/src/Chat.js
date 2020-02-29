import React from 'react'
import io from 'socket.io-client'

class Chat extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            username : '',
            message : '',
            messages : []
        }
        this.socket = io('localhost:3900')

        this.socket.on('RECEIVE_MESSAGE', function(data){
            addMessage(data);
        })

        this.socket.on('SET_MESSAGES', function(data){
            setMessages(data)
        })

        const addMessage = data => {
            //console.log(data);
            this.setState({messages: [...this.state.messages, data]});
            console.log(this.state.messages);
        }

        const setMessages = data => {
            this.setState({ messages : data })
        }
    }

    handleChange = (e) => {
        this.setState({ [e.target.name ] : e.target.value })
    }

    componentDidMount(){
        this.socket.emit('GET_MESSAGES')
    }

    sendMessage = (e) => {
        e.preventDefault()
        this.socket.emit('SEND_MESSAGE', {
            username: this.state.username,
            body : this.state.message
        })
        this.setState({message: ''})
    }

    render(){
        return (
            <div>
                 <div className="container">
                <div className="row">
                    <div className="col-4">
                        <div className="card">
                            <div className="card-body">
                                <div className="card-title">Global Chat</div>
                                <hr/>
                                <div className="messages">
                                    {
                                        this.state.messages.map(msg => {
                                            return (
                                                <div>
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
                </div>
            </div>
            </div>
        )
    }
}

export default Chat