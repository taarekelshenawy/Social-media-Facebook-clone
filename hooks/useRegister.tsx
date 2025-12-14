import { useMutation } from "@tanstack/react-query";
import axios, { isAxiosError } from "axios";
import type { RegisterData } from "../Types/shared";
import { toast } from "react-toastify";






const RegisterFunc =async (data:RegisterData)=>{
    try{
        const response = await axios.post("https://linked-posts.routemisr.com/users/signup",data);
        return response.data.data;
    }catch(error){
       if (isAxiosError(error)) {
      throw error.response?.data?.message || "Register failed"; // ✅ Error
    }
    throw "Unexpected error";
    }
}





export default function useRegister() {

 return useMutation({
  mutationFn: RegisterFunc,
  onSuccess: async () => {
    toast.success("Account created successfully!")
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
