"use client"

import { Navbar } from "@/Components/common/Navbar/Navbar";
import Feed from "@/Components/ContentWrapper/Feed";
import SideBar from "@/Components/ContentWrapper/sideBar";


export default function Homepage() {
  

  return (
    <div>
    <Navbar/>
    <div className="flex w-[80%] mx-auto mt-24 gap-20 py-4  ">
      <SideBar/>
      <Feed/>
    </div>
    </div>
  )
}
