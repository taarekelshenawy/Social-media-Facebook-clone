import { useMutation } from "@tanstack/react-query";
import axios, { isAxiosError } from "axios";
import type { LoginData } from "../Types/shared";
import { toast } from "react-toastify";
import { useContext } from "react";
import { AuthContext } from "@/context/context";


const LoginFunc =async (data:LoginData)=>{
    try{
        const response = await axios.post("https://linked-posts.routemisr.com/users/signin",data);
        localStorage.setItem("token" , response.data.token)
        return response.data.token;
    }catch(error){
       if (isAxiosError(error)) {
      throw error.response?.data?.message || "Login failed"; // ✅ Error
    }
    throw "Unexpected error";
    }
}



export default function useLogin() {
const context = useContext(AuthContext);
if (!context) {
  throw new Error("useLogin must be used within AuthContextProvider");
}
const { setToken } = context;

 return useMutation({
  mutationFn: LoginFunc,
  onSuccess: async (data) => {
    toast.success("Login successfully!")
    setToken(data)
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