import { createContext, useState } from "react";
import { GuessRow, GuessRowProps } from "./GuessRow";
import { Keyboard } from "./Keyboard";
import { isValidWord } from "../lib/is-valid-word";

export const GameContext = createContext<{ targetWord: string | null }>({
  targetWord: null,
});

export const Wordle = ({
  targetWord,
  guesses,
  setGuesses,
  currentGuess,
  setCurrentGuess,
  onEnd,
}: {
  targetWord: string;
  onEnd: (isWin: boolean) => void;
  guesses: string[];
  setGuesses: (guesses: string[]) => void;
  currentGuess: string;
  setCurrentGuess: (guess: string) => void;
}) => {
  const [message, setMessage] = useState<string>("");

  const handleOnKeyPressed = (letter: string) => {
    if (letter === "ENTR" && currentGuess.length === 5) {
      if (!isValidWord(currentGuess)) {
        setMessage("Invalid word");
        setCurrentGuess("");
        return;
      }

      setGuesses([...guesses, currentGuess]);
      setCurrentGuess("");

      if (currentGuess === targetWord) {
        onEnd(true);
        return;
      }

      if (guesses.length === 5) {
        onEnd(false);
      }
      return;
    }
    if (letter === "DEL") {
      setCurrentGuess(currentGuess.slice(0, -1));
      return;
    }

    if (currentGuess.length === 5) {
      return;
    }

    setCurrentGuess(currentGuess + letter);
  };

  const getPropsForIndex = (index: number): GuessRowProps => {
    let word = "";
    if (index < guesses.length) {
      word = guesses[index];
    } else if (index === guesses.length) {
      console.log("setting word for row " + index, currentGuess);
      word = currentGuess;
    }
    return {
      index,
      word,
      isSubmitted: index < guesses.length,
    };
  };

  return (
    <GameContext.Provider value={{ targetWord: targetWord.toUpperCase() }}>
      {message && <div>{message}</div>}
      <div>
        <GuessRow {...getPropsForIndex(0)} />
        <GuessRow {...getPropsForIndex(1)} />
        <GuessRow {...getPropsForIndex(2)} />
        <GuessRow {...getPropsForIndex(3)} />
        <GuessRow {...getPropsForIndex(4)} />
        <GuessRow {...getPropsForIndex(5)} />
      </div>

      <div style={{ marginTop: "20px" }}>
        <Keyboard
          targetWord={targetWord}
          guesses={guesses}
          onKeyPressed={handleOnKeyPressed}
        />
      </div>
    </GameContext.Provider>
  );
};
