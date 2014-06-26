var WebSocketServer = new require('ws');
// подключенные клиенты
var clients = {};
var idNum = 0;

// WebSocket-сервер на порту 8081

var webSocketServer = new WebSocketServer.Server({port: 8081});

webSocketServer.on('connection', function(ws) {
    idNum += 1;

    var id = "USER" + idNum;

    clients[id] = ws;

    console.log("новое соединение " + id);

    ws.on('message', function(message) {

        console.log('получено сообщение ' + message);
        for(var key in clients) {
            clients[key].send(id + ";" + message);
        }
    });

    ws.on('close', function() {
        console.log('соединение закрыто ' + id);
        delete clients[id];
    });
});
