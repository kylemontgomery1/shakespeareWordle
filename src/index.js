// import React, { useState } from "react";
import React from "react";
import ReactDOM from "react-dom/client";
import "bootstrap/dist/css/bootstrap.css";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { Button, Modal } from "react-bootstrap";
import validWords from "./validwords";
import wordList from "./wordlist";
// import possiblePatterns from "./possiblePatterns";

class Box extends React.Component {
  render() {
    return (
      <div
        className={
          "card text-white border-light text-center p-3 px-4 m-1 rounded-0 align-items-center bg-" +
          this.props.color
        }
      >
        <h1 className="test-monospace" style={{ fontFamily: "monospace" }}>
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
  renderRow(i) {
    return (
      <div className=" justify-content-center">
        <Row
          boxStates={this.props.gridState[i].boxStates}
          currentBox={this.props.gridState[i].currentBox}
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

class Key extends React.Component {
  render() {
    return (
      <div
        className={
          "card text-white text-center p-3 m-1 align-items-center d-flex rounded bg-" +
          this.props.color
        }
        onClick={() => this.props.onClick(this.props.value)}
      >
        <p className="test-monospace" style={{ fontFamily: "monospace" }}>
          {this.props.value}
        </p>
      </div>
    );
  }
}

class KeyRow extends React.Component {
  renderKey(i) {
    return (
      <Key
        color={this.props.keyBoardState[i].color}
        value={this.props.keyBoardState[i].value}
        onClick={this.props.onClick}
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
        {this.props.keyBoardState.map((x) => this.renderKey(x.key))}
      </span>
    );
  }
}

class NavBar extends React.Component {
  render() {
    return (
      <nav className="navbar navbar-dark bg-dark justify-content-center">
        <h3 className="text-light font-weight-bold px-3">
          {" "}
          Shakespeare Wordle
        </h3>
      </nav>
    );
  }
}

class PopUpWin extends React.Component {
  render() {
    return (
      <Modal
        show={this.props.win}
        onHide={this.props.closeModal}
        className="fade"
      >
        <Modal.Body className="bg-dark text-light text-center">
          Woohoo, you won in {this.props.turns}{" "}
          {this.props.turns === 1 ? "turn" : "turns"}!<br></br>
          <br></br>
          <Button variant="secondary" onClick={this.props.closeModal}>
            Close
          </Button>
        </Modal.Body>
      </Modal>
    );
  }
}

class PopUpLost extends React.Component {
  render() {
    return (
      <Modal
        show={this.props.lost}
        onHide={this.props.closeModal}
        className="fade"
      >
        <Modal.Body className="bg-dark text-light text-center">
          Shucks, you lost! Better luck tomorrow.<br></br>
          <br></br>
          <Button variant="secondary" onClick={this.props.closeModal}>
            Close
          </Button>
        </Modal.Body>
      </Modal>
    );
  }
}

class Game extends React.Component {
  state = {
    rowNumber: 0,
    win: false,
    lost: false,
    gridState: [
      {
        boxStates: Array(5).fill({ color: "dark", value: "\u00A0" }),
        currentBox: 0,
      },
      {
        boxStates: Array(5).fill({ color: "dark", value: "\u00A0" }),
        currentBox: 0,
      },
      {
        boxStates: Array(5).fill({ color: "dark", value: "\u00A0" }),
        currentBox: 0,
      },
      {
        boxStates: Array(5).fill({ color: "dark", value: "\u00A0" }),
        currentBox: 0,
      },
      {
        boxStates: Array(5).fill({ color: "dark", value: "\u00A0" }),
        currentBox: 0,
      },
      {
        boxStates: Array(5).fill({ color: "dark", value: "\u00A0" }),
        currentBox: 0,
      },
    ],
    keyBoardState: [
      { color: "secondary", value: "Q", key: 0 },
      { color: "secondary", value: "W", key: 1 },
      { color: "secondary", value: "E", key: 2 },
      { color: "secondary", value: "R", key: 3 },
      { color: "secondary", value: "T", key: 4 },
      { color: "secondary", value: "Y", key: 5 },
      { color: "secondary", value: "U", key: 6 },
      { color: "secondary", value: "I", key: 7 },
      { color: "secondary", value: "O", key: 8 },
      { color: "secondary", value: "P", key: 9 },
      { color: "secondary", value: "A", key: 0 },
      { color: "secondary", value: "S", key: 1 },
      { color: "secondary", value: "D", key: 2 },
      { color: "secondary", value: "F", key: 3 },
      { color: "secondary", value: "G", key: 4 },
      { color: "secondary", value: "H", key: 5 },
      { color: "secondary", value: "J", key: 6 },
      { color: "secondary", value: "K", key: 7 },
      { color: "secondary", value: "L", key: 8 },
      { color: "secondary", value: "Enter", key: 0 },
      { color: "secondary", value: "Z", key: 1 },
      { color: "secondary", value: "X", key: 2 },
      { color: "secondary", value: "C", key: 3 },
      { color: "secondary", value: "V", key: 4 },
      { color: "secondary", value: "B", key: 5 },
      { color: "secondary", value: "N", key: 6 },
      { color: "secondary", value: "M", key: 7 },
      { color: "secondary", value: "\u232B", key: 8 },
    ],
    // wordList: wordList,
  };

  //grabs today's word from wordlist
  getTodaysWord = () => {
    const index = this.getDays();
    return wordList[Math.floor(index)];
  };

  //calculates the number of days since the start of the game to determine which word to use
  getDays = () => {
    const date = new Date();
    const start = new Date(2021, 12, 7);
    const diff = date.getTime() - start.getTime();
    return Math.floor(diff / (1000 * 60 * 60 * 24));
  };

  isKeyValid = (key) => {
    return key.length === 1 && key.match(/[a-z]/i);
  };

  isSubmissionLongEnough = (key, currentBox) => {
    if (key === "Enter" && currentBox <= 4) {
      alert("Invalid Submission");
    }
  };

  getKeyboardIndex = (key) => {
    let indicies = {
      Q: 0,
      W: 1,
      E: 2,
      R: 3,
      T: 4,
      Y: 5,
      U: 6,
      I: 7,
      O: 8,
      P: 9,
      A: 10,
      S: 11,
      D: 12,
      F: 13,
      G: 14,
      H: 15,
      J: 16,
      K: 17,
      L: 18,
      Enter: 19,
      Z: 20,
      X: 21,
      C: 22,
      V: 23,
      B: 24,
      N: 25,
      M: 26,
      "\u232B": 27,
    };
    return indicies[key];
  };

  handleClick = (e) => {
    let key;
    if (typeof e === "string") {
      key = e;
    } else {
      key = e.key;
    }

    let gridState = this.state.gridState.slice();
    let rowState = gridState.splice(this.state.rowNumber, 1)[0];
    let currentBox = rowState.currentBox;
    let boxStates = rowState.boxStates;
    let keyBoardState = this.state.keyBoardState.slice();

    if ((key === "Backspace" || key === "\u232B") && currentBox > 0) {
      currentBox = currentBox >= 0 ? currentBox - 1 : 0;
      boxStates[currentBox] = {
        color: "dark",
        value: "\u00A0",
      };
    }

    this.isSubmissionLongEnough(key);

    if (this.isKeyValid(key) && currentBox <= 4 && key !== "Enter") {
      const validKey = key.toUpperCase();
      boxStates[currentBox] = {
        color: "dark",
        value: validKey,
      };
      currentBox += 1;
    }
    gridState.splice(this.state.rowNumber, 0, {
      boxStates: boxStates,
      currentBox: currentBox,
    });

    this.setState({
      rowNumber: this.state.rowNumber,
      win: false,
      lost: false,
      gridState: gridState,
      keyBoardState: keyBoardState,
      // wordList: this.state.wordList,
    });

    if (key === "Enter" && currentBox === 5) {
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
    let squaresChanged = [];
    let boxStates = gridState.splice(this.state.rowNumber, 1)[0].boxStates;
    let keyBoardState = this.state.keyBoardState.slice();
    // let pattern = [0, 0, 0, 0, 0];

    //denotes fully-correct tiles
    console.log(todaysWordArray);
    for (let i = 0; i < 5; i++) {
      if (guess[i] === todaysWord[i]) {
        boxStates[i] = {
          color: "success",
          value: guess[i].toUpperCase(),
        };
        // pattern[i] = 2;
        todaysWordArray[i] = "";
        console.log(todaysWordArray);
        squaresChanged.push(i);
        keyBoardState[this.getKeyboardIndex(guess[i].toUpperCase())].color =
          "success";
      }
    }

    //denotes partially-correct tiles
    for (let i = 0; i < 5; i++) {
      if (todaysWordArray.includes(guess[i]) && guess[i] !== todaysWord[i]) {
        boxStates[i] = {
          color: "warning",
          value: guess[i].toUpperCase(),
        };
        // pattern[i] = 1;
        todaysWordArray[todaysWordArray.indexOf(guess[i])] = "";
        console.log(todaysWordArray);
        squaresChanged.push(i);
        if (
          keyBoardState[this.getKeyboardIndex(guess[i].toUpperCase())].color !==
          "success"
        ) {
          keyBoardState[this.getKeyboardIndex(guess[i].toUpperCase())].color =
            "warning";
        }
      }
    }

    //denotes incorrect tiles
    for (let i = 0; i < 5; i++) {
      if (!squaresChanged.includes(i)) {
        boxStates[i] = {
          color: "secondary",
          value: guess[i].toUpperCase(),
        };
        if (
          keyBoardState[this.getKeyboardIndex(guess[i].toUpperCase())].color !==
            "success" &&
          keyBoardState[this.getKeyboardIndex(guess[i].toUpperCase())].color !==
            "warning"
        ) {
          keyBoardState[this.getKeyboardIndex(guess[i].toUpperCase())].color =
            "dark";
        }
      }
    }

    gridState.splice(this.state.rowNumber, 0, {
      boxStates: boxStates,
      currentBox: 5,
    });
    this.setState({
      rowNumber: this.state.rowNumber + 1,
      win: this.didWin(guess, todaysWord, this.state.rowNumber),
      lost:
        (this.state.rowNumber === 5) &
        (this.didWin(guess, todaysWord, this.state.rowNumber) === false),
      gridState: gridState,
      keyBoardState: keyBoardState,
      // wordList: this.findMatches(guess, this.state.wordList, pattern),
    });
  };

  didWin = (guess, todaysWord, rowNumber) => {
    const win = guess === todaysWord;
    if (win) {
      this.endListenForKey();
      // alert(
      //   `You won in ${rowNumber + 1} ${
      //     rowNumber === 0 ? "turn" : "turns"
      //   }! The word was ${todaysWord}.`
      // );
    }

    return win;
  };

  listenForKey = document.addEventListener("keydown", this.handleClick);

  endListenForKey = () => {
    document.removeEventListener("keydown", this.handleClick);
  };

  closeModal = () =>
    this.setState({
      rowNumber: this.state.rowNumber,
      win: false,
      lost: false,
    });

  render() {
    return (
      <div>
        <NavBar />
        <PopUpWin
          win={this.state.win}
          closeModal={this.closeModal}
          turns={this.state.rowNumber}
        />
        <PopUpLost lost={this.state.lost} closeModal={this.closeModal} />
        <Grid gridState={this.state.gridState} />
        <br></br>
        <KeyRow
          keyBoardState={this.state.keyBoardState.slice(0, 10)}
          onClick={this.handleClick}
        />
        <KeyRow
          keyBoardState={this.state.keyBoardState.slice(10, 19)}
          onClick={this.handleClick}
        />
        <KeyRow
          keyBoardState={this.state.keyBoardState.slice(19)}
          onClick={this.handleClick}
        />
      </div>
    );
  }
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Game />);
