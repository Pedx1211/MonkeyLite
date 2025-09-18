import { useState, useRef } from "react";

export function useWarning() {
  const [warning, setWarning] = useState(false);
  const [text, setText] = useState("");
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const showWarning = (message: string, duration = 4000) => {
    setText(message);
    setWarning(true);

    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    timeoutRef.current = setTimeout(() => {
      setWarning(false);
      setText("");
      timeoutRef.current = null;
    }, duration);
  };

  return { warning, text, showWarning };
}
