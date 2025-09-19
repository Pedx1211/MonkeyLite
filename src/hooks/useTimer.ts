import { useEffect, useRef, useState } from "react";

interface UseTimerProps {
  typeSetting: number;
  testType: number;
  isTyping: boolean;
  setFinished: React.Dispatch<React.SetStateAction<boolean>>;
  setIsTyping: React.Dispatch<React.SetStateAction<boolean>>;
}

export function useTimer({
  typeSetting,
  testType,
  isTyping,
  setFinished,
  setIsTyping,
}: UseTimerProps) {
  const timeLimitMap: Record<number, number> = {
    1: 15,
    2: 30,
    3: 60,
    4: 120,
  };

  const timeLimit = timeLimitMap[typeSetting];

  const [time, setTime] = useState(timeLimit);
  const intervalRef = useRef<number | null>(null);

  useEffect(() => {
    setTime(timeLimit);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, [isTyping, typeSetting, testType, timeLimit]);

  useEffect(() => {
    if (!isTyping) {
      return;
    }
    if (intervalRef.current) {
      return;
    }
    if (testType !== 1) return;
    if (typeSetting > 4 && typeSetting !== 0) return;

    intervalRef.current = setInterval(() => {
      setTime((prev) => {
        if (prev <= 1) {
          clearInterval(intervalRef.current!);
          intervalRef.current = null;
          setIsTyping(false);
          setFinished(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [isTyping, testType, typeSetting]);

  const formatTime = (seconds: number) => {
    if (seconds === undefined) return "";

    if (testType !== 1) return "";

    if (timeLimit >= 60) {
      const m = Math.floor(seconds / 60);
      const s = seconds % 60;
      return `${m.toString().padStart(2, "0")}:${s
        .toString()
        .padStart(2, "0")}`;
    }

    return seconds.toString();
  };

  return { time, formatTime };
}
