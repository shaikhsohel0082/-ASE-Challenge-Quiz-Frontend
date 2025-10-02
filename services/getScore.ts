import axios from "axios";
import type { IQuestion } from "./getAllQuestions";
export type IScorePayload = Array<{ id: string; selectedOption: string }>;
export interface Iscore {
  score: number;
  totalQuestions: number;
  details: IQuestion[];
}
export const getScore = async ({
  scorePayload,
}: {
  scorePayload: IScorePayload;
}) => {
  try {
    const backendURL =
      import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";
    const res = await axios.post(
      `${backendURL}/question/getScore`,
      scorePayload
    );
    return res.data as Iscore;
  } catch (err) {
    console.log(err || "Something went wrong!");
  }
};
