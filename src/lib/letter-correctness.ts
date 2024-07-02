import { Correctness } from "../types";

export const letterCountInWord = (word: string, letter: string): number => {
  return word.split("").filter((l) => l === letter).length;
};

export const getCorrectness = (
  index: number,
  word: string,
  targetWord: string,
): Correctness => {
  const letter = word[index];
  const targetLetterCount = letterCountInWord(targetWord, letter);
  const guessLetterCount = letterCountInWord(word, letter);
  const sameLetterCountBeforeThis =
    word.slice(0, index).split(letter).length - 1;

  if (targetWord[index] === letter) {
    return "correct-exact";
  }

  if (targetWord.includes(letter)) {
    if (sameLetterCountBeforeThis < targetLetterCount) {
      return "correct";
    }
    return "incorrect";
  }
  return "incorrect";
};
