import React, { createContext, useContext } from "react";
export interface IQuestionAttepmt {
  questionId: string;
  selectedOption: string;
}
export interface QuestionContextType {
  activeState: "instructions" | "questions" | "score";
  activeQuestionIndex: number;
  setActiveQuestionIndex: React.Dispatch<React.SetStateAction<number>>;
  attemptedQuestions: Array<IQuestionAttepmt>;
  setActiveState: (state: "instructions" | "questions" | "score") => void;
  addAttempt: (attempt: { questionId: string; selectedOption: string }) => void;
  timer: number;
  setTimer: React.Dispatch<React.SetStateAction<number>>;
}

export const QuestionContext = createContext<QuestionContextType | undefined>(
  undefined
);

export const useQuestionContext = () => {
  const context = useContext(QuestionContext);
  if (!context) {
    throw new Error("useQuestionContext must be used inside QuestionProvider");
  }
  return context;
};
