"use client"
import Image from 'next/image';
import { useState } from 'react';
import Link from 'next/link';
import useAddprofilephoto from '@/hooks/useAddprofilephoto';
import { useRouter } from 'next/navigation';

export default function Page() {
    const [photo,setPhoto]=useState<File | null>(null);
    const addphoto =useAddprofilephoto();
    const route = useRouter();

    function Addprofile(){
         if (!photo) return;
    addphoto.mutate({ photo },{
        onSuccess:()=>{
            route.push('/')
        }
    });
    }
  return (
 <div className="flex flex-col justify-center items-center h-screen">
      <div className="flex gap-20 w-[90%] items-center  ">
           <div className="flex items-center   basis-[60%]  sm:hidden max-sm:hidden xl:flex">
            <div className="flex flex-col xl:gap-16">
               <Image src="/images/facebook.png"  alt="logo" width={70} height={50}></Image>
               <h1 className="text-5xl font-bold leading-14">Explore the things
                <span className="text-blue-700"> you love.</span>
                </h1>
            </div>
            <Image
              src="/images/Loginimg.png"
              alt="Loginimage"
              width={550}
              height={200}
            />
          </div>
          
           <div  className="sm:w-[70%] xl:basis-[40%] mx-auto flex flex-col  gap-10 ">
            <div className='flex flex-col items-center'>
                <label htmlFor='profile-photo'>
                   {photo ? <Image src={URL.createObjectURL(photo)}  alt='user-img' className='cursor-pointer rounded-full h-[150]' width={150} height={120}></Image> :<Image src="/images/user.png" alt='user-img' className='cursor-pointer' width={120} height={50}></Image>}
                </label>
                <input type='file' id="profile-photo" 
                onChange={(e) => {
                            if (e.target.files && e.target.files[0]) {
                            setPhoto(e.target.files[0]);
                            }
                        }}
                className='hidden'>
                </input>
            </div>
            <p className='text-xl font-bold text-[#65676B]'>You can upload a profile picture to customize your profile.</p>
            <div className='flex justify-between' >
                <button className='bg-white w-40 h-10 font-bold rounded cursor-pointer hover:scale-105 duration-300'>
                  <Link href="/" >Skip</Link>
                </button>
                <button  className='bg-blue-600 text-white w-40 h-10 font-bold rounded cursor-pointer hover:scale-105 duration-300' onClick={Addprofile}>Add photo</button>
            </div>
            </div>
         
    

      </div>
     
   
     
    </div>
  )
}
