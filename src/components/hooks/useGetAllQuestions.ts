import { useQuery } from "@tanstack/react-query"
import {getAllQuestion} from "../../../services/getAllQuestions"
export const useGetAllQuestions=()=>{

    const {data,isLoading,isError}=useQuery({
        queryKey:["getAllQuestions"],
        queryFn:getAllQuestion,

    })
    return {
        data,
        isError,
        isLoading
    }
}