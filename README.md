# NodeJS-Chat

This is a very basic Node JS / Socket.io chat application. It has very basic functionality / interface. Extending this app would be simple & so much could be done with it. Currently it is just a multi way conversation over using socket.io, the messages sent are not stored anywhere, this is something that could be added to extend the functionality.

I developed this on a system with the following specs
 - CentOS 6.7 (Final Release)
 - NodeJS v0.10.40
 - NPM v1.4.28
 - MySQL 5.1.73

# Features
 - Username set, to identify you from other users
 - Show your messages as 'You' in bold, to stand out that you sent them
 - Basic database functionality to store messages / username
 - Started implementing online / offline feature, to show users currently online

# TODO
 - Complete online / offline feature
  - This will show users currently online
  - This will be a true / false value in database users table
 - Make window scroll when new message is recieved
 - Add alert sound of some kind when message is recieved?
 - Add profiles for users?
 
# How To Setup

To use this application follow the instructions below:
 - Download + Install Node JS
 - Download the zip file + unzip it to a location of your choice (make a note of the location)
 - You need to edit the index.js to reflect the location of the index.html. This has to be the full path to the file; example: /home/yourusername/nodechat/index.html
 - Go to the location & run the command `node index.js` (without quotations). You should see a message in the console saying `listening on *:3000`
 - Now browse to localhost:3000, when prompted type a username (This is to identify a user who sent the message)
 - Click in the message field & type a message. Once done click save. This should then send the message & it should appear in the chat area under the name field

# Useful information
 - This application is, by no means stable. It should NOT be used in a production environment without majour modifications
 - This is a very basic implementation of a chat application / chat room
 - This is an open source project, do with the code as you wish
 - If you have a feature you wish for me to add then please send me an email & I will consider it (acixdigitalsolutions@gmail.com)
 - If you find a bug then please contact me & let me know, I will try to fix it as soon as possible
 - Overall this is just something I am building while I learn Node, I do not wish to team up with anybody at this time although this is something I may consider in the future.
 - Any questions then please, do not hesitate to drop me an email (acixdigitalsolutions@gmail.com)

Created By Dean Cole (2015)
