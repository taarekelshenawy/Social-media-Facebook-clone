import { AuthContext } from "@/context/context";
import axios, { isAxiosError } from "axios";
import { useContext } from "react";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";



type deleteProps={
    token:string,
    id:string,
}
const deleteComment =async({token,id}:deleteProps)=>{
    console.log(id,token)
    try{
        const response = await axios.delete(`https://linked-posts.routemisr.com/comments/${id}`,{
            headers:{
                token:token,
            }
        });
        return response.data.data;

    }
    catch(error){
        if(isAxiosError(error)){
            if(error.response){
                throw new Error(error.response.data.message ||"unexpected Error")
            }else{
                throw new Error(error.message)
            }
        }

    }
  
}
export default function useDeleteComment() {
    const context = useContext(AuthContext);
    if(!context) throw new Error('there is no context');
    const {token}=context;
  return useMutation({
    mutationFn:(id:string)=>deleteComment({token,id}),
    onSuccess:()=>{
        toast('comment Deleted')
    },
    onError: (error: unknown) => {
  if (typeof error === "string") {
    toast.error(error);
  } else if (error instanceof Error) {
    toast.error(error.message);
  } else {
    toast.error("Unexpected error");
  }
}
  })
}
