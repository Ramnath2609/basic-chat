# Chat app
A basic one to one chat application that allows users to communicate with each other. It is done using socket.io.Messages are encrypted and stored in the database and while retrieving it is again decrypted and sent as response.

# Installation
``` bash
npm install
```
``` bash
npm run dev
``` 

# Dependencies
* express
* mongoose
* socket.io
* socket.io-client
* bootstrap
* cors
* concurrently

# Usage
First enter the secret key. Once entered the chatbox will open and it will display all the chat history between the two users. Type your username and also the message within the input area. Once done, click on submit and the message will be sent to the other user.