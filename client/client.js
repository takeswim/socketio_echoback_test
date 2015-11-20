var io = require('socket.io-client');
var url = "ws://192.168.0.100:8080";// server addr
var options = {
    'force new connection':true
};

var worker = function(i) {
    var socket = io.connect(url, options);
    socket.on('connect', function(data) {
        //    console.log("connect. connectCounter=" + i);
    });
    // recieve echoback
    socket.on('message', function (msg) {
        var time = process.hrtime();
        console.log(i+','+msg+','+(time[0]*1e9 + time[1])/1000000000);
    });
    // send with interval 100msec
    setInterval(function(){
        var time = process.hrtime();
        socket.emit("message", i + ',' + (time[0]*1e9 + time[1])/1000000000);
    },100);
};

// start clients
var ii = [];
while(ii.length < 300) {
    ii.push(ii.length);
}
ii.reduce(function(promise, num) {
    return promise.then(function(value) {
        return new Promise(function(onFulfilled, onRejected) {
            setTimeout(function() {
                worker(num);
                onFulfilled(num);
            }, 33);
        });
    });
}, Promise.resolve()).then(function(value) {
    //
});
