(function (d, io, $){

    'use strict'

    var io = io();

    $('#chat-form').on('submit', function(e){

        e.preventDefault();
        io.emit('new message', $('#message-text').val())
        $('#message-text').val(null);
        return false;
    });

    io.on('new user', function(newUser){

        alert(newUser.message);



    });

    io.on('user says', function (userSays){

        $('#chat').append('<li>'+ userSays + '</li>');

    });

    io.on('bye user', function(byeUser){

        alert(byeUser.message);
    });


})(document, io, jQuery)