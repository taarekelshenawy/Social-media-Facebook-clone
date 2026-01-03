import { AuthContext } from "@/context/context";
import { useQuery } from "@tanstack/react-query"
import axios, { isAxiosError } from "axios"
import { useContext } from "react";
import { PostDatabyId } from "@/Types/shared";

const GetSinglepost =async(id:string,token:string)=>{
  
    try{
        const response =await axios.get<PostDatabyId>(`https://linked-posts.routemisr.com/posts/${id}`,{
            headers:{
                token:token,
            }
        })
        return response.data.post;

    }catch(error){
        if(isAxiosError(error)){
             if(error.response){
                throw new Error(error.response.data.error) || 'network Error'

            }else{
                throw new Error (error.message);

            }
        }

    }
}

export default function useGetsingelPost(id:string) {
 
    const context = useContext(AuthContext);
    if(!context){
        throw new Error('there is no context')
    }
    const {token} = context;
 const query = useQuery({
    queryKey:["singlePost",id],
    queryFn:()=>GetSinglepost(id,token)
 })
 return query;
}
