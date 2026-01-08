import React, { useState } from 'react';
import useCreatepost from '@/hooks/useCreatepost';
import { useQueryClient } from '@tanstack/react-query';
import Image from 'next/image';



export const Createpost = ({setShowModal}:{setShowModal: React.Dispatch<React.SetStateAction<boolean>>}) => {
    const [body,setBody]=useState('');
    const [image,setImage]=useState<File | null>(null);
    const [imagePreview,setImagePreview]=useState(false);
    const [isDisabled,setIsDisabled]=useState(false);

    const Post = useCreatepost();
    const queryClient = useQueryClient();

    const showData = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsDisabled(true);
    Post.mutate({body,image}, {
      onSuccess: () => {
        setShowModal(false);
        setIsDisabled(false)
        queryClient.invalidateQueries({ queryKey: ["userposts"] });
      },
    })
      }

  return (
    <div className=' bg-black/50 fixed inset-0 flex flex-col justify-center items-center' onClick={()=>setShowModal(false)}>
        <div className='w-[500] bg-white p-4 flex flex-col gap-6 rounded ' onClick={(e) => e.stopPropagation()}>
            <h1 className='text-center font-bold text-2xl '>Add post</h1>
            <form className='flex flex-col' onSubmit={showData}>
            <label htmlFor="message" className='mb-2 text-gray-700 font-bold'>Your title:</label>
            <textarea id="message" name="message" className='border p-2 mb-3' cols={30} onChange={(e)=>setBody(e.target.value)} required>
            </textarea>
            {/* image preview */}
              {imagePreview ?
               (
              <div className="relative ">
                {
                  image ?
                    <Image
                  src={URL.createObjectURL(image)}
                  alt="Preview"
                  width={500}
                  height={192}
                  className="w-full h-48 object-cover rounded-lg border-2 border-gray-200"
                /> : ''
                }
                <button
                  onClick={() => {
                    setImagePreview(false);
                    setImage(null);
                  }}
                  className="absolute top-2 right-2 cursor-pointer bg-red-500 text-white rounded-full p-2 hover:bg-red-600 transition-colors duration-200 shadow-lg"
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
            ) : (
              <>
                <label htmlFor="createimg" className="w-full h-32 border-2 border-dashed border-gray-300 rounded-lg hover:border-green-500 hover:bg-green-50 transition-all duration-200 flex flex-col items-center justify-center gap-2 text-gray-500 hover:text-green-600">
                  <svg
                  className="w-10 h-10"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                  />
                </svg>
                </label>
                <input type='file' id="createimg" className='hidden'
                    onChange={(e) => {
                        if (e.target.files && e.target.files[0]) {
                        setImage(e.target.files[0]);
                        setImagePreview(true)
                        }
                    }}
                ></input>
            
              </>
            )}
            <button disabled={isDisabled} type="submit" className={` p-2 mt-3 text-white font-bold text-lg
             cursor-pointer ${
              isDisabled ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 cursor-pointer" }`} >
              Submit
            </button>
            </form>
          
           
        
        </div>
      
    </div>
  )
}
