import React from 'react'
import Image from "next/image";
import useGetsingelPost from '@/hooks/useGetsingelPost';
import Loading from '../feedback/loading';
import { useState } from 'react';
import useCreateComment from '@/hooks/useCreateComment';
import Comments from '../Comments/Commetns';


type commentProps={
  id:string,
setModalComment:React.Dispatch<React.SetStateAction<boolean>>
}


export default function CommentModal({id,setModalComment}:commentProps) {
    const {data,isLoading}=useGetsingelPost(id);
    const [body,setBody]=useState('');
    const newComment = useCreateComment();

    type commentData={
      body:string,
      id:string,
    }

    function addNewComment({body,id}:commentData){
      const data ={
        content:body,
        post:id
      }
   
      newComment.mutate(data,{
        onSuccess:()=>{
          setBody('')
        }
      })
    }
    
  return (
    
  
    <div  className="fixed inset-0 flex flex-col items-center justify-center bg-black/10 z-50" onClick={()=>setModalComment(false)}>
      {isLoading ? <Loading/>
      :
       <>
      <div className='w-[500] h-[500] overflow-y-scroll mt-5 mx-auto  rounded-xl shadow p-4 space-y-3 bg-white' onClick={(e)=>e.stopPropagation()}>
     {/* ===== Header ===== */}
      <div className="flex items-center gap-3">
        <Image
          src={data?.user?.photo ? data?.user?.photo :'/images/default-profile.png'}
          alt="user"
          width={40}
          height={40}
          className="rounded-full object-cover"
        />
        <div>
          <p className="font-semibold text-sm"></p>
          <p className="text-xs text-gray-500">
            {data?.createdAt &&
            <>
              {new Date(data?.createdAt).toLocaleTimeString("en-US", {
              hour: "numeric",
              minute: "2-digit",
              hour12: true,
            })}
            </>
            }
          
          </p>
        </div>
      </div>
      {/* ===== Post Body ===== */}
      <p className="text-sm text-gray-800">
       {data?.body}
      </p>
      {/* ===== Post Image ===== */}
      <div className="relative w-full h-100 rounded-lg overflow-hidden">
        <Image
          src={data?.image? data?.image : '/images/default-profile.png'} 
          alt="post"
          fill
          className="object-cover"
        />
      </div>
      {/* ===== Actions ===== */}
      <div className="flex justify-between text-gray-500 text-sm border-t pt-2">
        <button className="hover:text-blue-600 transition">👍 Like</button>
        <button className="hover:text-blue-600 transition">💬 Comment</button>
        <button className="hover:text-blue-600 transition">↗ Share</button>
      </div>

      {/* ===== Comments ===== */}
      <div className="space-y-2">
     <Comments postId={id}/>

     {/* set comment */}
       <div className="sticky bottom-0 z-40 bg-white flex items-center gap-3 p-4 border-t border-gray-200 dark:border-gray-700">
      {/* Input */}
      <input
      value={body}
        type="text"
        placeholder="اكتب تعليق..."
        className="
          flex-1
          bg-gray-100 dark:bg-gray-800
          text-gray-900 dark:text-white
          placeholder-gray-500
          px-4 py-2
          rounded-full
          outline-none
          focus:ring-2 focus:ring-blue-500
          transition
        "
        onChange={(e)=>setBody(e.target.value)}
      />
      {/* Send Button */}
      <button
        className="
          text-blue-500
          font-semibold
          hover:text-blue-600
          transition
        "
        onClick={()=>addNewComment({body,id})}
      >
        إرسال
      </button>

      </div>
          
        
      </div>

</div>
      </>}

     

            </div>

         

     

   
   
  );
}
