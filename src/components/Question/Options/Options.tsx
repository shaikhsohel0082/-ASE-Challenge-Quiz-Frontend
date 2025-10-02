import { useMemo } from "react";
import type { IOption, IQuestion } from "../../../../services/getAllQuestions";
import { useQuestionContext } from "../../context/questionContext";
import styles from "./Options.module.scss";
interface Props {
  handleClick: (opt: IOption) => void;
  question: IQuestion;
  context: "question" | "score";
}
const Options = ({ handleClick, context, question }: Props) => {
  const { attemptedQuestions: attempt } = useQuestionContext();
  const restoredQuestions = JSON.parse(
    sessionStorage.getItem("attemptedQuestion") + ""
  );
  const attemptedQuestions: {
    questionId: string;
    selectedOption: string;
  }[] = useMemo(() => {
    return attempt.length > 0 ? attempt : restoredQuestions || [];
  }, [attempt, restoredQuestions]);

  const selectedOption = useMemo(() => {
    const currentQuestion = attemptedQuestions.find(
      (que) => que.questionId === question.id
    );
    if (context === "score") return question.selectedOption;
    if (!currentQuestion) return "";
    return currentQuestion.selectedOption;
  }, [attemptedQuestions, context, question]);

  return (
    <div>
      {Array.isArray(question.options) &&
        question.options?.map((option) => (
          <div
            key={option.key}
            className={`${styles.option} ${
              question.correctOption === option.key && context === "score"
                ? styles.correct
                : ""
            } ${
              question.selectedOption === option.key &&
              context === "score" &&
              !question.isCorrect
                ? styles.wrong
                : ""
            } mb-4`}
          >
            <div>
              <input
                type="radio"
                id={option.key}
                name={question.id}
                checked={selectedOption === option.key}
                disabled={context === "score"}
                onChange={() => {
                  handleClick(option);
                }}
                className={`${styles.radio} me-3`}
              />
            </div>
            <div className={styles.optContainer}>
              <label htmlFor={option.key}>
                {option.image && (
                  <img
                    src={option.image}
                    alt={option.value}
                    height={200}
                    width={300}
                    className="mt-2 me-2"
                  />
                )}
                {option.value}
              </label>
            </div>
            {context === "score" && question.selectedOption === option.key && (
              <div className={styles.selectedText}>Selected option</div>
            )}
          </div>
        ))}
    </div>
  );
};

export default Options;
