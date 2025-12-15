import { useMutation } from "@tanstack/react-query";
import axios, { isAxiosError } from "axios";
import type { LoginData } from "../Types/shared";
import { toast } from "react-toastify";


const LoginFunc =async (data:LoginData)=>{
    try{
        const response = await axios.post("https://linked-posts.routemisr.com/users/signin",data);
        console.log(response.data)
        localStorage.setItem("token" , response.data.token)
        return response.data.message;
    }catch(error){
       if (isAxiosError(error)) {
      throw error.response?.data?.message || "Login failed"; // ✅ Error
    }
    throw "Unexpected error";
    }
}



export default function useLogin() {

 return useMutation({
  mutationFn: LoginFunc,
  onSuccess: async () => {
    toast.success("Login successfully!")
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