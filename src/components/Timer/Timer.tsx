import React, { useEffect, useMemo } from "react";
import { useQuestionContext } from "../context/questionContext";
import styles from "./Timer.module.scss";
interface Props {
  totalSec: number;
}

const formatTime = (seconds: number) => {
  const hrs = Math.floor(seconds / 3600);
  const mins = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;

  const pad = (num: number) => String(num).padStart(2, "0");
  return `${hrs > 0 ? `${pad(hrs)}:` : ""}${pad(mins)}:${pad(secs)}`;
};

const Timer = ({ totalSec: sec }: Props) => {
  const { timer, setTimer } = useQuestionContext();

  const totalSec = useMemo(() => {
    const timeFromStorage = Number(sessionStorage.getItem("timer"));
    if (timeFromStorage && timeFromStorage < sec) {
      return timeFromStorage;
    }
    return sec;
  }, [sec]);

  useEffect(() => {
    setTimer(totalSec);
    sessionStorage.setItem("timer", totalSec.toString());

    const interval = setInterval(() => {
      setTimer((prev) => {
        const newTimer = Math.max(0, prev - 1);
        sessionStorage.setItem("timer", newTimer.toString());
        return newTimer;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [setTimer, totalSec]);

  return (
    <div className={styles.timer}>
      <h3 className={`${timer / 60 <= 5 ? "text-danger" : ""}`}>
        Time Left: {formatTime(timer)}
      </h3>
    </div>
  );
};

export default Timer;
