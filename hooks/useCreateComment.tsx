"use client"
import { AuthContext } from "@/context/context";
import { useMutation } from "@tanstack/react-query";
import axios, { isAxiosError } from "axios";
import { useContext } from "react";
import { toast } from "react-toastify";
import { useQueryClient } from "@tanstack/react-query";


type commentData={
    content:string,
    post:string
}
const createComment =async(token:string,info:commentData)=>{
    try{
        const response = await axios.post('https://linked-posts.routemisr.com/comments',info,{
        headers:{
            token:token,
        }
      
    })
      return response.data.message;

    }
    catch(error){
        if(isAxiosError(error)){
            if(error.response){
                throw new Error(error.response.data.error || 'unexpected Error')
            }else{
                throw new Error(error.message)
            }
        }
    }
    
}

export default function useCreateComment() {
    const context = useContext(AuthContext);
    if(!context) throw new Error('there is NO Context');
    const {token}=context;

    const queryClient = useQueryClient();


  return useMutation({
    mutationFn:(info:commentData)=>createComment(token,info),
  
    onError: (error: unknown) => {
  if (typeof error === "string") {
    toast.error(error);
  } else if (error instanceof Error) {
    toast.error(error.message);
  } else {
    toast.error("Unexpected error");
  }
},
  onSuccess:(data,variables)=>{
        toast(`${data}`)
        // console.log(variables.post)
        queryClient.invalidateQueries({ queryKey:["postComments",variables.post]})

    },
  })
}
