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
    }
  return (
    <div 
  className="fixed inset-0 flex items-center justify-center bg-black/50 z-50"
  onClick={() => setDeletModal(false)}
>
  <div 
    className="bg-white rounded-3xl shadow-xl p-8 w-[90%] max-w-lg flex flex-col gap-6 relative"
    onClick={(e) => e.stopPropagation()}
  >
    <h2 className="text-2xl font-semibold text-gray-800 text-center">
      Are you sure you want to delete this post?
    </h2>
    <p className="text-gray-500 text-center">
      This action cannot be undone. Please confirm if you want to proceed.
    </p>
    <div className="flex justify-end gap-4">
      <button 
        className="px-4 py-2 rounded-xl bg-gray-200 text-gray-700 font-medium hover:bg-gray-300 transition"
        onClick={() => setDeletModal(false)}
      >
        Cancel
      </button>

      <button 
        className="px-5 py-2 rounded-xl bg-red-500 text-white font-semibold hover:bg-red-600 transition"
        onClick={() => handleDelete()}
      >
        Delete
      </button>
    </div>
    <button 
      className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition"
      onClick={() => setDeletModal(false)}
    >
      &#10005;
    </button>
  </div>
</div>

  )
}
