import React, { Component } from 'react';
import Circle from './components/circle';
import GameOver from './components/game-over';
import './App.css'
const colors = ['black', 'black', 'black', 'black'];
const hbcr = ['H', 'B', 'C', 'R'];

function getRandomInt(min, max) {
  return (Math.floor(Math.random() * (max - min + 1)) + min);
}

class App extends Component {
  state = {
    result: 0,
    gameOver: false,
    activeCircle: 0,
    tries: 5,
  };

  interval = null;
  pace = 1000;

  startGame = () => {
    this.setActiveCircle();
  };

  endGame = () => {
    clearInterval(this.interval);
    this.setState({
      gameOver: true
    })
  };

  clickHandler = (id) => {
    if(this.state.activeCircle === id) {
      this.pace *= 0.95;
      this.setState({
        result: this.state.result += 1
      });
      this.setActiveCircle();
    } else {
      this.setState({
        tries: this.state.tries -= 1
      });
      if(this.state.tries <= 0) {
        this.endGame();
      }
      else {
        this.setActiveCircle();
      }
    }
  };

  setActiveCircle = () => {
    let nextActive = null;
    clearTimeout(this.interval);
    do {
      nextActive = getRandomInt(1, 4);
    } while(this.state.activeCircle === nextActive);

    this.interval = setTimeout(this.setActiveCircle.bind(this), this.pace);
    this.setState({
      activeCircle: nextActive
    });
  };

  closeHandler = () => {
    this.setState({
      gameOver: false,
      result: 0,
      activeCircle: 0,
      tries: 5
    });
  };

  render() {
    const circleList = colors.map((color, index) => {
      return (
          <Circle
              key={index}
              bgColor={color}
              clickHandler={() => this.clickHandler((index+1))}
              active={this.state.activeCircle === (index + 1) ? "active" : ""}
              text={hbcr[index]}
          />
      );
    });

    return (
        <div className="App">
          <header>
            {!this.state.gameOver &&
            <>
              <div className='start-container'>
                <h1>Speed Game</h1>
                <p>Your score: {this.state.result} | tries left: {this.state.tries}</p>
                <div>
                  <button className="button-green" onClick={this.startGame}>Start Game</button>
                  <button className="button-red" onClick={this.endGame}>End Game</button>
                </div>
              </div>
              <div className='circle-container'>
                {circleList}
              </div>
            </>
            }
          </header>
          <main>
            {this.state.gameOver &&
            <div className='exit-container'>
              <GameOver
                  score={ this.state.result}
                  closeHandler={this.closeHandler}
              />
            </div>}
          </main>
        </div>
    );
  }
}

export default App;
