import { useState, type ReactNode } from "react";
import { QuestionContext, type IQuestionAttepmt } from "./questionContext";

export const QuestionProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [activeState, setActiveState] = useState<
    "instructions" | "questions" | "score"
  >("instructions");
  const [activeQuestionIndex, setActiveQuestionIndex] = useState<number>(0);
  const [attemptedQuestions, setAttemptedQuestions] = useState<
    Array<IQuestionAttepmt>
  >([]);
  const [timer, setTimer] = useState(0);

  const addAttempt = (attempt: {
    questionId: string;
    selectedOption: string;
  }) => {
    setAttemptedQuestions((prev) => {
      const existing = prev.find((q) => q.questionId === attempt.questionId);
      if (existing) {
        return prev.map((q) =>
          q.questionId === attempt.questionId ? attempt : q
        );
      }
      const newQuestion = [...prev, attempt];
      sessionStorage.setItem("attemptedQuestion", JSON.stringify(newQuestion));
      return newQuestion;
    });
  };

  return (
    <QuestionContext.Provider
      value={{
        activeState,
        attemptedQuestions,
        setActiveState,
        addAttempt,
        activeQuestionIndex,
        setActiveQuestionIndex,
        timer,
        setTimer,
      }}
    >
      {children}
    </QuestionContext.Provider>
  );
};
