const dotenv = require("dotenv").config();
const app = require("express")();
//const socketioJwt = require('socketio-jwt');
const jwt = require('jsonwebtoken');
const http = require("http").Server(app);
const io = require('socket.io')(http);

const admin = io.of('/admin');
const manager = io.of('/manager');


app.get('/api/admin', (req,res)=> {
    admin.emit('authenticated', 'Server sent a message to admin');
    res.json({Data:"Admin"});
});

app.get('/api/manager', (req,res)=> {
    manager.emit('authenticated', 'Server sent a message to manager');
    res.json({Data:"Manger"});
});


// admin.on('connection', (socket) => {
// 	console.log("Admin connection  " + socket.id);
// });


// admin
//     .on('connection', socketioJwt.authorize({
//     secret: process.env.JWT_SECRET,
//     timeout: 15000 // 15 seconds to send the authentication message
// }))

admin.use((socket,next)=> {
    console.log("here");
    if (socket.handshake.query && socket.handshake.query.token){
        jwt.verify(socket.handshake.query.token, process.env.JWT_SECRET, (err, payload)=> {
            if(err) return socket.disconnect();
            if(payload.role != 'admin') console.log("He is not allowed");
            socket.payload = payload;
            console.log(socket.id)
            next();
        })
    }
    else {
        next(new Error('Authentication error'));
    }
});


manager.use((socket,next)=> {
    if (socket.handshake.query && socket.handshake.query.token){
        jwt.verify(socket.handshake.query.token, process.env.JWT_SECRET, (err, payload)=> {
            if(err) return console.log("Verify Error");
            if(payload.role != 'manager') return socket.disconnect();
            socket.payload123 = payload.role;
            console.log(payload)
            next();
        })
    }
    else {
        next(new Error('Authentication error'));
    }
})





admin.on('connection', (socket) => {
    console.log("Admin connection  " + socket.id);
    socket.on("Test",(id)=>{
        console.log("Client sent data",id);
    })
});


manager.on('connection', (socket) => {
	console.log("Manager connection  " + socket.id);
});


// setTimeout(()=>manager.emit('chat', 'Server sent a message to manager'), 1000);
// setTimeout(()=>admin.emit('chat2', 'Server sent a message to admin'), 2000);



http.listen(4000,()=> console.log('Server is listening on port 4000'));