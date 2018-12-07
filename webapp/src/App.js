import React, { Component } from 'react';
import './App.css';
import openSocket from 'socket.io-client';
// connection to server	
const socket = openSocket('http://localhost:8000');

// [dimRows, dimCols]
const dim = [3, 3];


class Square extends React.Component {
  constructor(props) {
    super(props);
    this.state ={
      class: "",
    }
  }
  render() {
    return (
      <button className={"square " + this.props.class} />
    );
  }
}

class Board extends React.Component {
  constructor(props) {
    super(props);
    // server broadcasts the game state in a regular interval
    // set Board state to trigger an automatic rerender
    socket.on('broadcast', data => this.setState(data));

    this.state = {
       boardData: [
      ]
    }
    // initialize empty grid
    for(let i = 0; i < dim[0]; i++) {
      this.state.boardData.push(Array());
      for(let j = 0; j < dim[1]; j++) {
        this.state.boardData[i].push("");
      }
  }
  }
  render() { // whole board has to be rendered on every state change
    return (
      <div>
        {[...Array(dim[0])].map((_, rowIndex) =>
          <div className="board-row" key={rowIndex}>
            {[...Array(dim[1])].map((_, columnIndex) =>
              <Square key={rowIndex * columnIndex + columnIndex} 
              class={this.state.boardData[rowIndex][columnIndex]}/>
            )}
          </div>
        )}
      </div>
    );
  }
}

class App extends Component {
  render() {
    return (
      <div className="game">
        <div className="game-board">
          <Board />
        </div>
      </div>
    );
  }
}

export default App;
