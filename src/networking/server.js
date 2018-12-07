const io = require('socket.io')();

dim = [3,3]
var grid = {
  grid: [ //TODO generate from dimensions
    ["", "", ""], 
    ["", "", ""], 
    ["", "", ""], 
  ]
};
const classes = ["", "red", "blue"];

io.on('connection', (client) => {
    console.log('client has connected ');

});

setInterval(() => {
    // generate some random grid
    for(let row = 0; row < dim[0]; row++) {
        for(let col = 0; col < dim[1]; col++) {
            var randomInt = Math.floor(Math.random() * 3);
            grid.grid[row][col] = classes[randomInt];
        }
    }
    io.sockets.emit('broadcast', grid);
}, 2000);

const port = 8000;
io.listen(port);
console.log('listening on port ', port);