import { useEffect, useRef, useState } from "react";

type ResultsType = {
  [key: string]: "correct" | "incorrect" | "incorrectextra" | "";
};

type UseTestLogicProps = {
  isSettingsOpen: boolean;
  currentLine: number;
  wordRefs: React.MutableRefObject<(HTMLSpanElement | null)[]>;
  results: ResultsType;
  isFinished: boolean;
  inputRef: React.RefObject<HTMLInputElement | null>;
  setFinished: React.Dispatch<React.SetStateAction<boolean>>;
  setLineOffset: React.Dispatch<React.SetStateAction<number>>;
  setCapsOn: React.Dispatch<React.SetStateAction<boolean>>;
  setIsTyping: React.Dispatch<React.SetStateAction<boolean>>;
  setNewText: React.Dispatch<React.SetStateAction<boolean>>;
  setCurrentLine: React.Dispatch<React.SetStateAction<number>>;
  setResults: React.Dispatch<React.SetStateAction<ResultsType>>;
  setElapsedSeconds: React.Dispatch<React.SetStateAction<number>>;
};

export function useTestLogic({
  isSettingsOpen,
  currentLine,
  wordRefs,
  results,
  isFinished,
  inputRef,
  setFinished,
  setLineOffset,
  setCapsOn,
  setIsTyping,
  setNewText,
  setCurrentLine,
  setResults,
  setElapsedSeconds,
}: UseTestLogicProps) {
  const [words, setWords] = useState<string[]>([]);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentLetterIndex, setCurrentLetterIndex] = useState(0);
  const [currentWordOriginal, setCurrentWordOriginal] = useState<string>("");
  const [correctWords, setCorrectWords] = useState(0);
  const [startTime, setStartTime] = useState<number | null>(null);
  const [endTime, setEndTime] = useState<number | null>(null);
  const [isLimited, setLimited] = useState(false);
  const timeoutRef = useRef<number | null>(null);

  const resetTimer = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(() => {
      setIsTyping(false);
    }, 10000);
  };

  const addWord = (resultsObj = results) => {
    const entries = Object.entries(resultsObj).filter(([key]) =>
      key.startsWith(`${currentWordIndex}-`)
    );

    if (
      entries.length === currentWordOriginal.length &&
      entries.every(([_, value]) => value === "correct")
    ) {
      setCorrectWords(correctWords + 1);
    } else {
    }
  };

  const processKey = (key: string) => {
    const id = `${currentWordIndex}-${currentLetterIndex}`;

    const currentWord = words[currentWordIndex];
    const expectedLetter = currentWord[currentLetterIndex];

    if (currentLetterIndex === 0) {
      setCurrentWordOriginal(currentWord);
    }

    if (
      key.length === 1 &&
      key !== " " &&
      key !== "Backspace" &&
      isLimited !== true
    ) {
      setIsTyping((prev) => {
        if (!prev) {
          return true;
        }
        return prev;
      });

      resetTimer();

      if (!startTime) {
        setStartTime(Date.now());
      }

      if (
        currentLetterIndex + 1 == currentWordOriginal.length &&
        currentWordIndex + 1 == words.length
      ) {
        const lastId = `${currentWordIndex}-${currentLetterIndex}`;

        const updatedResults: ResultsType = {
          ...results,
          [lastId]:
            currentWordOriginal[currentLetterIndex] === key
              ? "correct"
              : "incorrect",
        };

        addWord(updatedResults);
        setEndTime(Date.now());
        setCurrentLetterIndex(0);
        setCurrentWordIndex(0);
        setFinished(true);
        setCurrentLine(0);
        setLineOffset(0);
        setNewText(true);
        setResults({});
        setLimited(false);
        setCurrentWordOriginal("");
        setIsTyping(false);
      }

      if (currentLetterIndex + 1 > currentWord.length) {
        if (words[currentWordIndex].length < currentWordOriginal.length + 19) {
          setWords((prevWords) => {
            const newWords = [...prevWords];
            newWords[currentWordIndex] = prevWords[currentWordIndex] + key;
            return newWords;
          });

          setResults((prev) => ({ ...prev, [id]: "incorrectextra" }));
          setCurrentLetterIndex((i) => i + 1);
        } else {
          setLimited(true);
        }
      } else {
        if (key === expectedLetter) {
          setResults((prev) => ({ ...prev, [id]: "correct" }));

          setCurrentLetterIndex((i) => i + 1);
        } else {
          setResults((prev) => ({ ...prev, [id]: "incorrect" }));

          setCurrentLetterIndex((i) => i + 1);
        }
      }
    }

    if (key === " ") {
      if (currentLetterIndex > 0 && currentWordIndex + 1 < words.length) {
        addWord();
        const currWord = wordRefs.current[currentWordIndex];
        const nextWord = wordRefs.current[currentWordIndex + 1];

        if (currWord && nextWord) {
          const currTop = currWord.getBoundingClientRect().top;
          const nextTop = nextWord.getBoundingClientRect().top;

          if (currentLine >= 1) {
            if (currTop !== nextTop) {
              setLineOffset((prev) => prev + 1);
            }
          }
        }
        setCurrentWordIndex((wi) => wi + 1);
        setCurrentLetterIndex(0);
        setLimited(false);
      }
      if (currentWordIndex + 1 == words.length) {
        setEndTime(Date.now());
        setCurrentLetterIndex(0);
        setCurrentWordIndex(0);
        setFinished(true);
        setCurrentLine(0);
        setLineOffset(0);
        setNewText(true);
        setResults({});
        setLimited(false);
        setCurrentWordOriginal("");
        setIsTyping(false);
      }
    }

    if (key === "Backspace") {
      if (currentLetterIndex > 0) {
        const prevIndex = currentLetterIndex - 1;
        const id = `${currentWordIndex}-${prevIndex}`;

        if (currentLetterIndex > currentWordOriginal.length) {
          setWords((prevWords) => {
            const newWords = [...prevWords];
            newWords[currentWordIndex] = prevWords[currentWordIndex].slice(
              0,
              -1
            );
            setLimited(false);
            return newWords;
          });
        }

        setResults((prev) => {
          const newResults = { ...prev };
          delete newResults[id];
          return newResults;
        });

        setCurrentLetterIndex((prev) => prev - 1);
      } else {
        return;
      }
    }
  };

  useEffect(() => {
    if (startTime && endTime) {
      setElapsedSeconds((endTime - startTime) / 1000);
    }

    if (isSettingsOpen === true) return;
    if (isFinished === true) return;

    const handleKeydown = (e: KeyboardEvent) => {
      if (document.activeElement === inputRef.current) return;

      if (e.ctrlKey) return;

      if (e.getModifierState("CapsLock")) {
        setCapsOn(true);
      } else {
        setCapsOn(false);
      }
      if (e.key === " ") {
        e.preventDefault();
      }

      processKey(e.key);
    };

    window.addEventListener("keydown", handleKeydown);

    resetTimer();

    return () => {
      window.removeEventListener("keydown", handleKeydown);

      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [currentLetterIndex, currentWordIndex, words, isSettingsOpen]);

  const prevLineRef = useRef(currentLine);

  useEffect(() => {
    const updateScroll = () => {
      if (currentLine >= 4 && currentLine > prevLineRef.current) {
        setLineOffset((prev) => prev + 1);

        prevLineRef.current = currentLine = 2;
      } else if (currentLine < prevLineRef.current) {
        setLineOffset((prev) => prev - 1);

        prevLineRef.current = currentLine;
      }
    };

    updateScroll();
  }, [currentLine]);
  return {
    words,
    currentLetterIndex,
    currentWordIndex,
    currentWordOriginal,
    correctWords,
    processKey,
    setWords,
    setCurrentLetterIndex,
    setCurrentWordIndex,
    setCurrentWordOriginal,
    setCorrectWords,
    setStartTime,
    setEndTime,
    setLimited,
  };
}
