import React, { Component } from 'react';

export class UserForm extends Component {
    render() {
        return (
            <form method={this.props.method} action={this.props.action}>
                <div class="form-group">
                    <label for="user">Username</label>
                    <input name="user" class="form-control" />
                </div>
                <div class="form-group">
                    <label for="pw">Password</label>
                    <input type="password" name="pw" class="form-control" />
                </div>
                <div class="form-group">
                    <input type="submit" class="btn center-block" value={this.props.buttonName} />
                </div>
            </form>
        );
    }
}