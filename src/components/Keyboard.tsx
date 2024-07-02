import classNames from "classnames";
import { Correctness } from "../types";
import { getCorrectness } from "../lib/letter-correctness";

const correctnessOrder = [null, "incorrect", "correct", "correct-exact"];

type KeyboardProps = {
  targetWord: string;
  guesses: string[];
  onKeyPressed: (key: string) => void;
};

type KeyProps = {
  keyValue: string;
  onClick: () => void;
  correctness: Correctness;
};
const Key = ({ keyValue, onClick, correctness }: KeyProps) => {
  return (
    <button
      className={classNames(
        "keyboard-key",
        keyValue.toLowerCase(),
        correctness !== null ? `key-${correctness}` : "",
      )}
      onClick={onClick}
    >
      {keyValue}
    </button>
  );
};

const uniqueGuessedLetters = (guesses: string[]): string[] => {
  const letters: Record<string, boolean> = {};

  for (const guess of guesses) {
    for (const letter of guess) {
      letters[letter] = true;
    }
  }

  return Object.keys(letters);
};

const getCorrectnessMap = (
  keyRows: string[][],
  guesses: string[],
  targetWord: string,
): Record<string, Correctness> => {
  const map: Record<string, Correctness> = {};
  // const guessedLetters = uniqueGuessedLetters(guesses);

  for (const row of keyRows) {
    for (const letter of row) {
      map[letter] = null;
    }
  }

  for (const guess of guesses) {
    for (let i = 0; i < guess.length; i++) {
      const letter = guess[i];
      const thisGuessCorrectness = getCorrectness(i, guess, targetWord);
      if (
        correctnessOrder.indexOf(thisGuessCorrectness) >
        correctnessOrder.indexOf(map[letter])
      ) {
        map[letter] = thisGuessCorrectness;
      }
    }
  }

  return map;
};

export const Keyboard = ({
  targetWord,
  guesses,
  onKeyPressed,
}: KeyboardProps) => {
  const rows = [
    ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
    ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
    ["ENTR", "Z", "X", "C", "V", "B", "N", "M", "DEL"],
  ];
  const map = getCorrectnessMap(rows, guesses, targetWord);

  const handleClick = (letter: string) => {
    return () => {
      console.log(letter);
      onKeyPressed(letter);
    };
  };
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      {rows.map((row, i) => (
        <div key={i} className={"keyboard-row"}>
          {row.map((letter, j) => (
            <Key
              key={j}
              keyValue={letter}
              onClick={handleClick(letter)}
              correctness={map[letter]}
            />
          ))}
        </div>
      ))}
    </div>
  );
};
