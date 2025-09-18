import { useEffect, useRef, useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import "./App.css";

import Nav from "./components/nav";

import Settings from "./components/testSettings";

import { useGenerateText } from "./hooks/useGenerateText";

import { faGlobeAmericas } from "@fortawesome/free-solid-svg-icons";

import { faRedoAlt } from "@fortawesome/free-solid-svg-icons";

import { faLock } from "@fortawesome/free-solid-svg-icons";

import { useTestLogic } from "./hooks/useTestLogic";

import { useCaret } from "./hooks/useCaret";

import Stats from "./components/stats";

import { useTimer } from "./hooks/useTimer";

import { WordsGrid } from "./components/wordsGrid";

import { useWarning } from "./hooks/useWarning";

import About from "./components/About";

function App() {
  const [newText, setNewText] = useState(true);
  const [testType, setTestType] = useState(1);
  const [typeSetting, setTypeSetting] = useState(1);
  const [isSettingsOpen, setSettingsOpen] = useState(false);
  const [isCapsOn, setCapsOn] = useState(Boolean);
  const [results, setResults] = useState<{
    [key: string]: "correct" | "incorrect" | "incorrectextra" | "";
  }>({});
  const [isTyping, setIsTyping] = useState(false);
  const [lineOffset, setLineOffset] = useState(0);
  const [currentLine, setCurrentLine] = useState(0);
  const [lineHeight, setLineHeight] = useState(0);
  const [isFinished, setFinished] = useState(false);
  const [isAbout, setAbout] = useState(false);
  const caretRef = useRef<HTMLDivElement>(null);
  const letterRefs = useRef<(HTMLDivElement | null)[][]>([]);
  const wordRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);

  const { warning, text, showWarning } = useWarning();

  const handleReset = () => {
    setCurrentLetterIndex(0);
    setCurrentWordIndex(0);
    setCurrentLine(0);
    setLineOffset(0);
    setNewText(true);
    setResults({});
    setLimited(false);
    setCurrentWordOriginal("");
    setIsTyping(false);
    setCorrectWords(0);
    setElapsedSeconds(0);
    setStartTime(0);
    setEndTime(0);
  };

  const {
    words,
    currentLetterIndex,
    currentWordIndex,
    currentWordOriginal,
    correctWords,
    setWords,
    setCurrentLetterIndex,
    setCurrentWordIndex,
    setCurrentWordOriginal,
    setCorrectWords,
    setStartTime,
    setEndTime,
    setLimited,
  } = useTestLogic({
    isSettingsOpen,
    currentLine,
    wordRefs,
    results,
    isFinished,
    setFinished,
    setLineOffset,
    setCapsOn,
    setIsTyping,
    setNewText,
    setCurrentLine,
    setResults,
    setElapsedSeconds,
  });

  useGenerateText(newText, testType, typeSetting, setWords, setNewText);

  useCaret(
    isTyping,
    words,
    letterRefs,
    wordRefs,
    caretRef,
    wrapperRef,
    currentWordIndex,
    currentLetterIndex,
    currentWordOriginal,
    newText,
    lineHeight,
    setLineHeight,
    setCurrentLine
  );

  useEffect(() => {
    setNewText(!newText);
  }, [testType, typeSetting]);

  const { time, formatTime } = useTimer({
    typeSetting,
    testType,
    isTyping,
    setFinished,
  });
  return (
    <>
      <div className="flex flex-col justify-start items-start w-full h-screen px-4 padding-0 py-6 overflow-y-auto relative">
        <Nav
          isTyping={isTyping}
          handleReset={handleReset}
          warning={warning}
          text={text}
          showWarning={showWarning}
          setFinished={setFinished}
          setAbout={setAbout}
        />
        <div className="flex flex-col justify-center relative py-8 items-center w-full my-div mx-auto ">
          <div
            className={`absolute top-21 leading-none justify-center items-center rounded-md gap-3 bg-[#E2B714] p-4 text-[16px] font-normal text-[#323437] ${
              isCapsOn ? "flex" : "hidden"
            } ${isFinished ? "hidden" : "flex"} ${isAbout ? "hidden" : "flex"}`}
            style={{ fontFamily: '"Roboto Mono", monospace' }}
          >
            <FontAwesomeIcon icon={faLock} className="max-h-[16px]" />
            Caps Lock
          </div>
          <Settings
            isFinished={isFinished}
            isAbout={isAbout}
            isTyping={isTyping}
            isSettingsOpen={isSettingsOpen}
            setSettingsOpen={setSettingsOpen}
            testType={testType}
            setTestType={setTestType}
            typeSetting={typeSetting}
            setTypeSetting={setTypeSetting}
          />
          <div className="w-full h-full flex items-center justify-center">
            <div className="flex flex-col justify-center items-center w-full my-auto max-h-[265px] gap-2">
              <div
                className={` justify-center items-center max-h-10 w-full ${
                  isFinished ? "hidden" : "flex"
                } ${isAbout ? "hidden" : "flex"}`}
              >
                <div
                  className={` justify-center ml-[7px] items-center h-full mr-auto text-[#e2b614] font-normal text-[32px] ${
                    isTyping ? "flex" : "hidden"
                  }`}
                  style={{ fontFamily: '"Roboto Mono", monospace' }}
                >
                  {testType === 1
                    ? formatTime(time)
                    : correctWords + "/" + words.length}
                </div>
                <a
                  onClick={() => {
                    showWarning("Other languages coming soon!");
                  }}
                  className={` cursor-pointer h-full group text-[#646669] hover:text-[#d1d0c5] justifty-center px-4 py-2 gap-2 items-center ${
                    isTyping ? "hidden" : "flex"
                  }`}
                  style={{ fontFamily: '"Roboto Mono", monospace' }}
                >
                  <FontAwesomeIcon
                    icon={faGlobeAmericas}
                    className="text-[#646669] group-hover:text-[#d1d0c5]"
                  />
                  english
                </a>
              </div>
              <div
                className={` flex-col justify-center items-center w-full relative ${
                  isFinished ? "hidden" : "flex"
                } ${isAbout ? "hidden" : "flex"}`}
              >
                <div
                  ref={caretRef}
                  className="absolute w-[4px] rounded-sm h-[35.2px] bg-[#e2b614] transition-transform duration-100 ease-linear"
                  style={{
                    top: 5,
                    left: 7,
                    transform:
                      currentWordIndex === 0 && currentLetterIndex === 0
                        ? "translateY(2.5px)"
                        : "",
                  }}
                ></div>
                <div
                  className="flex flex-wrap min-w-full max-h-[158.5px] overflow-hidden relative leading-relaxed"
                  ref={wrapperRef}
                >
                  <WordsGrid
                    words={words}
                    results={results}
                    currentWordIndex={currentWordIndex}
                    lineOffset={lineOffset}
                    wordRefs={wordRefs}
                    letterRefs={letterRefs}
                  />
                </div>
                <input
                  ref={inputRef}
                  type="text"
                  className="absolute w-full h-full opacity-0 cursor-default"
                  autoCapitalize="off"
                  autoCorrect="off"
                  spellCheck="false"
                  onFocus={() => {
                    console.log("Keyboard is up!");
                  }}
                  onKeyDown={(e) => {
                    e.preventDefault();
                  }}
                />
              </div>
            </div>
          </div>
          <div
            id="wrapper"
            className={` justify-center flex-col w-full gap-12 items-center  ${
              isFinished ? "flex" : "hidden"
            }`}
          >
            <Stats
              correctWords={correctWords}
              isFinished={isFinished}
              isTyping={isTyping}
              typeSetting={typeSetting}
              testType={testType}
              results={results}
              elapsedSeconds={elapsedSeconds}
            />
          </div>
          <div
            id="About"
            className={` justify-center flex-col w-full gap-2 items-start  ${
              isAbout ? "flex" : "hidden"
            }`}
          >
            {" "}
            <About />
          </div>
          <div
            className={`flex justify-center items-center w-full ${
              isFinished ? "mt-5" : "mt-0"
            }`}
          >
            <a
              onClick={() => {
                setFinished(false);
                handleReset();
              }}
              className={`cursor-pointer h-full mt-2 justifty-center px-4 py-2 gap-2 items-center relative group ${
                isAbout ? "hidden" : "flex"
              }`}
            >
              <span className="absolute top-11.5 left-1/2 -translate-x-1/2 w-0 h-0 border-l-5 border-l-transparent hidden group-hover:block border-r-5 border-r-transparent border-b-5 border-t-[#101010F2]"></span>
              <span
                className="absolute  top-13 left-1/2 -translate-x-1/2 whitespace-nowrap overflow-hidden  mb-2 hidden group-hover:block bg-[#101010F2] text-white leading-none text-md px-4 py-2 rounded"
                style={{
                  fontFamily: '"Roboto Mono" , monospace',
                }}
              >
                Restart Test
              </span>
              <FontAwesomeIcon
                icon={faRedoAlt}
                className="text-[#646669] hover:text-[#d1d0c5]"
              />
            </a>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
