import React, { useState } from 'react';
import useCreatepost from '@/hooks/useCreatepost';



export const Createpost = ({setShowModal}:{setShowModal: React.Dispatch<React.SetStateAction<boolean>>}) => {
    const [body,setBody]=useState('');
    const [image,setImage]=useState<File | null>(null);
    const Post = useCreatepost();

    const showData = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    Post.mutate({body,image}, {
      onSuccess: () => {
        setShowModal(false);
      },
    })
}
  return (
    <div className=' bg-black/50 fixed inset-0 flex flex-col justify-center items-center' onClick={()=>setShowModal(false)}>
        <div className='w-[500] bg-white p-4 flex flex-col gap-6 rounded ' onClick={(e) => e.stopPropagation()}>
            <h1 className='text-center font-bold text-2xl '>Add post</h1>
            <form className='flex flex-col' onSubmit={showData}>
            <label htmlFor="message" className='mb-2 text-gray-700 font-bold'>Your post:</label>
            <textarea id="message" name="message" className='border p-2' cols={30} onChange={(e)=>setBody(e.target.value)}>
            </textarea>
              <div className='flex flex-col gap-2 mt-3 mb-5'>
                <label htmlFor='createimg' className='text-gray-700 font-bold'>Add image</label>
                <input type='file' id="createimg"
                    onChange={(e) => {
                        if (e.target.files && e.target.files[0]) {
                        setImage(e.target.files[0]);
                        }
                    }}
                 ></input>
            </div>
            <button type="submit" className='bg-blue-600 p-2 text-white font-bold text-lg cursor-pointer'>Submit</button>
            </form>
          
           
        
        </div>
      
    </div>
  )
}
