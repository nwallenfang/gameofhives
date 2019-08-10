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
      this.setState((previousState) => { return { ...previousState, color: data.color, waiting: false, ingame: true, opponentColor: data.opponentColor }; }));

    super(props);
    this.state = {
      ingame: false,
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
                <UserForm method="POST" action="api/register" buttonName="Register" onSuccess={() => { close(); }} />
              )}
            </Popup>
            <Popup trigger={<Button disabled={this.state.playerName !== undefined}>Login</Button>} position="right center" modal>
              {close => (
                <UserForm method="POST" action="api/login" buttonName="Login" onSuccess={(data) => {
                  this.setState((previousState) => { return { ...previousState, ...data } });
                  close();
                }} />
              )}
            </Popup>
            <Button onClick={() => {
              socket.emit("join");
              this.setState((prevState) => { return { ...prevState, waiting: true } });
            }} disabled={this.state.playerName === undefined || this.state.ingame || this.state.waiting} >Play</Button>
            <Button onClick={() => {
              socket.emit("leave");
              this.setState((prevState) => { return { ...prevState, waiting: false, ingame: false, color: undefined } });
            }} disabled={this.state.playerName === undefined || (!this.state.waiting && !this.state.ingame)} >Back to Lobby</Button>
          </ButtonGroup>
          <GameInfo color={this.state.color} playerName={this.state.playerName} waiting={this.state.waiting} />
        </div>
        <Board color={this.state.color} disabled={!this.state.ingame} playerName={this.state.playerName} opponentName={this.state.opponentName} opponentColor={this.state.opponentColor} />
      </div >
    );
  }
}

export default App;
