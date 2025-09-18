import { useEffect, useLayoutEffect, useRef } from "react";

export function useCaret(
  isTyping: boolean,
  words: string[],
  letterRefs: React.RefObject<(HTMLDivElement | null)[][]>,
  wordRefs: React.MutableRefObject<(HTMLSpanElement | null)[]>,
  caretRef: React.RefObject<HTMLDivElement | null>,
  wrapperRef: React.RefObject<HTMLDivElement | null>,
  currentWordIndex: number,
  currentLetterIndex: number,
  currentWordOriginal: string,
  newText: boolean,
  lineHeight: number,
  setLineHeight: React.Dispatch<React.SetStateAction<number>>,
  setCurrentLine: React.Dispatch<React.SetStateAction<number>>
) {
  const parentRectRef = useRef<DOMRect | null>(null);
  const lastScrollRef = { current: -1 };

  const positionCaret = () => {
    if (!isTyping && currentWordIndex === 0 && currentLetterIndex === 0) {
      return;
    }

    const currentLetters = letterRefs.current[currentWordIndex];

    if (!currentLetters || !caretRef.current || !wrapperRef.current) return;

    const letterEl =
      currentLetters[currentLetterIndex] ||
      currentLetters[currentLetterIndex - 1];

    if (!letterEl) {
      requestAnimationFrame(positionCaret);
      return;
    }

    const rect = letterEl.getBoundingClientRect();
    const parentRect = parentRectRef.current;

    if (!parentRect) return;

    const extraOffset =
      currentLetterIndex >= currentWordOriginal.length &&
      currentLetterIndex !== 0
        ? rect.width
        : 0;

    const horizontalOffset = -10;

    let lineIndex = Math.round((rect.top - parentRect.top) / lineHeight);
    if (lineIndex < 0) lineIndex = 0;

    const verticalOffset = lineIndex * lineHeight;

    caretRef.current.style.transform = `translate(${
      rect.left - parentRect.left + extraOffset + horizontalOffset
    }px, ${verticalOffset}px)`;

    const line = Math.floor(lineIndex);

    if (lastScrollRef.current !== line || verticalOffset > 70) {
      setCurrentLine(line);

      lastScrollRef.current = line;
    }
  };

  useEffect(() => {
    const updateLineHeight = () => {
      if (!wrapperRef.current) return;

      let lh = parseFloat(
        window.getComputedStyle(wrapperRef.current).lineHeight
      );

      if (!lh || Number.isNaN(lh)) {
        const words = wordRefs.current.filter(Boolean);
        if (words.length > 1) {
          const rect1 = words[0]!.getBoundingClientRect();
          const rect2 = words
            .find((w) => w!.getBoundingClientRect().top !== rect1.top)
            ?.getBoundingClientRect();
          if (rect1 && rect2) {
            lh = Math.abs(rect2.top - rect1.top);
          }
        }
      }

      if (!lh && wordRefs.current[0]) {
        lh = wordRefs.current[0]!.offsetHeight;
      }

      setLineHeight(lh);

      if (wrapperRef.current) {
        parentRectRef.current = wrapperRef.current.getBoundingClientRect();
      }
      positionCaret();
    };

    updateLineHeight();
    window.addEventListener("resize", updateLineHeight);

    return () => window.removeEventListener("resize", updateLineHeight);
  }, [newText, currentWordIndex]);

  useEffect(() => {
    letterRefs.current = words.map(
      (word, wi) => letterRefs.current[wi] || Array(word.length).fill(null)
    );
  }, [words]);

  useLayoutEffect(() => {
    const id = requestAnimationFrame(positionCaret);
    return () => cancelAnimationFrame(id);
  }, [currentLetterIndex, currentWordIndex, words, isTyping, newText]);
}
