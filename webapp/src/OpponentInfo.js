import React, { Component } from 'react';

/**
 * show who is playing against whom and show the player's colors
 */
export class OpponentInfo extends Component {
    render() {
        let playerName, opponentName;
        let playerColor, opponentColor;
        playerName = (
            <div style={{ display: "inline-block", textAlign: "center" }}>
                <h2 style={{ display: "inline-block", textAlign: "center", margin_left: "20px" }}>{this.props.playerName}</h2>
            </div >);
        playerColor = (
            <div style={{ display: "inline-block", textAlign: "center", marginRight: "20px" }}>
                <div id="colorInfoDiv" style={{ display: "inline-block" }} className={"playerColorSquare " + this.props.playerColor} ></div>
            </div >
        );
        opponentName = (
            <div style={{ display: "inline-block", textAlign: "center" }}>
                <h2 style={{ display: "inline-block", textAlign: "center", margin_left: "20px" }}>{this.props.opponentName}</h2>
            </div >);
        opponentColor = (
            <div style={{ display: "inline-block", textAlign: "center", marginRight: "20px" }}>
                <div id="colorInfoDiv" style={{ display: "inline-block" }} className={"playerColorSquare " + this.props.opponentColor} ></div>
            </div >
        );
        return (
            <div>
                {playerName}
                {playerColor}
                <h2>vs.</h2>
                {opponentName}
                {opponentColor}
            </div>
        );

    }
}

