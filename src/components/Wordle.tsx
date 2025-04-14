import "./wordle.css";
import GuessLine from "./GuessLine";
import {
  WORD_LENGTH,
  WORD_LIST_API_URL,
  NUM_GUESSES,
  MY_WORDS,
} from "../utility/lib";
import { useState, useEffect } from "react";

export default function Wordle() {
  const [guesses, setGuesses] = useState(Array(NUM_GUESSES).fill(null));
  const [currentGuess, setCurrentGuess] = useState("");
  const [solution, setSolution] = useState("");
  // const [currentGuessIndex, setCurrentGuessIndex] = useState(0);

  useEffect(() => {
    setSolution(
      MY_WORDS[Math.floor(Math.random() * MY_WORDS.length)].toLowerCase()
    );
  }, []);

  useEffect(() => {
    if (solution === null) {
      return;
    }
    function onPressKey(event: KeyboardEvent) {
      if (guesses[NUM_GUESSES - 1] != null || guesses.includes(solution)) {
        return;
      }
      const charCode = event.key.toLowerCase().charCodeAt(0);
      const isLetter =
        event.key.length === 1 &&
        charCode >= "a".charCodeAt(0) &&
        charCode <= "z".charCodeAt(0);

      setCurrentGuess((prevGuess) => {
        if (event.key === "Backspace") {
          return prevGuess.slice(0, -1);
        } else if (event.key === "Enter" && prevGuess.length === WORD_LENGTH) {
          const currentGuessIndex = guesses.findIndex((guess) => guess == null);
          const guessesClone = [...guesses];
          guessesClone[currentGuessIndex] = prevGuess;
          setGuesses(guessesClone);
          return "";
        } else if (prevGuess.length < WORD_LENGTH && isLetter) {
          return prevGuess + event.key.toLowerCase();
        }

        return prevGuess;
      });
    }

    window.addEventListener("keydown", onPressKey);

    return () => window.removeEventListener("keydown", onPressKey);
  }, [guesses, solution]);

  const currentGuessIndex = guesses.findIndex((guess) => guess == null);
  if (solution == null) {
    return null;
  }
  return (
    <>
      <h1>Wordle</h1>
      {/* <p>{solution}</p> */}

      <div className="board">
        {guesses.map((guess, i) => {
          return (
            <GuessLine
              key={i}
              guess={(i === currentGuessIndex
                ? currentGuess
                : guess ?? ""
              ).padEnd(WORD_LENGTH)}
              solution={solution}
              isFinal={currentGuessIndex === -1 || currentGuessIndex > 1}
            />
          );
        })}
      </div>
    </>
  );
}
