module.exports = {
    NON_SPECIFIED: 0,
    PLAYER_1: 1,
    PLAYER_2: 2,
    toCSSClass(playerCode) {
        switch(playerCode) {
            case PLAYER_1: return 'red';
            case PLAYER_2: return 'blue';
            case NON_SPECIFIED: return '';
        }
    }
};