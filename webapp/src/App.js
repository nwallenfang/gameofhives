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
    socket.on('playerColor', data =>
      this.setState((previousState) => { return { ...previousState, color: data.color }; }));

    super(props);
    this.state = {
      ingame: false,
      color: undefined,
      playerName: undefined,
    };
  }
  render() {
    return (
      <div id="wrapper">
        <div className="titleRow">
          <ButtonGroup bsSize="large">
            <Popup trigger={<Button>Register</Button>} position="right center" modal>
              {close => ( // pattern taken from https://react-popup.elazizi.com/use-case---modal
                <UserForm method="POST" action="register" buttonName="Register" onSuccess={() => { close(); }} />
              )}
            </Popup>
            <Popup trigger={<Button>Login</Button>} position="right center" modal>
              {close => (
                <UserForm method="POST" action="login" buttonName="Login" onSuccess={(data) => {
                  this.setState((previousState) => { return { ...previousState, ...data } });
                  close();
                }} />
              )}
            </Popup>
            <Button onClick={() => { socket.emit("join"); }}>Play</Button>
          </ButtonGroup>
          <GameInfo color={this.state.color} playerName={this.state.playerName} />
        </div>
        <Board color={this.state.color} />
      </div>
    );
  }
}

export default App;
