import React, { Component } from 'react';
import { socket } from './Socket';

export class UserForm extends Component {
    constructor() {
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event) {

    }

    render() {
        return (
            <form method={this.props.method} action={this.props.action} onSubmit={this.handleSubmit}>
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