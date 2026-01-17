import { useMutation } from "@tanstack/react-query";
import axios, { isAxiosError } from "axios";
import type { ChangePasswordData } from "../Types/shared";
import { toast } from "react-toastify";

const ChangePasswordFunc =async (data:ChangePasswordData)=>{
    const token = localStorage.getItem("token");
    try{
        const response = await axios.patch("https://linked-posts.routemisr.com/users/change-password",data , {
        headers: {
          token: token
        },
      });
        return response.data.data;
    }catch(error){
       if (isAxiosError(error)) {
      throw error.response?.data?.error || "Change Password failed"; // ✅ Error
    }
    throw "Unexpected error";
    }
}



export default function useChangePassword() {

 return useMutation({
  mutationFn: ChangePasswordFunc,
  onSuccess: async () => {
    toast.success("Change Password successfully!")
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