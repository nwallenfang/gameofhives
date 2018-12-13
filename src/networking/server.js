const io = require('socket.io')();
// number of rows, number of columns, keep a ratio of 9:16
const dim = [9,16];
// time per tick in ms
const tickLength = 2000;
// list of possible square states. define a css class for each of these in the frontend
const classes = ["", "red", "blue"];

const port = 8000;

// count clients to give each one a unique id
var clientCounter = 0;


var data = {
  // 2d-array of square states
  boardData: [ 
  ]
};

for(let i = 0; i < dim[0]; i++) {
    data.boardData.push(Array());
    for(let j = 0; j < dim[1]; j++) {
        data.boardData[i].push("");
    }
}

io.on('connection', (client) => {
    console.log('client' + client.id + ' has connected');
    client.on('clickEvent', function(data){
        console.log('client' + client.id + ' clicked on ' + data.rowIndex + '|' + data.columnIndex);
    });
});

setInterval(() => {
    // this is the entry point for the game logic
    // generate some random grid for now
    for(let row = 0; row < dim[0]; row++) {
        for(let col = 0; col < dim[1]; col++) {
            var randomInt = Math.floor(Math.random() * classes.length);
            data.boardData[row][col] = classes[randomInt];
        }
    }
    // send data to every client
    io.sockets.emit('broadcast', data);
}, tickLength);


io.listen(port);
console.log('listening on port ', port);