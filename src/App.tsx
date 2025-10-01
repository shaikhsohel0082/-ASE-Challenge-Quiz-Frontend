import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import Instructions from "./components/Instructions/Instructions";

import { useEffect, useMemo } from "react";
import { useQuestionContext } from "./components/context/questionContext";
import QuestionDisplay from "./components/Question/QuestionDisplay";
import Score from "./components/score/Score";

function App() {
  const { activeState: active } = useQuestionContext();
  const stateFromStorage = localStorage.getItem("progress");
  const activeState = useMemo(() => {
    return stateFromStorage || active;
  }, [active, stateFromStorage]);

  const navigate = useNavigate();

  useEffect(() => {
    if (activeState === "instructions") {
      navigate("/", { replace: true });
    } else if (activeState === "questions") {
      navigate("/questions", { replace: true });
    } else if (activeState === "score") {
      navigate("/score", { replace: true });
    }
  }, [activeState, navigate]);

  return (
    <Routes>
      <Route path="/" element={<Instructions  />} />
      <Route
        path="/questions"
        element={
          activeState === "questions" ? (
            <QuestionDisplay />
          ) : (
            <Navigate to="/" replace />
          )
        }
      />
      <Route
        path="/score"
        element={
          activeState === "score" ? <Score /> : <Navigate to="/" replace />
        }
      />
    </Routes>
  );
}

export default App;
