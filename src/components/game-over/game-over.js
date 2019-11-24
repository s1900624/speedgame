import React from "react";
import "./game-over.css";

const GameOver = ({score, closeHandler}) => {
    return (
        <div id="container">
            <div>
                <h3>Game over!</h3>
                <p>Your score is {score}</p>
            </div>
            <div>
                <button className="button-red" onClick={closeHandler}>Close</button>
            </div>
        </div>
    );
};

export default GameOver;