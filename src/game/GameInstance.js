
playerCodes = {
    NON_SPECIFIED: 0,
    PLAYER_1: 1,
    PLAYER_2: 2
};

class GameInstance{
    constructor(height, width)
    {
        this.gamefield = [];
        for (let i = 0; i < width; i++)
        {
            this.gamefield.push([]);
            for (let j = 0; j < height; j++)
            {
                this.gamefield[i].push(playerCodes.NON_SPECIFIED);
            }
        }
        this.heigth = height;
        this.width = width;
    }

    setField(x, y, player_code)
    {
        if (0 <= x && x < this.width && 0 <= y && y < this.heigth) {
            this.gamefield[x][y] = player_code;
        }
    }

    getAdjacentCells(x, y)
    {
        let toReturn = [];
        let x_values = [x];
        if (x > 0) {
            x_values.push(x - 1);
        }
        if (x < this.width - 1)
        {
            x_values.push(x + 1);
        }
        let y_values = [y];
        if (y > 0) {
            y_values.push(y - 1);
        }
        if (y < this.width - 1)
        {
            y_values.push(y + 1);
        }
        x_values.forEach(function (x_value) {
            y_values.forEach(function (y_value) {
                toReturn.push([x_value, y_value]);
            })
        });
        return toReturn;
    }

    getNewFieldState(x, y)
    {
        let p1_count = 0;
        let p2_count = 0;
        let adjacentCells = this.getAdjacentCells();
        for (let i = 0; i < adjacentCells.length; i++)
        {
            let xx = adjacentCells[i][0];
            let yy = adjacentCells[i][1];
            if (this.gamefield[xx][yy] === playerCodes.PLAYER_1)
            {
                p1_count++;
            }
            else if (this.gamefield[xx][yy] === playerCodes.PLAYER_2)
            {
                p2_count++;
            }
        }
        if (p1_count > p2_count)
        {
            return playerCodes.PLAYER_1;
        }
        if (p2_count > p1_count)
        {
            return playerCodes.PLAYER_2;
        }
        return this.gamefield[x][y];
    }

    updateField()
    {
        let future_field = [];
        for (let i = 0; i < this.width; i++)
        {
            future_field.push([]);
            for (let j = 0; j < this.heigth; j++)
            {
                future_field[i].push(this.getNewFieldState());
            }
        }
    }
}
