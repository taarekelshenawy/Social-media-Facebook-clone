import React, { useState } from 'react';
import { 
  MdVideocam, 
  MdPhotoLibrary, 
  MdEmojiEmotions 
} from "react-icons/md";
import Image from 'next/image';
import PostCard from './postCard';
import { Createpost } from '../Modals/Createpost';


export default function Posts() {
  const [shoModal,setShoModal]=useState(false);
 
  
  return (
    <div className='w-[600] max-sm:w-[350] mx-auto'>

           <div className='bg-white flex justify-between gap-7 p-2 rounded-2xl w-full'>
              <div className='flex items-center gap-3'>
                  <MdEmojiEmotions className='text-3xl max-sm:text-2xl text-amber-200'/>
                  <MdPhotoLibrary className='text-3xl max-sm:text-2xl text-green-400'/>
                  <MdVideocam className='text-3xl max-sm:text-2xl text-red-400'/>
              </div>
              <div className='flex gap-2'>
                    <div className='bg-gray-200 px-3  rounded-3xl w-72 max-sm:w-40   flex items-center justify-end' onClick={()=>setShoModal(!shoModal)}>بم تفكر</div>
                    <Image src="/images/default-profile.png" className='rounded-4xl cursor-pointer' alt='logo' width={40} height={30}></Image>
              </div>
          </div>

          <div className='w-full'>
              <PostCard/>
          </div>
          {shoModal ? <Createpost setShowModal={setShoModal} /> :''}

      </div>
   
     


  )
}
