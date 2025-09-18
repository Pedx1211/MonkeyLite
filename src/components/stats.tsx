import { useEffect, useState } from "react";

type StatsProps = {
  correctWords: number;
  isFinished: boolean;
  isTyping: boolean;
  typeSetting: number;
  testType: number;
  results: { [key: string]: "correct" | "incorrect" | "incorrectextra" | "" };
  elapsedSeconds: number;
};
export default function Stats({
  correctWords,
  isFinished,
  isTyping,
  typeSetting,
  testType,
  results,
  elapsedSeconds,
}: StatsProps) {
  const [correctLetters, setCorrectLetters] = useState(0);
  const [totalLetters, setTotalLetters] = useState(0);

  useEffect(() => {
    if (isTyping === false) {
      return;
    } else {
      const correctletters = Object.entries(results).filter(
        ([_, value]) => value === "correct"
      ).length;

      const totalletters = Object.entries(results).length;

      setTotalLetters(totalletters);
      setCorrectLetters(correctletters);
    }
  }, [isTyping, isFinished, results]);

  const typeSettingsMap: Record<number, Record<number, number | string>> = {
    1: {
      // time
      1: 15,
      2: 30,
      3: 60,
      4: 120,
    },
    2: {
      // words
      5: 10,
      6: 25,
      7: 50,
      8: 100,
    },
    3: {
      // quote
      9: "short",
      10: "medium",
      11: "long",
      12: "thicc",
    },
  };

  const testTypeMap: Record<number, string> = {
    1: "time",
    2: "words",
    3: "quote",
  };

  return (
    <>
      <div id="stats" className="flex justify-center w-full  items-center">
        <div
          id="group wpm"
          className="flex flex-col gap-2 justify-center w-full  items-center"
        >
          <div
            id="top"
            className="flex justify-center mb-1 leading-[24px] w-full items-center text-[40px] text-[#646669]"
            style={{
              fontFamily: '"Roboto Mono" , monospace',
            }}
          >
            wpm
          </div>
          <div
            id="bottom"
            className="flex justify-center items-center w-full text-[80px] leading-none text-[#E2B714]"
            style={{
              fontFamily: '"Roboto Mono" , monospace',
            }}
          >
            {testType === 1 &&
            typeof typeSettingsMap[testType][typeSetting] === "number"
              ? Math.round(
                  correctLetters /
                    5 /
                    (typeSettingsMap[testType][typeSetting] / 60)
                )
              : null}
            {testType > 1 &&
            typeof typeSettingsMap[testType][typeSetting] !== null &&
            elapsedSeconds > 0
              ? Math.round(correctLetters / 5 / (elapsedSeconds / 60))
              : null}
          </div>
        </div>
      </div>
      <div
        id="morestats"
        className="flex justify-center gap-20 md:gap-0 md:justify-between flex-col md:flex-row w-full items-center"
      >
        <div
          id="group acc"
          className="flex flex-col justify-center w-full  items-center"
        >
          <div
            id="top"
            className="flex justify-center mb-1 w-full leading-[24px] items-center text-[32px] text-[#646669]"
            style={{
              fontFamily: '"Roboto Mono" , monospace',
            }}
          >
            acc
          </div>
          <div
            id="bottom"
            className="flex justify-center items-center text-[64px] leading-none text-[#E2B714]"
            style={{
              fontFamily: '"Roboto Mono" , monospace',
            }}
          >
            {totalLetters > 0
              ? Math.round((correctLetters / totalLetters) * 100) + "%"
              : "0%"}
          </div>
        </div>
        <div
          id="groupcorrect"
          className="flex flex-col justify-center w-full  items-center"
        >
          <div
            id="top"
            className="flex justify-center overflow-hidden whitespace-nowrap mb-1 w-full leading-[24px] items-center text-[32px] text-[#646669]"
            style={{
              fontFamily: '"Roboto Mono" , monospace',
            }}
          >
            Correct
          </div>
          <div
            id="bottom"
            className="flex justify-center items-center text-[64px] leading-none text-[#E2B714]"
            style={{
              fontFamily: '"Roboto Mono" , monospace',
            }}
          >
            {correctWords > 0 ? Math.round(correctWords) : "0"}
          </div>
        </div>
        <div
          id="grouptype"
          className="flex flex-col justify-center w-full  items-center"
        >
          <div
            id="top"
            className="flex justify-center mb-1 w-full leading-[24px] items-center text-[32px] text-[#646669]"
            style={{
              fontFamily: '"Roboto Mono" , monospace',
            }}
          >
            test type
          </div>
          <div
            id="bottom"
            className="flex justify-center items-center text-[48px] sm:text-[56px] text-center xl:text-[64px] leading-none text-[#E2B714]"
            style={{
              fontFamily: '"Roboto Mono" , monospace',
            }}
          >
            {testTypeMap[testType]}{" "}
            {testType === 1 ? typeSettingsMap[testType][typeSetting] + "s" : ""}
            {testType > 1 ? typeSettingsMap[testType][typeSetting] : ""}
          </div>
        </div>
      </div>
    </>
  );
}
