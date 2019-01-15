import React, { Component } from 'react';
import './App.css';
import openSocket from 'socket.io-client';
import { setInterval } from 'timers';
import { Button, ButtonGroup } from 'react-bootstrap';

// connection to server	
const socket = openSocket('http://localhost:8000');



class Square extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      class: "",
      isPreselected: false,
    }
  }
  render() {
    return (  // {...} entspricht <script> ... </script>
      <button className={"square " + this.props.class + (this.props.preselected ? " lighterBackground " + this.props.color : " ")}
        onClick={() => {
          this.setState((prevState) => { return { ...prevState, isPreselected: true }; });
          this.props.onClick();
        }} />
    );
  }
}

class Board extends React.Component {
  constructor(props) {
    super(props);
    // server broadcasts the game state in a regular interval
    // set Board state to trigger an automatic render
    socket.on('dataBroadcast', data =>
      this.setState((previousState) => { return { ...previousState, ...data }; }));
    socket.on('playerColor', data =>
      this.setState((previousState) => { return { ...previousState, color: data.color }; }));
    this.state = {
      boardData: [
      ],
      preselectedTile: {
        rowIndex: undefined,
        colIndex: undefined,
      },
      color: undefined // move to props and load color in the beginning
    }
  }

  render() { // whole board has to be rendered on every state change
    let loadingBar;
    if (this.state.tickLength !== undefined) {
      loadingBar = <LoadingBar tickLength={this.state.tickLength} />
    } else { // don't show a loadingBar if the server has not sent tickLength yet
      loadingBar = <div />
    }
    return (
      <div id="wrapper">
        {loadingBar}
        <div className="game">
          <div className="game-board">
            {[...Array(this.state.boardData.length)].map((_, rowIndex) =>
              <div className="board-row" key={rowIndex}>
                {[...Array(this.state.boardData[rowIndex].length)].map((_, columnIndex) =>
                  <Square key={rowIndex * this.state.boardData[rowIndex].length + columnIndex}
                    class={this.state.boardData[rowIndex][columnIndex]}
                    onClick={() => {
                      // send every click to the server
                      socket.emit("clickEvent", {
                        rowIndex: rowIndex,
                        columnIndex: columnIndex,
                      });
                      // save coordinates of the latest selection in state in order to render 
                      // the square differently
                      this.setState((oldState) => {
                        return {
                          ...oldState, preselectedTile: {
                            rowIndex: rowIndex, colIndex: columnIndex
                          }
                        };
                      });
                    }}
                    preselected={rowIndex === this.state.preselectedTile.rowIndex && columnIndex === this.state.preselectedTile.colIndex}
                    // at the moment, color property is only used to render the preselected square
                    // maybe the player's color should be displayed in the title bar in the 
                    // beginning of the game
                    color={this.state.color}
                  />
                )}
              </div>
            )}
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
    socket.on('dataBroadcast', () => {
      this.setState({
        width: 0
      });
    });
    setInterval(() => {
      this.setState((prevState, props) => {
        if (prevState.width < 100) {
          return ({
            width: prevState.width + 1
          });
        } else {
          return prevState;
        }
      });
    }, this.props.tickLength / 100);

  }

  render() {
    let widthStyle = {
      width: this.state.width + '%',
    };
    return (
      <div id="myProgress">
        <div id="myBar" style={widthStyle} />
      </div>
    );
  }
}

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      ingame: false,
    };
  }
  render() {
    return (
      <div id="wrapper">
        <ButtonGroup className="titleBar" bsSize="large">
          <Button>Register</Button>
          <Button>Login</Button>
          <Button onClick={() => { socket.emit("join"); }}>Play</Button>
        </ButtonGroup>

        <Board />
      </div>
    );
  }
}

export default App;
