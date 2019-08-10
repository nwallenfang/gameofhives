/* eslint-disable indent */
const GameInstance = require('../game/GameInstance');
const playerCodes = require('../game/playerCodes');
const io = require('./server').io;
const observe_login_logout = require('../db/user_management').observe_login_logout;
const increase_gamecount = require('../db/user_management').increase_gamecount;
const increase_wincount = require('../db/user_management').increase_wincount;


class Lobby {
    constructor(x_size, y_size, tick_length) {
        this.tick_length = tick_length;
        this.max_game_counts = 0;
        this.games = {};
        this.x_size = x_size;
        this.y_size = y_size;
        this.waiting = null;
        this.player_game_map = {};
        // Logged in users will map a
        this.logged_in_users = {};
        observe_login_logout(this);
    }

    updateElement(login_bool, client_id, username) {
        if (login_bool) {
            return this.loginPlayer(client_id, username);
        }

        return this.logoutPlayer(client_id);

    }

    loginPlayer(client_id, username) {
        // Check if player is actually present
        const is_present = io.sockets.sockets[client_id] !== undefined;
        if (!is_present) {
            return false;
        }
        console.log('Player ' + username + ' logged in');
        this.logged_in_users[client_id] = username;
        console.log('Logged in users: ' + JSON.stringify(this.logged_in_users));
        return true;
    }

    logoutPlayer(client_id) {
        if (client_id in this.logged_in_users) {
            console.log('Player ' + this.logged_in_users[client_id] + ' logged out');
            delete this.logged_in_users[client_id];
            this.removePlayer(client_id);
            return true;
        }
        return false;
    }

    addPlayer(client) {
        function startGame(this_ref, client1, client2) {
            this_ref.games[this_ref.max_game_counts] = new Game(client1, client2, this_ref.x_size, this_ref.y_size, this_ref.tick_length);
            this_ref.player_game_map[client1.id] = this_ref.max_game_counts;
            this_ref.player_game_map[client2.id] = this_ref.max_game_counts;
            this_ref.max_game_counts++;
        }
        if (this.waiting === client || client.id in this.player_game_map) {
            // Do not add players more than once
            return;
        }
        if (this.waiting === null) {
            this.waiting = client;
        } else {
            startGame(this, this.waiting, client);
            this.waiting = null;
        }
    }

    removePlayer(player_id) {
        if (this.waiting !== null && player_id === this.waiting.id) {
            this.waiting = null;
            return;
        }
        const game_number = this.player_game_map[player_id];
        if (game_number === undefined) {
            return;
        }
        delete this.player_game_map[player_id];
        if (--this.games[game_number].connected_players === 0) {
            delete this.games[game_number];
        }
    }
}


class Game {
    constructor(client1, client2, x_size, y_size, tick_length) {
        this.gameInstance = new GameInstance(x_size, y_size, tick_length, 20, this); // Todo change tick amount
        this.data = {
            boardData: this.gameInstance.getFieldClasses(),
            tickLength: tick_length,
            remaining_ticks: this.gameInstance.remaining_ticks,
            preselectedTile: {
                rowIndex: undefined,
                colIndex: undefined,
            },
        };
        this.setup_client(client1, 1);
        this.setup_client(client2, 2);
        this.client1 = client1;
        this.client2 = client2;
        this.connected_players = 2;
    }

    game_end() {
        increase_gamecount(this.client1);
    }

    observe_change() {
        this.data.boardData = this.gameInstance.getFieldClasses();
        this.data.remaining_ticks = this.gameInstance.remaining_ticks;
        this.client1.emit('dataBroadcast', this.data);
        this.client2.emit('dataBroadcast', this.data);
    }

    setup_client(client, client_number) {
        const player_code = client_number === 1 ? playerCodes.PLAYER_1 : playerCodes.PLAYER_2;
        const other_number = client_number === 1 ? 2 : 1;
        console.log(`client ${client.id} joined the game`);
        const color_data = {
            color: playerCodes.toCSSClass(client_number),
            opponentColor: playerCodes.toCSSClass(other_number)
        };
        client.emit('playerColor', color_data);
        client.emit('dataBroadcast', this.data);
        client.on('clickEvent', (data) => {
            console.log(`client ${client.id} clicked on ${data.rowIndex}|${data.columnIndex}`);
            this.gameInstance.setField(data.columnIndex, data.rowIndex, player_code);
        });
    }
}

module.exports = Lobby;
