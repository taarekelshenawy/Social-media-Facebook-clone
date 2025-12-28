import axios, { isAxiosError } from "axios";
import { useQueryClient } from "@tanstack/react-query";
import { useMutation } from "@tanstack/react-query";
import { useContext } from "react";
import { AuthContext } from "@/context/context";
import { toast } from "react-toastify";
import { UpdatePostProps } from "@/Types/shared";


const updatePosts =async(data:UpdatePostProps,token:string)=>{
  const formdata = new FormData();
  if(data.image){
  formdata.append('image',data.image);
  }
  formdata.append('body',data.body)


    try{
        const response = await axios.put(`https://linked-posts.routemisr.com/posts/${data.selectedPost._id}`,formdata,
            {
                headers:{
                    token:token,
                }
            }
        )
        return response.data.message;

    }
    catch(error){
        if(isAxiosError(error)){
            if(error.response){
                 throw new Error(error.response?.data?.error || 'Network Error');
            }else{
                throw new Error( error.message)
            }

        }
         throw new Error("Unexpected error");

       

    }
}

export default function useUpdatepost() {
     const context = useContext(AuthContext);
    if(!context){
        throw new Error('there is no context')
    }
    const {token}=context;
    const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data:UpdatePostProps)=>updatePosts(data,token),
    onError: (error: unknown) => {
  if (typeof error === "string") {
    toast.error(error);
  } else if (error instanceof Error) {
    toast.error(error.message);
  } else {
    toast.error("Unexpected error");
  }
},
    // When mutate is called:
    onSuccess: () => {
        toast(`Post Updated`)
      queryClient.invalidateQueries({ queryKey: ["userposts"] });
 
    },
   
  });
}
