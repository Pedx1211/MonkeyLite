import React from "react";

type ResultsType = {
  [key: string]: "correct" | "incorrect" | "incorrectextra" | "";
};

interface WordGridProps {
  words: string[];
  results: ResultsType;
  currentWordIndex: number;
  lineOffset: number;
  wordRefs: React.MutableRefObject<(HTMLSpanElement | null)[]>;
  letterRefs: React.MutableRefObject<(HTMLDivElement | null)[][]>;
}

export function WordsGrid({
  words,
  results,
  currentWordIndex,
  lineOffset,
  wordRefs,
  letterRefs,
}: WordGridProps) {
  return (
    <div
      className="flex flex-wrap w-full leading-relaxed overflow-hidden"
      style={{ transform: `translateY(-${lineOffset * 51.2}px)` }}
    >
      {words.map((word, index) => {
        const entries = Object.entries(results).filter(([key]) =>
          key.startsWith(`${index}-`)
        );

        let hasError = false;

        hasError = entries.some(
          ([, value]) =>
            value === "incorrect" || value === "incorrectextra" || value === ""
        );
        if (
          words[index].length !== entries.length &&
          currentWordIndex > index
        ) {
          hasError = true;
        }

        if (currentWordIndex === index) {
          hasError = false;
        }

        return (
          <span
            key={index}
            ref={(el) => {
              wordRefs.current[index] = el;
            }}
            className={`mx-[9.6px] cursor-default border-b-[1.6px] inline-block my-[8px] h-[35.2px] whitespace-nowrap text-[32px] font-normal leading-none text-[#616367] ${
              hasError ? "border-[#ca4754]" : "border-transparent"
            }`}
            style={{ fontFamily: '"Roboto Mono", monospace' }}
          >
            {word.split("").map((letter, letterIndex) => {
              const id = `${index}-${letterIndex}`;
              const status = results[id] || "";

              return (
                <div
                  key={letterIndex}
                  ref={(el) => {
                    if (!letterRefs.current[index]) {
                      letterRefs.current[index] = [];
                    }
                    letterRefs.current[index][letterIndex] = el;
                  }}
                  className={`inline-block ${
                    status === "correct"
                      ? "text-[#d1d0c5]"
                      : status === "incorrect"
                      ? "text-[#ca4754]"
                      : status === "incorrectextra"
                      ? "text-[#7E2A33]"
                      : "text-[#616367]"
                  }`}
                >
                  {letter}
                </div>
              );
            })}
          </span>
        );
      })}
    </div>
  );
}
