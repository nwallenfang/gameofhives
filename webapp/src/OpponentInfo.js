import React, { Component } from 'react';

/**
 * show who is playing against whom and show the player's colors
 */
export class OpponentInfo extends Component {
    render() {
        let playerName, opponentName;
        let playerColor, opponentColor;
        playerName = (
            <h2>{this.props.playerName}</h2>
        );
        playerColor = (
            <div id="colorInfoDiv" className={"playerColorSquare " + this.props.playerColor} ></div>
        );
        opponentName = (
            <h2 >{this.props.opponentName}</h2>
        );
        opponentColor = (
            <div id="colorInfoDiv" className={"playerColorSquare " + this.props.opponentColor} ></div>
        );
        return (
            <span>
                {playerName}
                {playerColor}
                <h2>vs.</h2>
                {opponentName}
                {opponentColor}
            </span>
        );

    }
}

