import React, { Component } from 'react';
import Circle from '../circle';
import GameOver from '../game-over';
import './app.css'
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
    attemps: 5,
    speed: 1000,
  };

  interval = null;

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
    if (this.state.activeCircle === id) {
      this.setState({
        result: this.state.result += 1,
        speed: Math.round(this.state.speed * 0.7),
      });
      this.setActiveCircle();
    } else {
      this.setState({
        attemps: this.state.attemps -= 1
      });
      this.state.attemps <= 0 ? this.endGame() : this.setActiveCircle();
    }
  };

  setActiveCircle = () => {
    let nextActive = null;
    clearTimeout(this.interval);
    do {
      nextActive = getRandomInt(1, 4);
    } while(this.state.activeCircle === nextActive);

    this.interval = setTimeout(this.setActiveCircle.bind(this), this.state.speed);
    this.setState({
      activeCircle: nextActive
    });
  };

  closeHandler = () => {
    this.setState({
      gameOver: false,
      result: 0,
      activeCircle: 0,
      attemps: 5,
      speed: 1000,
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
                <p>Your score: {this.state.result}</p>
                <p>Attemps: {this.state.attemps}</p>
                <p>Speed: { Math.round(this.state.speed) / 1000 } sec</p>
                <div>
                  <button className="button-start" onClick={this.startGame}>Start Game</button>
                  <button className="button-end" onClick={this.endGame}>End Game</button>
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
