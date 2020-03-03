# Chat app
A basic one to one chat application that allows users to communicate with each other. It is done using socket.io.Messages are encrypted and stored in the database and while retrieving it is sent back to the client and decrypted on the client side.Encryption is done with own logic.There isnt any external library added for the purpose of encryption.

![alt imge](https://github.com/Ramnath2609/basic-chat/blob/master/client/src/images/basic-chat-app.jpg)

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
On the homepage it will ask you for a username and a secret key.For simulation purpose I have done it for only two users.You can make use of this secret key - "secret123".On the hompepage enter your username and the above mentioned secret key. Once entered the chatbox will open and it will display all the chat history between the two users. Type the message within the input area. Once done, click on submit and the message will be sent to the other user.If more than two users connect at a same time the socket of the third user will be disconnected. Once you are done with sending messages, click on exit. It will redirect you to the homepage.

# Link
 Link for my chat application
[Basic Chat App](https://basic-chat-app-ram.herokuapp.com/)