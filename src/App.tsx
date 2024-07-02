import React, { useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import { Wordle } from "./components/Wordle";
import { wordBank } from "./word-bank";
import classNames from "classnames";

function App() {
  const [targetWord, setTargetWord] = useState<string | null>(null);
  const [guesses, setGuesses] = useState<string[]>([]);
  const [currentGuess, setCurrentGuess] = useState<string>("");
  const [state, setState] = useState<"start" | "playing" | "won" | "lost">(
    "start",
  );

  const handleOnEnded = (isWin: boolean) => {
    if (isWin) {
      setState("won");
    } else {
      setState("lost");
    }
  };

  const handleOnStart = () => {
    setTargetWord(
      wordBank[Math.floor(Math.random() * wordBank.length)].toUpperCase(),
    );
    setState("playing");
    setGuesses([]);
    setCurrentGuess("");
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Wordle for Mom</h1>
      </header>
      <main
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <button
          style={{ marginBottom: "20px" }}
          className={classNames("start-button", {
            visible: ["won", "lost", "start"].includes(state),
            invisible: state === "playing",
          })}
          onClick={handleOnStart}
        >
          {state === "start" ? "Start" : "Play Again"}
        </button>
        {["playing", "won", "lost"].includes(state) && targetWord !== null && (
          <Wordle
            targetWord={targetWord}
            guesses={guesses}
            setGuesses={setGuesses}
            currentGuess={currentGuess}
            setCurrentGuess={setCurrentGuess}
            onEnd={handleOnEnded}
          />
        )}

        {state === "won" && <div className={"win-msg"}>you won</div>}
        {state === "lost" && (
          <div style={{ marginTop: "20px" }}>
            <div className={"lose-msg"}>you lost</div>
            <div>(the word was {targetWord})</div>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
