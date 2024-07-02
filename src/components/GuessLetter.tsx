import classNames from "classnames";
import { PropsWithChildren } from "react";
import { Correctness } from "../types";

export type GuessLetterProps = {
  letter: string;
  isGuessed: boolean;
  correctness: Correctness;
};

export const GuessLetter = ({
  letter,
  isGuessed,
  correctness,
}: GuessLetterProps) => {
  return (
    <div
      className={classNames("guessed-letter", correctness, {
        guessed: isGuessed,
      })}
      style={{
        border: "1px solid rgba(0, 0, 0, 0.2)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: "2em",
        width: "15vw",
        height: "15vw",
      }}
    >
      {letter}
    </div>
  );
};
