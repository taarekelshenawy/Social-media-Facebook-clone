import { AuthContext } from "@/context/context";
import axios, { isAxiosError } from "axios";
import { useContext } from "react";
import { toast } from "react-toastify";
import { useMutation, useQueryClient } from "@tanstack/react-query";


const deletePost =async(token:string,id:string)=>{
    
    try{
        const response = await axios.delete(`https://linked-posts.routemisr.com/posts/${id}`,{
            headers:{
                token:token,
            }
        });
        return response.data.data;

    }catch(error){
        if(isAxiosError(error)){
            if(error.response){
                 throw new Error(error.response?.data.message || 'unexpeced Error')
            }else{
                throw new Error(error.message)
            }
      
        }

    }

}

export default function useDeletePost() {
    const context = useContext(AuthContext);
     if(!context){
            throw new Error('there is no context')
        }
    const {token} = context;
    const queryClient=useQueryClient();
  return useMutation({
   mutationFn:(id:string)=>deletePost(token,id),
   onSuccess:()=>{
    toast("Posted Deleted")
      queryClient.invalidateQueries({ queryKey: ["userposts"] });
   },
  onError: (error: unknown) => {
  if (typeof error === "string") {
    toast.error(error);
  } else if (error instanceof Error) {
    toast.error(error.message);
  } else {
    toast.error("Unexpected error");
  }
},

  })
}
