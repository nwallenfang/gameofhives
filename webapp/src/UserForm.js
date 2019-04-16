import React, { Component } from 'react';
import { socket } from './Socket';

export class UserForm extends Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event) {
        let username = event.target[0].value;
        let password = event.target[1].value;
        let client_id = event.target[2].value;
        fetch('/' + this.props.action, {
            method: this.props.method,
            headers: {
                "Content-Type": "application/json",
            },
            referrer: "no-referrer", // no-referrer, *client
            body: JSON.stringify({
                username: username,
                password: password,
                client_id: client_id
            }), // body data type must match "Content-Type" header
        })
            .then((response) => {
                return response.json();
            })
            .then((myJson) => {
                if (myJson.success) {
                    // close popup
                    console.log(this.props);
                    this.props.onSuccess({
                        playerName: username
                    });
                } else {
                    // the name is probably already in use
                }
            });
    }

    render() {

        return (
            // eslint-disable-next-line
            <form method={this.props.method} action="javascript:void(0);" onSubmit={this.handleSubmit}>
                <div className="form-group">
                    <label htmlFor="username">Username</label>
                    <input name="username" className="form-control" />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input type="password" name="password" className="form-control" />
                </div>
                <input type="hidden" value={socket.id} name="client_id" />
                <div className="form-group">
                    <input type="submit" className="btn center-block" value={this.props.buttonName} />
                </div>
            </form>
        );
    }
}