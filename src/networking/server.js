const io = require('socket.io')();

const dim = [3,3]

var data = {
  boardData: [ 
  ]
};

for(let i = 0; i < dim[0]; i++) {
    data.boardData.push(Array());
    for(let j = 0; j < dim[1]; j++) {
        data.boardData[i].push("");
    }
}

const classes = ["", "red", "blue"];

io.on('connection', () => {
    console.log('client has connected ');

});

setInterval(() => {
    // generate some random grid
    for(let row = 0; row < dim[0]; row++) {
        for(let col = 0; col < dim[1]; col++) {
            var randomInt = Math.floor(Math.random() * classes.length);
            data.boardData[row][col] = classes[randomInt];
        }
    }
    io.sockets.emit('broadcast', data);
}, 500);

const port = 8000;
io.listen(port);
console.log('listening on port ', port);