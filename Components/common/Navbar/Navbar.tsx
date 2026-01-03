import React, { useContext, useEffect, useState } from 'react';
import Image from 'next/image';
import useGetuserInfo from '@/hooks/useGetuserInfo';
import { 
  MdHomeFilled,
  MdOndemandVideo,
  MdGroups,
  MdStorefront
} from "react-icons/md";
import Link from 'next/link';
import { AuthContext } from '@/context/context';


export const Navbar = () => {
    const [isMobile,setIsMobile]=useState(false);
    const userInfo =useGetuserInfo();
    const context =useContext(AuthContext);

    useEffect(()=>{
    const ResSize=()=>{
            if(window.innerWidth < 800){
                setIsMobile(true);
            }else{
                setIsMobile(false)
            }
    }
    window.addEventListener('resize',ResSize);

    return ()=>window.removeEventListener('resize',ResSize);

    },[])
    
    if(!context)return;
    const {LogOut}=context;

  return (
    <nav className='p-5 flex h-24 justify-between items-center bg-white fixed top-0 left-0 right-0 z-50 gap-2'>
        <div className='flex gap-2 items-center'>
            <Image src="/images/facebook.png" alt='logo' width={50} height={30}></Image>
            <input type='text' placeholder='search' className='bg-gray-300 px-4 h-10 rounded-3xl w-[80%]'></input>
        </div>
        {
            isMobile ? '' :
        <div className='flex gap-16 items-center'>
         <Link href='/'><MdHomeFilled className='text-4xl w-16 h-11 hover:bg-gray-200  duration-500 cursor-pointer'/></Link>
         <MdOndemandVideo  className='text-4xl hover:bg-gray-200 w-16 h-11   duration-500 cursor-pointer'/>
         <MdGroups  className='text-4xl hover:bg-gray-200 w-16 h-11  duration-500 cursor-pointer '/>
         <MdStorefront  className='text-4xl hover:bg-gray-200 w-16 h-11  duration-500 cursor-pointer'/>

        </div>
        }
        <div className='flex items-center gap-2 '>
        <Link href="/UserProfile">
        {userInfo.data?.photo ?(
            <Image
                src={userInfo.data.photo}
                className=' cursor-pointer h-[50] rounded-full'
                alt='user'
                width={50}
                height={50}
            />
            ):
              <Image src="/images/user.png" alt='user-img' className='cursor-pointer h-[50] rounded-full' width={50} height={50}></Image>
        }
        </Link>
        <button className='border h-8 w-20 text-sm font-semibold bg-red-500
         text-white rounded cursor-pointer hover:scale-105 duration-200'
         onClick={()=>LogOut()}
         >
        Log Out
        </button>

        </div>
       

           
 



    </nav>
  )
}
