import React, { useState } from "react";
import { useNavigate } from "react-router";
import { useQuestionContext } from "../context/questionContext";
import styles from "./Instructions.module.scss";

const Instructions = () => {
  const [isChecked, setIsChecked] = useState(false);
  const { setActiveState } = useQuestionContext();
  const navigate = useNavigate();
  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  const handleStart = () => {
    if (isChecked) {
      setActiveState("questions");
      localStorage.setItem("progress", "questions");
      navigate("/questions");

      //enable fullscreen mode when quiz is started
      const elem = document.documentElement;
      if (elem.requestFullscreen) {
        elem.requestFullscreen();
      }
    }
  };

  return (
    <div className={styles.instructions}>
      <div className={styles.header}>
        <h2 className={styles.heading1}>Welcome to the Online Quiz</h2>
        <p className={styles.heading2}>
          Please read all instructions carefully before starting the quiz.
        </p>
      </div>

      <div className={styles.mainContent}>
        {" "}
        <ol>
          <li>
            This is a timed quiz. Please complete all questions within the
            allotted time. The quiz will be auto-submitted when time is up.
          </li>
          <li>Read each question carefully before answering.</li>
          <li>
            You can navigate between questions using the "Previous" and "Next"
            buttons.
          </li>
          <li>There is no negative marking.</li>
          <li>Once the test is submitted, you can view your score.</li>
        </ol>
        <label htmlFor="confirm" className={styles.checkLabel}>
          <input
            type="checkbox"
            id="confirm"
            checked={isChecked}
            onChange={handleCheckboxChange}
            className={`${styles.check} me-2`}
          />
          I am ready to begin
        </label>
        <button
          onClick={handleStart}
          disabled={!isChecked}
          className={`btn btn-primary mt-3  py-2 px-lg-4`}
        >
          Start
        </button>
      </div>
    </div>
  );
};

export default Instructions;
