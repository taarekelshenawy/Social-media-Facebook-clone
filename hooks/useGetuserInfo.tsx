import axios, { isAxiosError } from "axios";
import { useContext } from "react";
import { AuthContext } from "@/context/context";
import { useQuery } from "@tanstack/react-query";
import { userInfoData } from "@/Types/shared";

const GetUserInfo=async(token:string)=>{
    try{
        const response = await axios.get<userInfoData>("https://linked-posts.routemisr.com/users/profile-data",{
            headers:{
                token:token
            }
        })
        return response.data.user;

    }
    catch(error)
    {
        if(isAxiosError(error)){
            if(error.response){
              throw new Error(error?.response?.data.error) ||  'Unexpected Error'

            }else{
                  throw new Error(`${error.message}`)

            }
        }
    }
}

export default function useGetuserInfo() {
 const context = useContext(AuthContext);
if(!context){
    throw new Error('there is no context')
}
 const {token}=context;
return useQuery({
    queryKey:["userInfo"],
    queryFn:()=>GetUserInfo(token),
 },
)
}
