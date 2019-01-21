const GameInstance = require("../game/GameInstance");
const playerCodes = require('../game/playerCodes');
const io = require("./server")["io"];
const observe_login_logout = require("../db/user_management")["observe_login_logout"];


class Lobby {
    constructor(x_size, y_size, tick_length) {
        this.tick_length = tick_length;
        this.max_game_counts = 0;
        this.games = {};
        this.x_size = x_size;
        this.y_size = y_size;
        this.waiting = null;
        this.player_game_map = {};
        //Logged in users will map a
        this.logged_in_users = {};
        observe_login_logout(this);
    }

    updateElement(login_bool, client_id, username) {
        if (login_bool)
        {
            return this.loginPlayer(client_id, username);
        }
        else
        {
            return this.logoutPlayer(client_id);
        }
    }

    loginPlayer(client_id, username) {
        //Check if player is actually present
        let is_present = io.sockets.sockets[client_id] !== undefined;
        if (!is_present)
        {
            return false;
        }
        console.log("Player " + username + " logged in");
        this.logged_in_users[client_id] = username;
        console.log("Logged in users: " + JSON.stringify(this.logged_in_users));
        return true;
    }

    logoutPlayer(client_id) {
        if (client_id in this.logged_in_users)
        {
            console.log("Player " + this.logged_in_users[client_id] + " logged out");
            delete this.logged_in_users[client_id];
            this.removePlayer(client_id);
            return true;
        }
        return false;
    }

    addPlayer(client) {
        function startGame(client1, client2) {
            this.games[this.max_game_counts] = new Game(client1, client2, this.x_size, this.y_size, this.tick_length);
            this.player_game_map[client1.id] = this.max_game_counts;
            this.player_game_map[client2.id] = this.max_game_counts;
            this.max_game_counts++;
        }
        if (this.waiting === client || client.id in this.player_game_map)
        {
            // Do not add players more than once
            return;
        }
        if (this.waiting === null) {
            this.waiting = client;
        }
        else {
            startGame(this.waiting, client);
            this.waiting = null;
        }
    }

    removePlayer(player_id) {
        if (this.waiting !== null && player_id === this.waiting.id) {
            this.waiting = null;
            return;
        }
        let game_number = this.player_game_map[player_id];
        if (game_number === undefined)
        {
            return;
        }
        delete this.player_game_map[player_id];
        if (--this.games[game_number].connected_players === 0)
        {
            delete this.games[game_number];
        }
    }
}


class Game {
    constructor(client1, client2, x_size, y_size, tick_length) {
        this.gameInstance = new GameInstance(x_size, y_size);
        this.data = {
            boardData: this.gameInstance.getFieldClasses(),
            tickLength: tick_length,
            preselectedTile: {
                rowIndex: undefined,
                colIndex: undefined,
            },
        };
        this.setup_client(client1, 1);
        this.setup_client(client2, 2);
        setInterval(() => {
            // this is the entry point for the game logic
            this.gameInstance.updateField();
            this.data.boardData = this.gameInstance.getFieldClasses();
            // send data to both clients
            client1.emit('dataBroadcast', this.data);
            client2.emit('dataBroadcast', this.data);
        }, tick_length);



        this.connected_players = 2;
    }

    setup_client(client, client_number) {
        console.log('client ' + client.id + ' joined the game');
        let color_data = { color: playerCodes.toCSSClass(client_number)};
        client.emit("playerColor", color_data);
        client.emit("dataBroadcast", this.data);
        let player_code = client_number === 1 ? playerCodes.PLAYER_1 : playerCodes.PLAYER_2;
        (function foo(game_object) {
            client.on('clickEvent', function (data) {
                console.log('client ' + client.id + ' clicked on ' + data.rowIndex + '|' + data.columnIndex);
                game_object.gameInstance.setField(data.columnIndex, data.rowIndex, player_code);
            });
        }(this));
    }
}

module.exports = Lobby;
