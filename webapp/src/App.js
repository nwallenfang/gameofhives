import React, { Component } from 'react';
import './styles/App.css';
import { Button, ButtonGroup } from 'react-bootstrap';
import { Board } from './Board';
// connection to server	
import { socket } from './Socket';

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
