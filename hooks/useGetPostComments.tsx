import  { useContext } from 'react';
import axios, { isAxiosError } from 'axios';
import { AuthContext } from '@/context/context';
import { useQuery } from '@tanstack/react-query';
import { CommentProps } from '@/Types/shared';



const getPostComments=async(token:string,id:string)=>{
    try{
        const response = await axios.get<CommentProps>(`https://linked-posts.routemisr.com/posts/${id}/comments`,{
            headers:{
              token:token
            }
        });
        return response.data.comments;

    }catch(error)
    {
        if(isAxiosError(error)){
            throw new Error(error?.message)
        }


    }
}

export default function useGetPostComments(id:string)  {
const context = useContext(AuthContext);
if(!context){
    throw new Error('there is no context')
}
 const {token}=context;
return useQuery({
    queryKey:["postComments",id],
    queryFn:()=>getPostComments(token,id),
    enabled: !!id
 })
}













// import React from 'react'

// export default function useGetPostComments() {
//   return (
//     <div>useGetPostComments</div>
//   )
// }
