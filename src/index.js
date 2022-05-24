import React from "react";
import ReactDOM from "react-dom/client";
import "bootstrap/dist/css/bootstrap.css";
import validWords from "./validwords";
import wordList from "./wordlist";

class Box extends React.Component {
  render() {
    return (
      <div
        className={
          "card text-white border-light text-center p-3 px-4 m-1 rounded-0 bg-" +
          this.props.color
        }
      >
        <h1 clasName="test-monospace" style={{ fontFamily: "monospace" }}>
          {this.props.value}
        </h1>
      </div>
    );
  }
}

class Row extends React.Component {
  renderSquare(i) {
    return (
      <Box
        color={this.props.boxStates[i].color}
        value={this.props.boxStates[i].value}
      />
    );
  }

  render() {
    return (
      // render a row of squares
      <span
        className="card-deck justify-content-center align-items-center"
        style={{ display: "flex", flexDirection: "row" }}
      >
        {this.renderSquare(0)}
        {this.renderSquare(1)}
        {this.renderSquare(2)}
        {this.renderSquare(3)}
        {this.renderSquare(4)}
      </span>
    );
  }
}
class Grid extends React.Component {
  state = {
    rowNumber: 0,
    win: false,
    gridState: [
      {
        boxStates: Array(5).fill({ color: "dark", value: "_" }),
        currentBox: 0,
      },
      {
        boxStates: Array(5).fill({ color: "dark", value: "_" }),
        currentBox: 0,
      },
      {
        boxStates: Array(5).fill({ color: "dark", value: "_" }),
        currentBox: 0,
      },
      {
        boxStates: Array(5).fill({ color: "dark", value: "_" }),
        currentBox: 0,
      },
      {
        boxStates: Array(5).fill({ color: "dark", value: "_" }),
        currentBox: 0,
      },
      {
        boxStates: Array(5).fill({ color: "dark", value: "_" }),
        currentBox: 0,
      },
    ],
  };

  getTodaysWord = () => {
    const index = this.getDays();
    return wordList[Math.floor(index)];
  };

  getDays = () => {
    const date = new Date();
    const start = new Date(2022, 1, 28);
    const diff = date.getTime() - start.getTime();
    return Math.floor(diff / (1000 * 60 * 60 * 24));
  };

  isKeyValid = (key) => {
    return key.length === 1 && key.match(/[a-z]/i);
  };

  isSubmissionLongEnough = (e, currentBox) => {
    if (e.key === "Enter" && currentBox <= 4) {
      alert("Invalid Submission");
    }
  };

  handleClick = (e) => {
    console.log(e.key);

    let gridState = this.state.gridState.slice();
    let rowState = gridState.splice(this.state.rowNumber, 1)[0];
    let currentBox = rowState.currentBox;
    let boxStates = rowState.boxStates;

    if (e.key === "Backspace" && currentBox > 0) {
      currentBox = currentBox >= 0 ? currentBox - 1 : 0;
      boxStates[currentBox] = {
        color: "dark",
        value: "_",
      };
    }

    this.isSubmissionLongEnough(e);

    if (this.isKeyValid(e.key) && currentBox <= 4 && e.key !== "Enter") {
      const key = e.key.toUpperCase();
      boxStates[currentBox] = {
        color: "dark",
        value: key,
      };
      currentBox += 1;
    }
    gridState.splice(this.state.rowNumber, 0, {
      boxStates: boxStates,
      currentBox: currentBox,
    });
    console.log(gridState);
    this.setState({
      rowNumber: this.state.rowNumber,
      win: false,
      gridState: gridState,
    });

    if (e.key === "Enter" && currentBox === 5) {
      let guess = "";
      for (let box of boxStates) {
        guess += box.value;
      }
      if (validWords.includes(guess.toLowerCase())) {
        this.revealGuess(guess.toLowerCase(), gridState);
      } else {
        alert("Invalid Submission");
      }
    }
  };

  revealGuess = (guess, gridState) => {
    const todaysWord = this.getTodaysWord();
    let todaysWordArray = todaysWord.split("");
    let boxStates = gridState.splice(this.state.rowNumber, 1)[0].boxStates;
    for (let i = 0; i < 5; i++) {
      if (todaysWordArray.includes(guess[i]) && guess[i] !== todaysWord[i]) {
        boxStates[i] = {
          color: "warning",
          value: guess[i].toUpperCase(),
        };
        todaysWordArray.splice(todaysWordArray.indexOf(`${guess[i]}`), 1);
      } else {
        boxStates[i] = {
          color: "secondary",
          value: guess[i].toUpperCase(),
        };
      }
    }
    for (let i = 0; i < 5; i++) {
      if (guess[i] === todaysWord[i]) {
        boxStates[i] = {
          color: "success",
          value: guess[i].toUpperCase(),
        };
        todaysWordArray.splice(i, 1);
      }
    }
    gridState.splice(this.state.rowNumber, 0, {
      boxStates: boxStates,
      currentBox: 5,
    });
    this.setState({
      rowNumber: this.state.rowNumber + 1,
      win: this.didWin(guess, todaysWord, this.state.rowNumber),
      gridState: gridState,
    });
  };

  didWin = (guess, todaysWord, rowNumber) => {
    const win = guess === todaysWord;
    if (win) {
      this.endListenForKey();
      alert(
        `You won in ${rowNumber + 1} ${
          rowNumber === 0 ? "turn" : "turns"
        }! The word was ${todaysWord}.`
      );
    }

    return win;
  };

  listenForKey = document.addEventListener("keydown", this.handleClick);

  endListenForKey = () => {
    document.removeEventListener("keydown", this.handleClick);
  };

  renderRow(i) {
    return (
      <div className=" justify-content-center">
        <Row
          boxStates={this.state.gridState[i].boxStates}
          currentBox={this.state.gridState[i].currentBox}
        />
      </div>
    );
  }

  render() {
    return (
      <div>
        {this.renderRow(0)}
        {this.renderRow(1)}
        {this.renderRow(2)}
        {this.renderRow(3)}
        {this.renderRow(4)}
        {this.renderRow(5)}
      </div>
    );
  }
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Grid />);
