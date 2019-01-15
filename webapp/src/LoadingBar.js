import React, { Component } from 'react';
import { socket } from './Socket';

export class LoadingBar extends Component {
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

