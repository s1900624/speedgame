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
      attemps: 3,
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
      let { result, attemps, activeCircle, speed } = this.state;
      result += 1;
      attemps -= 1;
      if (activeCircle === id) {
        this.setState({
          result: result,
          speed: Math.round(speed * 0.7),
        });
        this.setActiveCircle();
      } else {
        this.setState({
          attemps: attemps,
        });
        attemps <= 0 ? this.endGame() : this.setActiveCircle();
      }
    };

    setActiveCircle = () => {
      let nextActive = null;
      const { activeCircle, speed } = this.state;
      clearTimeout(this.interval);
      do {
        nextActive = getRandomInt(1, 4);
      } while(activeCircle === nextActive);

      this.interval = setTimeout(this.setActiveCircle.bind(this), speed);
      this.setState({
        activeCircle: nextActive
      });
    };

    closeHandler = () => {
      this.setState({
        gameOver: false,
        result: 0,
        activeCircle: 0,
        attemps: 3,
        speed: 1000,
      });
    };

    render() {
      const circleList = colors.map((color, index) => {
      const { activeCircle } = this.state;
      return (
          <Circle
              key={index}
              bgColor={color}
              clickHandler={() => this.clickHandler((index+1))}
              active={activeCircle === (index + 1) ? "active" : ""}
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
