import { useMemo } from "react";
import {
  useQuestionContext,
  type IQuestionAttepmt,
} from "../context/questionContext";
import DisplayError from "../DisplayError/DisplayError";
import { useGetScore } from "../hooks/useGetScore";
import Loader from "../Loader/Loader";
import Question from "../Question/Question";
import styles from "./Score.module.scss";
const Score = () => {
  const { attemptedQuestions: attempt } = useQuestionContext();
  const attemptFromsessionStorage = JSON.parse(
    sessionStorage.getItem("attemptedQuestion") + ""
  );

  const attemptedQuestions: IQuestionAttepmt[] = useMemo(() => {
    if (attemptFromsessionStorage) {
      return attemptFromsessionStorage;
    } else {
      return attempt;
    }
  }, [attempt, attemptFromsessionStorage]);

  const payload = useMemo(() => {
    return attemptedQuestions?.map((que) => ({
      id: que.questionId,
      selectedOption: que.selectedOption,
    }));
  }, [attemptedQuestions]);
  const { data, isError, isLoading } = useGetScore({ payload });
 
  return (
    <>
      {isLoading ? (
        <Loader />
      ) : isError ? (
        <DisplayError />
      ) : (
        <>
          <div className={styles.scoreWrapper}>
            <div className={styles.score}>
              <div className={`${styles.heading1}`}>
                Score:{data?.score}/{data?.totalQuestions}
              </div>
              <div className={styles.exit}>
                <button
                  className="btn btn-outline-danger px-4 py-2"
                  onClick={() => {
                    sessionStorage.clear();
                    window.location.href = "https://www.google.com/"; 
                  }}
                >
                  Exit
                </button>
              </div>
            </div>
          </div>
          <Question data={data?.details} context="score" />
        </>
      )}
    </>
  );
};

export default Score;
