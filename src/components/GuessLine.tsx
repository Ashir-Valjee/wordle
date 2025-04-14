interface GuessProps {
  guess: string;
  solution: string;
  isFinal: boolean;
}

export default function GuessLine({ guess, solution, isFinal }: GuessProps) {
  return (
    <>
      <div className="line">
        {guess.split("").map((char, i) => {
          let className = "tile";

          if (isFinal) {
            if (char === solution[i]) {
              className += " correct";
            } else if (solution.includes(char)) {
              className += " incorrect";
            }
          }
          return (
            <div key={i} className={className}>
              {char}
            </div>
          );
        })}
      </div>
    </>
  );
}
