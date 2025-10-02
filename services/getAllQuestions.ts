import axios from "axios";

export interface IOption{
    key:string;
    value:string;
    image:string;
}
export interface IQuestion{
    id:string;
    title:string;
    questionType:string;
    image:string;
    options:IOption[];

    /***** For displaying score details******/
    correctOption?:string;
    selectedOption?:string;
    unattempted?:boolean;
    isCorrect?:boolean;

}
export const getAllQuestion= async ()=>{
    const backendURL=import.meta.env.VITE_BACKEND_URL ||  "http://localhost:5000"
    const url=`${backendURL}/question/getAllQuestions`
    try{
        const res=await axios.get(url);
        return res.data as IQuestion[];
    }catch(err){
        console.log(err || "Something went wrong")
    }

}