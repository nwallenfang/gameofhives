const port = 8000;

const io = require('socket.io')(port);
const GameLobby = require('./lobby');
// number of rows, number of columns, keep a ratio of 9:16
const dim = [9, 16];
// time per tick in ms
const tickLength = 4000;
// list of possible square states. define a css class for each of these in the frontend


let gameLobby = new GameLobby(dim[0], dim[1], tickLength);

io.on('connection', (client) => {
    console.log('client ' + client.id + ' has connected');

    client.on('join', () => {
        gameLobby.addPlayer(client);
    });
});

io.on("disconnect", (client) => {
    gameLobby.removePlayer(client.id);
    console.log('client ' + client.id + ' has disconnected');
});

console.log('listening on port ', port);