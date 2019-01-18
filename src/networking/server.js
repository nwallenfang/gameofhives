const websocketPort = 8000;
const apiPort = 3001; // proxy the calls from react-app to this port

const io = require('socket.io')(websocketPort);
const GameLobby = require('./lobby');

// These are needed for the (REST)API
const express = require('express');
const app = express();
var bodyParser = require('body-parser'); // needed to process POSTs

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

console.log('WebSocket listening on port ', websocketPort);


// TODO split webSocket and API

app.listen(apiPort, function () {
    console.log("API listening on port " + apiPort);
});

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies


app.post('/register', (request, result) => {
    let username = request.body.username;
    let password = request.body.password;
    console.log("User (" + username + ", " + password + ") is trying to register.");
    result.redirect("/"); // send client back to main-page on submission
});

