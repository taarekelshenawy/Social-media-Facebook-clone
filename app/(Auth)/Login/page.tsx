
import Image from 'next/image';
import Login from "../../../Components/forms/Login/login";
export default function page() {
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
          <div className="sm:w-[70%] xl:basis-[40%] mx-auto ">
                  <Login/>
          </div>
    

      </div>
   
     
    </div>
  )
}
