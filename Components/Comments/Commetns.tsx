import Image from 'next/image';
import useGetPostComments from '@/hooks/useGetPostComments';
import { useState } from 'react';
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import useDeleteComment from '@/hooks/useDeleteComment';



export default function Commetns({postId}:{postId:string}) {


    const {data,isLoading}=useGetPostComments(postId);
    const [openDropdownId, setOpenDropdownId] = useState<string | null>(null)
    const deletecomment = useDeleteComment();

    function handleDelete(id:string){
   
      deletecomment.mutate(id)
      

    }
    

  return (
   
      <>
         {isLoading ? '..loading comments ' :
        <>
          {
              data ?.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime())?.slice(-10).map((item)=>{
                return(
                  <div key={item._id} className='flex justify-between'>
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
                        <div className="relative dropdown-container">
                          <button
                            onClick={() =>
                              setOpenDropdownId(
                                openDropdownId === item._id ? null : item._id
                              )
                            }
                            className="text-gray-400 cursor-pointer hover:text-gray-600 hover:bg-gray-100 rounded-full w-9 h-9 flex items-center justify-center transition-all duration-200"
                            aria-label="Menu"
                          >
                            <HiOutlineDotsHorizontal size={20} />
                          </button>
      
                          {openDropdownId === item._id && (
                            <div className="absolute top-full right-0 mt-1 w-40 bg-white rounded-lg shadow-lg overflow-hidden animate-slideDown origin-top z-50 border border-gray-100">
                              <div className="h-px bg-gray-100"></div>
      
                              <button
                                onClick={()=>handleDelete(item._id)}
                                className="w-full px-4 py-3 text-left text-sm font-medium text-red-600 hover:bg-red-50 flex items-center gap-2 transition-colors duration-200 group"
                              >
                                <svg
                                  className="w-5 h-5 group-hover:scale-110 transition-transform duration-200"
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                  />
                                </svg>
                                Delete
                              </button>
                            </div>
                          )}
                        </div>

                  </div>
                

                )
                

              })
            }
        </>
     }
         
      </>
     
  )
}
