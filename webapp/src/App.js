import React, { Component } from 'react';
import './App.css';
import openSocket from 'socket.io-client';
// connection to server	
const socket = openSocket('http://localhost:8000');

// [dimRows, dimCols]


class Square extends React.Component {
  constructor(props) {
    super(props);
    this.state ={
      class: "",
    }
  }
  render() {
    return (
      <button className={"square " + this.props.class}
              onClick={() => this.props.onClick()} />
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
    
  }
  render() { // whole board has to be rendered on every state change
    return (
      <div id="wrapper" className="verticalContainer">
        {[...Array(this.state.boardData.length)].map((_, rowIndex) =>
          <div className="board-row" key={rowIndex}>
            {[...Array(this.state.boardData[rowIndex].length)].map((_, columnIndex) =>
              <Square key={rowIndex * columnIndex + columnIndex} 
              class={this.state.boardData[rowIndex][columnIndex]}
              onClick = {() => {console.log("clicked"); socket.emit("clickEvent", {
                rowIndex: rowIndex,
                columnIndex: columnIndex,
              })}}/>
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
