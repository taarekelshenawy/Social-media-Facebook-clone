import  { useContext } from 'react';
import axios, { isAxiosError } from 'axios';
import { AuthContext } from '@/context/context';
import { useQuery } from '@tanstack/react-query';
import type { PostsData } from '@/Types/shared';


const useGetUserPost=async(token:string)=>{
    try{
        const response = await axios.get<PostsData>("https://linked-posts.routemisr.com/users/664bcf3e33da217c4af21f00/posts?limit=10",{
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

export default function useGetUserposts() {
const context = useContext(AuthContext);
if(!context){
    throw new Error('there is no context')
}
 const {token}=context;
return useQuery({
    queryKey:["userposts"],
    // eslint-disable-next-line react-hooks/rules-of-hooks
    queryFn:()=>useGetUserPost(token)
 })
}
