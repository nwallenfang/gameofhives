playerCodes = require('./playerCodes');

class GameInstance {
  constructor(height, width) {
    this.gamefield = [];
    for (let i = 0; i < width; i++) {
      this.gamefield.push([]);
      for (let j = 0; j < height; j++) {
        this.gamefield[i].push(playerCodes.NON_SPECIFIED);
      }
    }
    this.height = height;
    this.width = width;
  }

  setField(x, y, playerCode) {
    if (x >= 0 && x < this.width && y >= 0 && y < this.height) {
      this.gamefield[x][y] = playerCode;
    }
  }

  getAdjacentCells(x, y) {
    const toReturn = [];
    const xValues = [x];
    if (x > 0) {
      xValues.push(x - 1);
    }
    if (x < this.width - 1) {
      xValues.push(x + 1);
    }
    const yValues = [y];
    if (y > 0) {
      yValues.push(y - 1);
    }
    if (y < this.width - 1) {
      yValues.push(y + 1);
    }
    xValues.forEach((xValue) => {
      yValues.forEach((yValue) => {
        toReturn.push([xValue, yValue]);
      });
    });
    return toReturn;
  }

  getNewFieldState(x, y) {
    let p1Count = 0;
    let p2Count = 0;
    const adjacentCells = this.getAdjacentCells();
    for (let i = 0; i < adjacentCells.length; i++) {
      const xx = adjacentCells[i][0];
      const yy = adjacentCells[i][1];
      if (this.gamefield[xx][yy] === playerCodes.PLAYER_1) {
        p1Count++;
      } else if (this.gamefield[xx][yy] === playerCodes.PLAYER_2) {
        p2Count++;
      }
    }
    if (p1Count > p2Count) {
      return playerCodes.PLAYER_1;
    }
    if (p2Count > p1Count) {
      return playerCodes.PLAYER_2;
    }
    return this.gamefield[x][y];
  }

  updateField() {
    const futureField = [];
    for (let i = 0; i < this.width; i++) {
      futureField.push([]);
      for (let j = 0; j < this.height; j++) {
        futureField[i].push(this.getNewFieldState());
      }
    }
    this.gamefield = futureField;
  }

  // returns a 2d-array of CSS classes representing the gamefield
  getFieldClasses() {
    var result = [];
    for (let i = 0; i < this.width; i++) {
      result.push([]);
      for (let j = 0; j < this.height; j++) {
        result[i].push(playerCodes.toCSSClass(this.gamefield[i][j]));
      }
    }
    return result;
  }
}

// makes the class GameInstance importable
module.exports = GameInstance;
