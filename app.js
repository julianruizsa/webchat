'use strict'

var express = require('express');
var app = express();
var http = require('http').createServer(app);
var io = require('socket.io')(http);
var port = process.env.PORT || 3000;
var publicDir = express.static(`${__dirname}/public`);

app.use(publicDir);
app.get('/', (req,res)=>{

    res.sendFile(`${publicDir}/index.html`);

});

http.listen(port, ()=>{

    console.log('Iniciando express y socket.io en localhost:%d', port);
})

io.on('connection', (socket)=>{

    socket.broadcast.emit('new user', {message: 'Ha entrado un nuevo integrante al chat'});

    socket.on('new message', (message)=>{

        io.emit('user says', message);
    });

    socket.on('disconnect', ()=>{
        socket.broadcast.emit('bye user', {message: 'Ha salido un usuario del chat'});
    })
})


