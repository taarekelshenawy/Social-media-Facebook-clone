"use client";

import Image from "next/image";
import useGetUserposts from "@/hooks/useGetUserPost";
import Loading from "../../../Components/feedback/loading";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import useGetuserInfo from "@/hooks/useGetuserInfo";
import { Navbar } from "@/Components/common/Navbar/Navbar";

export default function Page() {
    const {data, isLoading} = useGetUserposts();
    const userInfo =useGetuserInfo();
  


    if(isLoading) return <Loading/>

  return (
    <div className="min-h-screen bg-gray-100 py-4">
         <Navbar/>
         <div className="mt-28 ">

            <div className=" bg-white max-w-140 mx-auto flex flex-col gap-6 p-6 mb-6">
                <p className="text-xl font-bold">Name : <span className="text-lg text-gray-600">{userInfo.data?.name}</span></p>
                <p className="text-xl font-bold">Email : <span className="text-lg text-gray-700">{userInfo.data?.email}</span></p>
            </div>

        {data?.map((post) => {
            return (
                <div key={post._id} className="w-full max-w-150 mx-auto mb-4 px-4 animate-fadeIn ">
                    <div className="bg-white rounded-lg shadow-sm transition-all duration-300 hover:shadow-md">
                        <div className="p-4 flex items-center gap-3">
                            {
                                userInfo.data?.photo &&
                                  <Image
                                src={userInfo.data?.photo}
                                 className=' cursor-pointer h-[50] rounded-full'
                                    alt='user'
                                    width={50}
                                    height={50}
                            />

                            }
                          
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
        
    </div>
  );
}