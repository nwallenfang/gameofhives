module.exports = {
    NON_SPECIFIED: 0,
    PLAYER_1: 1,
    PLAYER_2: 2,
    toCSSClass(playerCode) {
        switch(playerCode) {
            case 1: return 'red';
            case 2: return 'blue';
            case 0: return '';
        }
    }
};