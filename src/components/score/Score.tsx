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
import { useNavigate } from "react-router";
const Score = () => {
  const { attemptedQuestions: attempt ,setActiveState} = useQuestionContext();
  const attemptFromLocalStorage = JSON.parse(
    localStorage.getItem("attemptedQuestion") + ""
  );

  const attemptedQuestions: IQuestionAttepmt[] = useMemo(() => {
    if (attemptFromLocalStorage) {
      return attemptFromLocalStorage;
    } else {
      return attempt;
    }
  }, [attempt, attemptFromLocalStorage]);

  const payload = useMemo(() => {
    return attemptedQuestions?.map((que) => ({
      id: que.questionId,
      selectedOption: que.selectedOption,
    }));
  }, [attemptedQuestions]);
  const { data, isError, isLoading } = useGetScore({ payload });
  const navigate = useNavigate();
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
                    localStorage.clear();
                    localStorage.setItem("stateFromStorage", "instructions");
                    setActiveState("instructions");
                    navigate("/");
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
