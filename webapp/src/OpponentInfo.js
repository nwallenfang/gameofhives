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
            <span id="colorInfoDiv" className={"playerColorSquare " + this.props.playerColor} ></span>
        );
        // opponentName =
        //     this.props.opponentName }
        //     ;
        opponentColor = (
            <span id="colorInfoDiv" className={"playerColorSquare " + this.props.opponentColor} ></span>
        );
        return (
            <span>
                <h2>
                    {this.props.playerName}
                    {playerColor}
                    vs.
                    {this.props.opponentName}
                    {opponentColor}
                </h2>
            </span>
        );

    }
}

