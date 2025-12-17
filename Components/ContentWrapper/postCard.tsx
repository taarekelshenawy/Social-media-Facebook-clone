"use client";

import Image from "next/image";
import useGetposts from "@/hooks/useGetposts";
import Loading from "../feedback/loading";

export default function Card() {
   const {data,isLoading}=useGetposts();
  return (
    <>
     {
      isLoading ? <Loading/>:
      <>
        {
        data?.map((item)=>{
            
          return(
              <div key={item._id} className=" mt-5 mx-auto bg-white rounded-xl shadow p-4 space-y-3">

      {/* ===== Header ===== */}
      <div className="flex items-center gap-3">
        <Image
          src={item.user.photo}
          alt="user"
          width={40}
          height={40}
          className="rounded-full object-cover"
        />

        <div>
          <p className="font-semibold text-sm">{item.user.name}</p>
          <p className="text-xs text-gray-500">2h · 🌍</p>
        </div>
      </div>

      {/* ===== Post Body ===== */}
      <p className="text-sm text-gray-800">
       {item.body}
      </p>

      {/* ===== Post Image ===== */}
      <div className="relative w-full h-100 rounded-lg overflow-hidden">
        <Image
          src={item.image? item.image : '/images/default-profile.png'} // أو URL من API
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

        {/* Comment Card */}
     
            {
          item.comments.slice(0,2)?.map((item)=>{
            console.log(item.commentCreator.photo)
            return(
               <div key={item._id} className="flex gap-2">
          <Image
            src='/images/default-profile.png'
            alt="comment user"
            width={32}
            height={32}
            className="rounded-full"
          />

          <div className="bg-gray-100 rounded-lg px-3 py-2">
                 <p className="font-semibold text-xs">{item.commentCreator.name}</p>
                 <p className="text-sm">{item.content}</p>
          </div>
        </div>

            )
            

          })
        }
         

       
       

      </div>

            </div>

          )

        })
      }
      </>
    
    

    }
    </>

   
   
  );
}
