import React, { useEffect, useMemo } from "react";
import type { IOption, IQuestion } from "../../../services/getAllQuestions";
import { useQuestionContext } from "../context/questionContext";
import Options from "./Options/Options";
import { useNavigate } from "react-router";
import styles from "./QuestionDisplay.module.scss";
interface Props {
  data: IQuestion[] | undefined;
  context?: "question" | "score";
}
const questionStatus = (unattempted: boolean, isCorrect: boolean) => {
  if (unattempted) {
    return "UnAttempted";
  } else if (isCorrect) {
    return "Correct";
  } else return "Incorrect";
};
const Question = ({ data, context = "question" }: Props) => {
  const {
    activeQuestionIndex: queIndex,
    setActiveQuestionIndex,
    addAttempt,
    setActiveState,
    timer: stateTime,
  } = useQuestionContext();
  const navigate = useNavigate();
  const activeQuestionIndex = useMemo(() => {
    const idxFromStorage = Number(sessionStorage.getItem("activeQuestionIndex"));
    if (idxFromStorage > 0) {
      return idxFromStorage;
    }
    return queIndex;
  }, [queIndex]);

  const timer = useMemo(() => {
    return Math.max(Number(sessionStorage.getItem("timer")), stateTime);
  }, [stateTime]);

  const handleClick = (opt: IOption, questionId: string) => {
    if (context === "question") {
      addAttempt({
        questionId,
        selectedOption: opt.key,
      });
    }
  };

  const handleSubmit = () => {
    let canSubmit = false;
    if (Number(timer) == 0 && context === "question") {
      canSubmit = true;
    } else if (window.confirm("Are you sure you want to submit the quiz?")) {
      canSubmit = true;
    }

    if (canSubmit) {
      setActiveState("score");
      sessionStorage.setItem("progress", "score");
      navigate("/score");
      setActiveQuestionIndex(0);
      sessionStorage.setItem("activeQuestionIndex", "0");
    }
  };

  useEffect(() => {
    const timeOutId = setTimeout(() => {
      if (Number(timer) == 0 && context === "question") {
        handleSubmit();
      }
    }, 50);
    return () => {
      clearTimeout(timeOutId);
    };
  }, [timer]);

  if (!data) return null;
  return (
    <div className={styles.questionWrapper}>
      {data?.map((question, index) => {
        if (activeQuestionIndex === index)
          return (
            <div key={`${question.id}${question.correctOption}`}>
              <div className={`mt-lg-5 mb-lg-4`}>
                <span>{index + 1}.</span>{" "}
                <span className={styles.questionTitle}>{question.title}</span>
                {context === "score" && (
                  <div
                    className={`${styles.questionStatus} ms-5`}
                    style={{
                      backgroundColor: `${
                        question.isCorrect
                          ? "#27e78d"
                          : question.unattempted || false
                          ? "#34aed6"
                          : "#f8d7da"
                      }`,
                    }}
                  >
                    {questionStatus(
                      question.unattempted || false,
                      question.isCorrect || false
                    )}
                  </div>
                )}
              </div>
              {question.image && (
                <div className="mb-4 w-100 d-flex  align-items-center">
                  <img src={question.image} alt={"question"} />
                </div>
              )}
              <Options
                handleClick={(opt) => {
                  handleClick(opt, question.id);
                }}
                question={question}
                context={context}
              />
            </div>
          );
      })}
      <div
        className={`d-flex w-50  align-items-center justify-content-evenly mb-lg-5`}
      >
        <button
          onClick={() => {
            setActiveQuestionIndex(() => {
              const index = Math.max(activeQuestionIndex - 1, 0);
              sessionStorage.setItem("activeQuestionIndex", index.toString());
              return index;
            });
          }}
          disabled={activeQuestionIndex === 0}
          className="btn btn-primary px-lg-3 py-1 fs-2"
        >
          Prev
        </button>
        <button
          onClick={() => {
            if (activeQuestionIndex < data.length - 1) {
              setActiveQuestionIndex(() => {
                const index = Math.min(
                  activeQuestionIndex + 1,
                  data.length - 1
                );
                sessionStorage.setItem("activeQuestionIndex", index.toString());
                return index;
              });
            } else {
              handleSubmit();
            }
          }}
          className={`btn ${
            activeQuestionIndex === data.length - 1
              ? "btn-success"
              : "btn-primary"
          } px-lg-3 py-1 fs-2`}
          disabled={
            activeQuestionIndex === data.length - 1 && context === "score"
          }
        >
          {activeQuestionIndex === data.length - 1 && context === "question"
            ? "Submit"
            : "Next"}
        </button>
      </div>
    </div>
  );
};

export default Question;
