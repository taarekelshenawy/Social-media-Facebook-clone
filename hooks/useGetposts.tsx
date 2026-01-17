import  { useContext } from 'react';
import axios, { isAxiosError } from 'axios';
import { AuthContext } from '@/context/context';
import { useQuery } from '@tanstack/react-query';
import type { PostsData } from '@/Types/shared';


const Getposts=async(token:string)=>{
    try{
        const response = await axios.get<PostsData>("https://linked-posts.routemisr.com/posts?sort=-createdAt",{
            headers:{
              token:token
            }
        });
        return response.data.posts;

    }catch(error)
    {
        if(isAxiosError(error)){
            throw new Error(error?.message)
        }


    }
}

export default function useGetposts() {
const context = useContext(AuthContext);
if(!context){
    throw new Error('there is no context')
}
 const {token}=context;
return useQuery({
    queryKey:["posts"],
    queryFn:()=>Getposts(token)
 })
}
