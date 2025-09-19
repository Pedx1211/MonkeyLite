import { useEffect } from "react";

export function useGenerateText(
  newText: boolean,
  testType: number,
  typeSetting: number,
  setWords: React.Dispatch<React.SetStateAction<string[]>>,
  setNewText: React.Dispatch<React.SetStateAction<boolean>>
) {
  const wordsTypeMap: Record<number, number> = {
    5: 10,
    6: 25,
    7: 50,
    8: 100,
    9: 0,
    10: 1,
    11: 2,
    12: 3,
  };

  const groups = [
    [0, 100], // short
    [101, 300], // medium
    [301, 600], // long
    [601, 9999], // thicc
  ];

  useEffect(() => {
    if (newText === true) {
      if (testType === 1) {
        Promise.all([
          fetch("/words/medium.txt").then((res) => res.text()),
          fetch("/words/short.txt").then((res) => res.text()),
        ]).then(([txt1, txt2]) => {
          const words1 = txt1
            .split(/\s+/)
            .filter((w) => w.length > 1 || w === "a" || w === "I");
          const words2 = txt2
            .split(/\s+/)
            .filter((w) => w.length > 1 || w === "a" || w === "I");

          const allWords: string[] = [];
          const countPerFile = Math.floor(200 / 2);

          for (let i = 0; i < countPerFile; i++) {
            if (words1[i]) allWords.push(words1[i]);
            if (words1[i]) allWords.push(words1[i]);
            if (words2[i]) allWords.push(words2[i]);
          }

          function shuffleArray(arr: string[]) {
            for (let i = arr.length - 1; i > 0; i--) {
              const j = Math.floor(Math.random() * (i + 1));
              [arr[i], arr[j]] = [arr[j], arr[i]];
            }
          }

          shuffleArray(allWords);
          setWords(allWords);
          setNewText(false);
        });
      }
      if (testType === 2) {
        Promise.all([
          fetch("/words/medium.txt").then((res) => res.text()),
          fetch("/words/short.txt").then((res) => res.text()),
        ]).then(([txt1, txt2]) => {
          const words1 = txt1
            .split(/\s+/)
            .filter((w) => w.length > 1 || w === "a" || w === "I");
          const words2 = txt2
            .split(/\s+/)
            .filter((w) => w.length > 1 || w === "a" || w === "I");

          const totalWords = wordsTypeMap[typeSetting];
          const words1Count = Math.round(totalWords * 0.75);
          const words2Count = totalWords - words1Count;

          const allWords: string[] = [];

          for (let i = 0; i < words1Count; i++) {
            if (words1[i]) allWords.push(words1[i]);
          }

          for (let i = 0; i < words2Count; i++) {
            if (words2[i]) allWords.push(words2[i]);
          }

          function shuffleArray(arr: string[]) {
            for (let i = arr.length - 1; i > 0; i--) {
              const j = Math.floor(Math.random() * (i + 1));
              [arr[i], arr[j]] = [arr[j], arr[i]];
            }
          }

          shuffleArray(allWords);
          setWords(allWords);
          setNewText(false);
        });
      }
      if (testType === 3) {
        fetch("/quotes/english.json")
          .then((res) => res.json())
          .then((data) => {
            const groupIndex = wordsTypeMap[typeSetting];
            if (groupIndex === undefined) return null;

            const [min, max] = groups[groupIndex];

            const filtered = data.quotes.filter(
              (q: { length: number }) => q.length >= min && q.length <= max
            );

            if (filtered.length === 0) return null;

            const randomQuote =
              filtered[Math.floor(Math.random() * filtered.length)];

            setWords(randomQuote.text.split(/\s+/));
            setNewText(false);
          });
      }
    } else {
      return;
    }
  }, [newText]);
}
