import React, { Component } from 'react';
import './styles/App.css';
import { Button, ButtonGroup } from 'react-bootstrap';
import { Board } from './Board';
// connection to server	
import { socket } from './Socket';
import Popup from 'reactjs-popup';
import { UserForm } from './UserForm';
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
          <Popup trigger={<Button>Register</Button>} position="right center" modal>
            <UserForm method="POST" action="" buttonName="Register" />
          </Popup>
          <Popup trigger={<Button>Login</Button>} position="right center" modal>
            <UserForm method="POST" action="" buttonName="Login" />
          </Popup>
          <Button onClick={() => { socket.emit("join"); }}>Play</Button>
        </ButtonGroup>
        <Board />
      </div>
    );
  }
}

export default App;
