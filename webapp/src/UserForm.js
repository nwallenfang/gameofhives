import React, { Component } from 'react';

export class UserForm extends Component {
    render() {
        return (
            <form method={this.props.method} action={this.props.action}>
                <div class="form-group">
                    <label for="username">Username</label>
                    <input name="username" class="form-control" />
                </div>
                <div class="form-group">
                    <label for="password">Password</label>
                    <input type="password" name="password" class="form-control" />
                </div>
                <div class="form-group">
                    <input type="submit" class="btn center-block" value={this.props.buttonName} />
                </div>
            </form>
        );
    }
}