import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "bootstrap/dist/css/bootstrap.css";
import validWords from "./validwords";
import wordList from "./wordlist";

class Box extends React.Component {
  render() {
    return (
      <div
        className={
          "card text-white text-center pt-5 pb-5 pt-5 pl-2 pr-2 bg-" +
          this.props.color
        }
      >
        <h1>{this.props.value}</h1>
      </div>
    );
  }
}

class Row extends React.Component {
  state = {
    boxStates: Array(5).fill({
      color: "dark",
      value: "",
    }),
    currentBox: 0,
  };

  renderSquare(i) {
    return (
      <Box
        color={this.state.boxStates[i].color}
        value={this.state.boxStates[i].value}
      />
    );
  }

  handleClick = (e) => {
    let currentBox = this.state.currentBox;
    let boxStates = this.state.boxStates.slice();
    if (e.key === "Backspace" && currentBox > 0) {
      currentBox = currentBox >= 0 ? currentBox - 1 : 0;
      boxStates[this.state.currentBox - 1] = {
        color: "dark",
        value: " ",
      };
    }
    if (e.key === "Enter" && currentBox <= 4) {
      alert("Invalid Submission");
    }

    if (this.isKeyValid(e.key) && currentBox <= 4 && e.key !== "Enter") {
      const key = e.key.toUpperCase();
      boxStates[this.state.currentBox] = {
        color: "dark",
        value: key,
      };
      currentBox += 1;
    }
    this.setState({
      boxStates: boxStates,
      currentBox: currentBox,
    });
    if (e.key === "Enter" && currentBox === 5) {
      let guess = "";
      for (let box of boxStates) {
        guess += box.value;
      }
      if (validWords.includes(guess.toLowerCase())) {
        this.revealGuess(guess.toLowerCase());
      } else {
        alert("Invalid Submission");
      }
    }
  };
  revealGuess = (guess) => {
    const todaysWord = this.getTodaysWord();
    let todaysWordArray = todaysWord.split("");
    let boxStates = this.state.boxStates.slice();
    for (let i = 0; i < 5; i++) {
      if (guess[i] === todaysWord[i]) {
        boxStates[i] = {
          color: "success",
          value: guess[i].toUpperCase(),
        };
        todaysWordArray.splice(i, 1);
      }
    }
    for (let i = 0; i < 5; i++) {
      if (todaysWordArray.includes(guess[i]) && guess[i] !== todaysWord[i]) {
        boxStates[i] = {
          color: "warning",
          value: guess[i].toUpperCase(),
        };
        todaysWordArray.splice(todaysWordArray.indexOf(`${guess[i]}`), 1);
      }
    }
    this.setState({
      boxStates: boxStates,
      currentBox: 0,
    });
  };

  getTodaysWord = () => {
    const index = this.getDays();
    return wordList[Math.floor(index)];
  };

  //Get days since Feb 28 2001
  getDays = () => {
    const date = new Date();
    const start = new Date(2022, 1, 28);
    const diff = date.getTime() - start.getTime();
    return Math.floor(diff / (1000 * 60 * 60 * 24));
  };

  isKeyValid = (key) => {
    return key.length === 1 && key.match(/[a-z]/i);
  };

  listenForKey = document.addEventListener("keydown", this.handleClick);
  endListenForKey = () => {
    document.removeEventListener("keydown", this.handleClick);
  };
  render() {
    return (
      // render a row of squares
      <span className="card-group">
        {this.renderSquare(0)}
        {this.renderSquare(1)}
        {this.renderSquare(2)}
        {this.renderSquare(3)}
        {this.renderSquare(4)}
      </span>
    );
  }
}
// class Grid extends React.Component {
//   state = {
//     rowNumber: 0,
//     win: false,
//     rowState: Array(6).fill({
//       boxStates: Array(5).fill({
//         color: "dark",
//         value: "",
//       }),
//       currentBox: 0,
//     }),
//   };

//   renderRow(i) {
//     return <
//   }

//   render() {
//     return (
//       <div>
//         <span className="card-group">
//           {this.renderSquare(0)}
//           {this.renderSquare(1)}
//           {this.renderSquare(2)}
//           {this.renderSquare(3)}
//           {this.renderSquare(4)}
//         </span>
//         <span className="card-group">
//           {this.renderSquare(0)}
//           {this.renderSquare(1)}
//           {this.renderSquare(2)}
//           {this.renderSquare(3)}
//           {this.renderSquare(4)}
//         </span>
//         <span className="card-group">
//           {this.renderSquare(0)}
//           {this.renderSquare(1)}
//           {this.renderSquare(2)}
//           {this.renderSquare(3)}
//           {this.renderSquare(4)}
//         </span>
//         <span className="card-group">
//           {this.renderSquare(0)}
//           {this.renderSquare(1)}
//           {this.renderSquare(2)}
//           {this.renderSquare(3)}
//           {this.renderSquare(4)}
//         </span>
//         <span className="card-group">
//           {this.renderSquare(0)}
//           {this.renderSquare(1)}
//           {this.renderSquare(2)}
//           {this.renderSquare(3)}
//           {this.renderSquare(4)}
//         </span>
//         <span className="card-group">
//           {this.renderSquare(0)}
//           {this.renderSquare(1)}
//           {this.renderSquare(2)}
//           {this.renderSquare(3)}
//           {this.renderSquare(4)}
//         </span>
//       </div>
//     );
//   }
// }

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Row />);
