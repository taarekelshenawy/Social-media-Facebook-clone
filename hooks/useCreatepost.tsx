import { useMutation } from "@tanstack/react-query";
import axios, { isAxiosError } from "axios";
import { toast } from "react-toastify";
import { useContext } from "react";
import { AuthContext } from "@/context/context";
import { PostData } from "@/Types/shared";
import { useQueryClient } from "@tanstack/react-query";







const CreatePost=async (data:PostData,token:string)=>{
const formdata = new FormData();
  formdata.append('body',data.body)
if (data.image) {
  formdata.append("image", data.image);
}
    try{
        const response = await axios.post("https://linked-posts.routemisr.com/posts",formdata,{
            headers:{
                token:token,
                "Content-Type": "multipart/form-data" 
            }
        });
        console.log(response.data)
        return response.data;
    }catch(error){
       if (isAxiosError(error)) {
      throw error.response?.data?.message || "Register failed"; 
    }
    throw "Unexpected error";
    }
}





export default function useCreatepost() {
    const context = useContext(AuthContext);
    if(!context){
        throw new Error('there is no context')
    }
     const {token}=context;
     const queryClient = useQueryClient();

 return useMutation({
  mutationFn: (data:PostData)=>CreatePost(data,token),
  onSuccess: async () => {
    toast.success(` posted added successfully`)
    queryClient.invalidateQueries({queryKey:["posts"]})
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
