import { useMemo } from "react";
import { useQuestionContext } from "../context/questionContext";
import DisplayError from "../DisplayError/DisplayError";
import { useGetAllQuestions } from "../hooks/useGetAllQuestions";
import Loader from "../Loader/Loader";
import Timer from "../Timer/Timer";
import Question from "./Question";
const QuestionDisplay = () => {
  const { data, isLoading, isError } = useGetAllQuestions();
  const { activeState: active } = useQuestionContext();

  const activeState = useMemo(() => {
    const stateFromStorage = sessionStorage.getItem("progress");
    return stateFromStorage || active;
  }, [active]);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : isError ? (
        <DisplayError />
      ) : (
        <div>
          {activeState === "questions" && (
            <Timer totalSec={(data?.length || 1) * 60} />
          )}
          <Question data={data} />
        </div>
      )}
    </>
  );
};

export default QuestionDisplay;
