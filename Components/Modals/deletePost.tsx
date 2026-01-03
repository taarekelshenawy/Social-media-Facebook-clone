import React from 'react'
import useDeletePost from '@/hooks/useDeletePost';

type deleteProps={
    setDeletModal:React.Dispatch<React.SetStateAction<boolean>>,
    selectedPost:string,
}
export default function DeletePost({setDeletModal,selectedPost}:deleteProps) {
    const deletePost = useDeletePost();

    const handleDelete = () => {
      deletePost.mutate(selectedPost,{
          onSuccess:()=>{
              setDeletModal(false)
          }
      })
    };
  return (
    <div className=' h-screen  fixed inset-0 flex flex-col bg-black/30 justify-center items-center ' onClick={()=>setDeletModal(false)}  >
        <div className=' w-[500] bg-white  p-7  gap-9 rounded-2xl ' onClick={(e)=>e.stopPropagation()}>
         <h1 className='font-medium text-2xl mb-5'> Are you sure delete post ? </h1>
         <div className='flex justify-end'>
               <button className=' bg-red-500 w-20 text-white p-1 rounded-2xl font-medium cursor-pointer' onClick={()=>handleDelete()}>
                    Delete
                </button>

         </div>
      
        </div>
     
    </div>
  )
}
