import React, { Component } from 'react';

/**
 * GameInfo shows whether a user is logged in. When ingame, show the player's color.
 * Show how many ticks are remaining until the end of the game. Maybe show the opponent's name.
 * Display the GameInfo in the top right of the screen. 
 */
export class GameInfo extends Component {
    render() {
        let colorInfo;
        let playerName;

        if (this.props.playerName !== undefined) {
            playerName = (
                <div style={{ display: "inline-block", textAlign: "center" }}>
                    <h2 style={{ display: "inline-block", textAlign: "center", margin_left: "20px" }}> Logged in as {this.props.playerName}</h2>
                </div >);
        } else {
            playerName = <div />;
        }

        if (this.props.color !== undefined) {
            colorInfo = (
                <div style={{ display: "inline-block", textAlign: "center" }}>
                    <h2 style={{ display: "inline-block", textAlign: "center" }}> Your color: </h2>
                    <div style={{ display: "inline-block" }} className={"playerColorSquare " + this.props.color} ></div>
                </div >);
        } else {
            colorInfo = <div />;
        }

        return (
            <div id="gameInfo">
                {colorInfo}
                {playerName}
            </div>
        );
    }
}