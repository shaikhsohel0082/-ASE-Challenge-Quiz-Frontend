import { useQuery } from "@tanstack/react-query"
import {getScore, type IScorePayload} from "../../../services/getScore"
interface Props{
    payload:IScorePayload
}
export const useGetScore=({payload}:Props)=>{
    const {data,isLoading,isError}=useQuery({
        queryKey:["getScore"],
        queryFn:()=>getScore({scorePayload:payload})
    })
    return {
        data,
        isError,
        isLoading
    }
}