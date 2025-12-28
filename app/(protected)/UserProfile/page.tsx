"use client";

import Image from "next/image";
import useGetUserposts from "@/hooks/useGetUserPost";
import Loading from "../../../Components/feedback/loading";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import useGetuserInfo from "@/hooks/useGetuserInfo";
import { Navbar } from "@/Components/common/Navbar/Navbar";
import React, { useState, useEffect } from "react";
import useUpdatepost from "@/hooks/useUpdatepost";
import DeletePost from "@/Components/Modals/deletePost";

interface DropdownMenuProps {
  onUpdate?: (body: string, image: File | null) => void;
  onDelete?: () => void;
  currentBody?: string;
  currentImage?: string;
}

export default function Page(props: DropdownMenuProps = {}) {
  const { data, isLoading } = useGetUserposts();
  const userInfo = useGetuserInfo();
  const update=useUpdatepost();
  

  const [openDropdownId, setOpenDropdownId] = useState<string | null>(null);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [deleteModal,setDeleteModal]=useState(false);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [selectedPost, setSelectedPost] = useState<any>(null);
  const [body, setBody] = useState<string>("");
  const [image,setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>("");
  const [postId,setPostId]=useState('');


  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      const target = event.target as HTMLElement;
      if (!target.closest('.dropdown-container')) {
        setOpenDropdownId(null);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleUpdate = (post: any) => {
    setSelectedPost(post);
    setBody(post.body);
    setImagePreview(post.image || "");
    setShowModal(true);
    setOpenDropdownId(null);
  };

  const handleDelete = (PostId:string) => {
    setOpenDropdownId(null);
    setDeleteModal(true);
    setPostId(PostId);
  };


  const handleSubmit = () => {
    update.mutate({selectedPost,body,image})
    setShowModal(false);
    setBody("");
    setImage(null);
    setImagePreview("");
    setSelectedPost(null);
  };

  const handleCancel = () => {
    setShowModal(false);
    setBody("");
    setImagePreview("");
    setImage(null);
    setSelectedPost(null);
  };

  if (isLoading) return <Loading />;

  return (
    <div className="min-h-screen bg-gray-100 py-4">
      <Navbar />
      <div className="mt-28 ">
        <div className=" bg-white max-w-140 mx-auto flex flex-col gap-6 p-6 mb-6">
          <p className="text-xl font-bold">
            Name :{" "}
            <span className="text-lg text-gray-600">{userInfo.data?.name}</span>
          </p>
          <p className="text-xl font-bold">
            Email :{" "}
            <span className="text-lg text-gray-700">
              {userInfo.data?.email}
            </span>
          </p>
        </div>

        {data?.map((post) => {
          return (
            <div
              key={post._id}
              className="w-full max-w-150 mx-auto mb-4 px-4 animate-fadeIn "
            >
              <div className="bg-white rounded-lg shadow-sm transition-all duration-300 hover:shadow-md">
                <div className="p-4 flex items-center gap-3">
                  {userInfo.data?.photo && (
                    <Image
                      src={userInfo.data?.photo}
                      className=" cursor-pointer h-[50] rounded-full"
                      alt="user"
                      width={50}
                      height={50}
                    />
                  )}

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
                  <div className="relative dropdown-container">
                    <button
                      onClick={() =>
                        setOpenDropdownId(
                          openDropdownId === post._id ? null : post._id
                        )
                      }
                      className="text-gray-400 cursor-pointer hover:text-gray-600 hover:bg-gray-100 rounded-full w-9 h-9 flex items-center justify-center transition-all duration-200"
                      aria-label="Menu"
                    >
                      <HiOutlineDotsHorizontal size={20} />
                    </button>

                    {openDropdownId === post._id && (
                      <div className="absolute top-full right-0 mt-1 w-40 bg-white rounded-lg shadow-lg overflow-hidden animate-slideDown origin-top z-50 border border-gray-100">
                        <button
                          onClick={() => handleUpdate(post)}
                          className="w-full px-4 py-3 text-left text-sm font-medium text-green-600 hover:bg-green-50 flex items-center gap-2 transition-colors duration-200 group"
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
                              d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                            />
                          </svg>
                          Update
                        </button>

                        <div className="h-px bg-gray-100"></div>

                        <button
                          onClick={()=>handleDelete(post._id)}
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

                <div className="px-4 pb-3">
                  <p className="text-gray-800 leading-relaxed whitespace-pre-wrap">
                    {post.body}
                  </p>
                </div>

                <div className="w-full bg-gray-200">
                  <Image
                    src={post.image || "/images/default-profile.png"}
                    width={600}
                    height={400}
                    className="w-full object-cover max-h-125"
                    alt="post"
                    onError={(e) => {
                      e.currentTarget.src = "/images/default-profile.png";
                    }}
                  />
                </div>

                <div className="px-4 py-2 flex items-center justify-between text-sm text-gray-500 border-b border-gray-200">
                  <div className="flex items-center gap-1 cursor-pointer hover:underline"></div>
                  <div className="flex gap-3">
                    <span className="cursor-pointer hover:underline">
                      0 Comment
                    </span>
                    <span className="cursor-pointer hover:underline">
                      0 Share
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-around p-2">
                  <button className="flex-1 flex items-center justify-center gap-2 py-2 rounded-lg hover:bg-gray-100 transition-all duration-200 group">
                    <span className="text-xl group-hover:scale-125 transition-transform duration-200">
                      👍
                    </span>
                    <span className="text-gray-600 font-medium text-sm">
                      Like
                    </span>
                  </button>
                  <button className="flex-1 flex items-center justify-center gap-2 py-2 rounded-lg hover:bg-gray-100 transition-all duration-200 group">
                    <span className="text-xl group-hover:scale-125 transition-transform duration-200">
                      💬
                    </span>
                    <span className="text-gray-600 font-medium text-sm">
                      Comment
                    </span>
                  </button>
                  <button className="flex-1 flex items-center justify-center gap-2 py-2 rounded-lg hover:bg-gray-100 transition-all duration-200 group">
                    <span className="text-xl group-hover:scale-125 transition-transform duration-200">
                      ↗️
                    </span>
                    <span className="text-gray-600 font-medium text-sm">
                      {" "}
                      Share
                    </span>
                  </button>
                </div>
              </div>
            </div>
          );
        })}

        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50 p-4 animate-fadeIn">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg animate-scaleIn">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-2xl font-bold text-gray-800">
                  Update Post
                </h2>
              </div>

              <div className="p-6 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Body
                  </label>
                  <textarea
                    value={body}
                    onChange={(e) => setBody(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all duration-200 resize-none"
                    rows={4}
                    placeholder="Enter your text here..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Image
                  </label>
                

                  {imagePreview ? (
                    <div className="relative">
                      <Image
                        src={imagePreview}
                        alt="Preview"
                        width={500}
                        height={192}
                        className="w-full h-48 object-cover rounded-lg border-2 border-gray-200"
                      />
                      <button
                        onClick={() => {
                          setImagePreview("");
                          setImage(null);
                      
                        }}
                        className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-2 hover:bg-red-600 transition-colors duration-200 shadow-lg"
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
                     <label htmlFor="uploadImg" className="w-full h-32 border-2 border-dashed border-gray-300 rounded-lg hover:border-green-500 hover:bg-green-50 transition-all duration-200 flex flex-col items-center justify-center gap-2 text-gray-500 hover:text-green-600">
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
                     <input
                     id="uploadImg"
                    type="file"
                    accept="image/*"
                    onChange={(e)=>{
                      if(e.target.files && e.target.files[0]){
                        setImage(e.target.files[0])
                      }
                    }
                      
                    
                    }
                    className="hidden"
                  />
                    </>
                  )}
                </div>
              </div>

              <div className="p-6 border-t border-gray-200 flex gap-3">
                <button
                  onClick={handleCancel}
                  className="flex-1 px-6 py-3 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition-colors duration-200"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSubmit}
                  className="flex-1 px-6 py-3 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-colors duration-200 shadow-lg hover:shadow-xl"
                >
                  Update
                </button>
              </div>
            </div>
          </div>
        )}

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

          @keyframes slideDown {
            from {
              opacity: 0;
              transform: translateY(-10px) scale(0.95);
            }
            to {
              opacity: 1;
              transform: translateY(0) scale(1);
            }
          }

          @keyframes scaleIn {
            from {
              opacity: 0;
              transform: scale(0.9);
            }
            to {
              opacity: 1;
              transform: scale(1);
            }
          }

          .animate-fadeIn {
            animation: fadeIn 0.3s ease-out;
          }

          .animate-slideDown {
            animation: slideDown 0.2s ease-out;
          }

          .animate-scaleIn {
            animation: scaleIn 0.3s ease-out;
          }
        `}</style>

        {deleteModal && 
        <>
        <DeletePost setDeletModal={setDeleteModal} selectedPost={postId}/>
        </>
        }
      </div>
    </div>
  );
}