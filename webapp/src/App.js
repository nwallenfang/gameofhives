import React, { Component } from 'react';
import './App.css';
import openSocket from 'socket.io-client';
import { setInterval } from 'timers';
import { Button, ButtonGroup } from 'react-bootstrap';

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
    return (  // {...} entspricht <script> ... </script>
      <button className={"square " + this.props.class}
              onClick={() => this.props.onClick()} />
    );
  }
}

class Board extends React.Component {
  constructor(props) {
    super(props);
    // server broadcasts the game state in a regular interval
    // set Board state to trigger an automatic render
    socket.on('dataBroadcast', data => this.setState(data));
    
    this.state = {
       boardData: [
      ]
    }
    
  }
  render() { // whole board has to be rendered on every state change
    let loadingBar;
    if(this.state.tickLength !== undefined) {
      loadingBar = <LoadingBar tickLength={this.state.tickLength} />
    } else {
      loadingBar = <div />
    }
    return (
      <div id="wrapper">
        {loadingBar}
        <div className="game">
          <div className="game-board">
            <div id="wrapper" className="verticalContainer">
              {[...Array(this.state.boardData.length)].map((_, rowIndex) =>
                <div className="board-row" key={rowIndex}>
                  {[...Array(this.state.boardData[rowIndex].length)].map((_, columnIndex) =>
                    <Square key={rowIndex * columnIndex + columnIndex} 
                    class={this.state.boardData[rowIndex][columnIndex]}
                    onClick = {() => {
                      socket.emit("clickEvent", {
                        rowIndex: rowIndex,
                        columnIndex: columnIndex,
                    })}}/>
                  )}
                </div>
              )}
            </div>
            </div>
        </div>
        </div>
    );
  }
}

class LoadingBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      width: 0,

    }
    socket.on('dataBroadcast', data => {
      this.setState({
        width: 0
      });
    });
    setInterval(() => {
      this.setState((prevState, props) => {
        if(prevState.width < 100) {
          return ({
            width: prevState.width + 1
          });
        } else {
          return prevState;
        }
      });
    }, this.props.tickLength/100);
    
  }

  render() {
    let widthStyle = {
      width: this.state.width + '%',
    }
    return (
      <div id="myProgress">
        <div id="myBar" style={widthStyle}></div>
      </div>
    );
  }
}

class App extends Component {

  constructor(props) {
    super(props);
    this.setState({
      ingame: false,
    })
  }
  render() {
    return (
      <div id="wrapper">
        <ButtonGroup className="titleBar" bsSize="large">
          <Button>Register</Button>
          <Button>Login</Button>
          <Button onClick = {() => {socket.emit("join"); console.log("join");} }>Play</Button>
        </ButtonGroup>
        
        <Board />  
      </div>
    );
  }
}

export default App;
