"use client";

import Image from "next/image";
import {
  MdHome,
  MdPeople,
  MdStorefront,
  MdOndemandVideo,
  MdHistory,
  MdBookmark,
  MdFlag,
  MdEvent
} from "react-icons/md";
import useGetuserInfo from "@/hooks/useGetuserInfo";


export default function Sidebar() {
  const {data}=useGetuserInfo();
  return (
    <aside className="w-64 h-screen sticky top-24 hidden md:block ">
      <div className="p-4 space-y-4">

        {/* User */}
        <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100 cursor-pointer">
          {data?.photo &&   <Image
            src={data?.photo ? data.photo :""}
            alt="user"
            width={40}
            height={36}
            className="rounded-full h-10"
          />}
        
          <span className="font-medium text-xl">{data?.name}</span>
        </div>

        <hr />

        {/* Menu */}
        <div className="space-y-1 ">

          <SidebarItem icon={<MdHome size={40} />} text="Home" />
          <SidebarItem icon={<MdPeople size={40} />} text="Friends" />
          <SidebarItem icon={<MdOndemandVideo size={40} />} text="Watch" />
          <SidebarItem icon={<MdStorefront size={40} />} text="Marketplace" />
          <SidebarItem icon={<MdBookmark size={40} />} text="Saved" />
          <SidebarItem icon={<MdHistory size={40} />} text="Memories" />
          <SidebarItem icon={<MdFlag size={40} />} text="Pages" />
          <SidebarItem icon={<MdEvent size={40} />} text="Events" />

        </div>
      </div>
    </aside>
  );
}
type sideBarProps={
  icon:React.ReactNode,
  text:string,
}
function SidebarItem({ icon, text }:sideBarProps) {
  return (
    <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100 cursor-pointer">
      <span className="text-blue-600">{icon}</span>
      <span className="text-sm font-medium">{text}</span>
    </div>
  );
}
