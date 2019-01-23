import React, { Component } from 'react';
import './styles/App.css';
import { Button, ButtonGroup } from 'react-bootstrap';
import { Board } from './Board';
// connection to server	
import { socket } from './Socket';
import Popup from 'reactjs-popup';
import { UserForm } from './UserForm';
import { GameInfo } from './GameInfo';

class App extends Component {
  constructor(props) {
    socket.on('playerColor', data => // player stops waiting for opponent
      this.setState((previousState) => { return { ...previousState, color: data.color, waiting: false }; }));

    super(props);
    this.state = {
      waiting: false,
      color: undefined,
      playerName: undefined,
    };
  }
  render() {
    return (
      <div id="wrapper">
        <div className="titleRow">
          <ButtonGroup bsSize="large">
            <Popup trigger={<Button disabled={this.state.playerName !== undefined} >Register</Button>} position="right center" modal>
              {close => ( // pattern taken from https://react-popup.elazizi.com/use-case---modal
                <UserForm method="POST" action="register" buttonName="Register" onSuccess={() => { close(); }} />
              )}
            </Popup>
            <Popup trigger={<Button disabled={this.state.playerName !== undefined}>Login</Button>} position="right center" modal>
              {close => (
                <UserForm method="POST" action="login" buttonName="Login" onSuccess={(data) => {
                  this.setState((previousState) => { return { ...previousState, ...data } });
                  close();
                }} />
              )}
            </Popup>
            <Button onClick={() => {
              socket.emit("join");
              this.setState((prevState) => { return { ...prevState, waiting: rtrue } });
            }} disabled={this.state.playerName === undefined} >Play</Button>
          </ButtonGroup>
          <GameInfo color={this.state.color} playerName={this.state.playerName} waiting={this.state.waiting} />
        </div>
        <Board color={this.state.color} />
      </div >
    );
  }
}

export default App;
