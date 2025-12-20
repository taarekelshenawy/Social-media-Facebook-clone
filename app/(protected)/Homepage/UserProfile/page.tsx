"use client";

import Image from "next/image";
import { MdEmojiEmotions, MdPhotoLibrary, MdVideocam } from "react-icons/md";
import Link from "next/link";
import { useState } from "react";
import { Createpost } from "@/Components/Modals/Createpost";
import useGetUserposts from "@/hooks/useGetUserPost";
import Loading from "../../../../Components/feedback/loading";
import { HiOutlineDotsHorizontal } from "react-icons/hi";

export default function Page() {
    const [shoModal, setShoModal] = useState(false);
    const {data, isLoading} = useGetUserposts()

    if(isLoading) return <Loading/>

  return (
    <div className="min-h-screen bg-gray-100 py-4">
        <div className='w-full max-w-150 mb-4 mx-auto px-4'>
            <div className='bg-white rounded-lg shadow-sm p-4 transition-all duration-300 hover:shadow-md'>
              <div className='flex items-center gap-3 mb-3'>
                  <Link href={"./Homepage/UserProfile"}>
                    <Image 
                      src="/images/default-profile.png" 
                      className='rounded-full cursor-pointer ring-2 ring-gray-200 transition-transform duration-200 hover:scale-105' 
                      alt='profile' 
                      width={40} 
                      height={40}
                    />
                  </Link>
                  <div 
                    className='flex-1 bg-gray-100 hover:bg-gray-200 px-4 py-2.5 rounded-full cursor-pointer transition-all duration-200' 
                    onClick={() => setShoModal(!shoModal)}
                  >
                    <span className='text-gray-500'>بم تفكر؟</span>
                  </div>
              </div>
              
              <div className='flex items-center justify-around pt-3 border-t border-gray-200'>
                  <button className='flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-gray-100 transition-all duration-200 group'>
                    <MdVideocam className='text-2xl text-red-500 group-hover:scale-110 transition-transform duration-200'/>
                    <span className='text-gray-600 text-sm font-medium max-sm:hidden'>فيديو مباشر</span>
                  </button>
                  <button 
                    className='flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-gray-100 transition-all duration-200 group'
                    onClick={() => setShoModal(!shoModal)}
                  >
                    <MdPhotoLibrary className='text-2xl text-green-500 group-hover:scale-110 transition-transform duration-200'/>
                    <span className='text-gray-600 text-sm font-medium max-sm:hidden'>صورة</span>
                  </button>
                  <button className='flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-gray-100 transition-all duration-200 group'>
                    <MdEmojiEmotions className='text-2xl text-yellow-500 group-hover:scale-110 transition-transform duration-200'/>
                    <span className='text-gray-600 text-sm font-medium max-sm:hidden'>شعور/نشاط</span>
                  </button>
              </div>
            </div>
        </div>
        
        {shoModal && <Createpost setShowModal={setShoModal} />}
      
        {data?.map((post) => {
            return (
                <div key={post._id} className="w-full max-w-150 mx-auto mb-4 px-4 animate-fadeIn">
                    <div className="bg-white rounded-lg shadow-sm transition-all duration-300 hover:shadow-md">
                        <div className="p-4 flex items-center gap-3">
                            <Image
                                src="/images/default-profile.png"
                                width={40}
                                height={40}
                                className="rounded-full ring-2 ring-gray-200"
                                alt="user"
                            />
                            <div className="flex-1">
                                <h4 className="font-semibold text-gray-900 hover:underline cursor-pointer">
                                    {post.user.name}
                                </h4>
                                <span className="text-xs text-gray-500">
                                    {new Date(post.createdAt).toLocaleTimeString("ar-EG", {
                                        hour: "numeric",
                                        minute: "2-digit",
                                        hour12: true,
                                    })}
                                </span>
                            </div>
                            <button className="text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full w-9 h-9 flex items-center justify-center transition-all duration-200">
                                <HiOutlineDotsHorizontal className="text-xl" />
                            </button>
                        </div>

                        <div className="px-4 pb-3">
                            <p className="text-gray-800 leading-relaxed whitespace-pre-wrap">
                                {post.body}
                            </p>
                        </div>

                        <div className="w-full bg-gray-200">
                            <Image
                                src={post.image || '/images/default-profile.png'}
                                width={600}
                                height={400}
                                className="w-full object-cover max-h-125"
                                alt="post"
                                onError={(e) => {
                                    e.currentTarget.src = '/images/default-profile.png';
                                }}
                            />
                        </div>

                        <div className="px-4 py-2 flex items-center justify-between text-sm text-gray-500 border-b border-gray-200">
                            <div className="flex items-center gap-1 cursor-pointer hover:underline">
                                
                            </div>
                            <div className="flex gap-3">
                                <span className="cursor-pointer hover:underline">0 Comment</span>
                                <span className="cursor-pointer hover:underline">0 Share</span>
                            </div>
                        </div>

                        <div className="flex items-center justify-around p-2">
                            <button className="flex-1 flex items-center justify-center gap-2 py-2 rounded-lg hover:bg-gray-100 transition-all duration-200 group">
                                <span className="text-xl group-hover:scale-125 transition-transform duration-200">👍</span>
                                <span className="text-gray-600 font-medium text-sm">Like</span>
                            </button>
                            <button className="flex-1 flex items-center justify-center gap-2 py-2 rounded-lg hover:bg-gray-100 transition-all duration-200 group">
                                <span className="text-xl group-hover:scale-125 transition-transform duration-200">💬</span>
                                <span className="text-gray-600 font-medium text-sm">Comment</span>
                            </button>
                            <button className="flex-1 flex items-center justify-center gap-2 py-2 rounded-lg hover:bg-gray-100 transition-all duration-200 group">
                                <span className="text-xl group-hover:scale-125 transition-transform duration-200">↗️</span>
                                <span className="text-gray-600 font-medium text-sm"> Share</span>
                            </button>
                        </div>
                    </div>
                </div>
            )
        })}

        <style jsx global>{`
            @keyframes fadeIn {
                from {
                    opacity: 0;
                    transform: translateY(10px);
                }
                to {
                    opacity: 1;
                    transform: translateY(0);
                }
            }
            .animate-fadeIn {
                animation: fadeIn 0.3s ease-out;
            }
        `}</style>
    </div>
  );
}