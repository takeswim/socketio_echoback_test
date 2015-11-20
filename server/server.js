var io = require('socket.io');
var server = io.listen(8080, function () {
    // console.log('Server running at port 8080');
});
server.sockets.on('connection', function(socket) {
    // console.log('connect:'+socket.id);
    socket.on('message', function(data) {
        var time = process.hrtime();
        var time_now = (time[0]*1e9 + time[1])/1000000000;
        console.log(time_now+','+data);
        server.to(socket.id).emit('message',data);//echo back
    });
});
