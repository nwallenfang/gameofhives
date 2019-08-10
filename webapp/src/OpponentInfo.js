import React, { Component } from 'react';

/**
 * show who is playing against whom and show the player's colors
 */
export class OpponentInfo extends Component {
    render() {
        let playerName, opponentName;
        let playerColor, opponentColor;
        let playerScore, opponentScore;

        playerScore = (
            <h2>{this.props.playerScore}</h2>
        );
        opponentScore = (
            <h2>{this.props.opponentScore}</h2>
        );

        playerColor = (
            <span id="colorInfoDiv" className={"playerColorSquare " + this.props.playerColor} ></span>
        );
        opponentColor = (
            <span id="colorInfoDiv" className={"opponentColorSquare " + this.props.opponentColor} ></span>
        );
        return (
            <span >
                <div id="playerInfo">
                    <h2>
                        {playerColor}
                        {this.props.playerName}
                        {playerScore}
                    </h2>
                </div>
                <div id="opponentInfo">
                    <h2>
                        {this.props.opponentName}
                        {opponentColor}
                        {opponentScore}
                    </h2>
                </div>
            </span>
        );

    }
}

