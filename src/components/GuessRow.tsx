import { GuessLetter, GuessLetterProps } from "./GuessLetter";
import { useContext } from "react";
import { GameContext } from "./Wordle";
import { getCorrectness } from "../lib/letter-correctness";

export type GuessRowProps = {
  index: number;
  word: string;
  isSubmitted: boolean;
};

export const GuessRow = ({ index, word, isSubmitted }: GuessRowProps) => {
  const { targetWord } = useContext(GameContext);
  const getLetterProps = (i: number) => {
    let props: GuessLetterProps;
    if (i < word.length) {
      props = {
        letter: word[i],
        isGuessed: isSubmitted,
        correctness: !isSubmitted ? null : getCorrectness(i, word, targetWord!),
      };
    } else {
      props = {
        letter: "",
        isGuessed: false,
        correctness: null,
      };
    }

    console.log("props", { index, word, isSubmitted }, props);

    return props;
  };
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        width: "90vw",
        gap: "2px",
        marginBottom: "2px",
      }}
    >
      <GuessLetter {...getLetterProps(0)} />
      <GuessLetter {...getLetterProps(1)} />
      <GuessLetter {...getLetterProps(2)} />
      <GuessLetter {...getLetterProps(3)} />
      <GuessLetter {...getLetterProps(4)} />
    </div>
  );
};
