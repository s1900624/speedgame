import React, { Component } from 'react';
import Circle from './components/Circle';
import GameOver from './components/GameOver/GameOver';
let colors = ["blue", "red", "yellow", "green"];

function getRandomInt(min, max) {
  return (Math.floor(Math.random() * (max - min + 1)) + min);
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      result: 0,
      gameOver: false,
      activeCircle: 0,
      tries: 5
    }
  }

  interval = null;
  pace = 1000;

  startGame = () => {
    this.setActiveCircle();
  }

  endGame = () => {
    clearInterval(this.interval);
    this.setState({
      gameOver: true
    })
  }

  clickHandler = (id) => {
    console.log(id);
    console.log(this.state.activeCircle);
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
  }

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
  }

  closeHandler = () => {
    this.setState({
      gameOver: false,
      result: 0,
      activeCircle: 0,
      tries: 5
    });
  }

  render() {
    let circleList = colors.map((color, index) => {
      return (
          <Circle clickHandler={() => this.clickHandler((index+1))} key={index} bgColor={color} active={this.state.activeCircle === (index + 1) ? "active" : ""} />
      );
    });

    return (
        <div className="App">
          <header>
            <h1>Speed Game</h1>
            <p>Your score: {this.state.result} | tries left: {this.state.tries }</p>
          </header>
          <main>
            {this.state.gameOver && <GameOver score={ this.state.result} closeHandler={this.closeHandler} />}
            {!this.state.gameOver && <><section>
              {circleList}
            </section>
              <section>
                <div>
                  <button class="button-green" onClick={this.startGame}>Start Game</button>
                  <button className="button-red" onClick={this.endGame}>End Game</button>
                </div>
              </section></>}
          </main>
        </div>
    );
  }
}

export default App;
