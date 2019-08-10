import React, { Component } from 'react';

/**
 * GameInfo shows whether a user is logged in. When ingame, show the player's color.
 * Show how many ticks are remaining until the end of the game. Maybe show the opponent's name.
 * Display the GameInfo in the top right of the screen. 
 */
export class GameInfo extends Component {
    render() {
        let colorInfo = <div style={{ display: "inline-block", textAlign: "center" }} />;
        let playerName;
        let playerMsg;
        let waiting = <div style={{ display: "inline-block", textAlign: "center" }} />;

        if (this.props.playerName !== undefined) {
            playerMsg = " Logged in as " + this.props.playerName + "";
        } else {
            playerMsg = "User is not logged in ";
        }
        playerName = (
            <div style={{ display: "inline-block", textAlign: "center" }}>
                <h2 style={{ display: "inline-block", textAlign: "center", margin_left: "20px" }}>{playerMsg}</h2>
            </div >);

        if (this.props.color !== undefined) {
            colorInfo = (
                <div style={{ display: "inline-block", textAlign: "center", marginRight: "20px" }}>
                    <h2 style={{ display: "inline-block", textAlign: "center" }}> Your color: </h2>
                    <div id="colorInfoDiv" style={{ display: "inline-block" }} className={"playerColorSquare " + this.props.color} ></div>
                </div >);
        }

        if (this.props.waiting) {
            waiting = (
                <div style={{ display: "inline-block", textAlign: "center" }}>
                    <h2 style={{ display: "inline-block", textAlign: "center", "margin-right": "20px" }}>Waiting for an opponent to join..</h2>
                </div>);
        }

        return (
            <div id="gameInfo" style={{ display: "inline-block", textAlign: "center" }}>
                {waiting}
                {playerName}
            </div>
        );
    }
}