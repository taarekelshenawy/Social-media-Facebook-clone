"use client";

import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Link from "next/link";
import Image from "next/image";
import useRegister from "@/hooks/useRegister";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";


const schema = z
  .object({
    name: z.string().min(1, { message: "Name is required" }).min(3 ,{ message: "at least 3 digits" }),
    email: z.string().email({ message: "Invalid email address" }),
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters" })
      .max(32, { message: "Password must be at most 32 characters" })
      .regex(/[A-Z]/, { message: "Password must contain at least one uppercase letter" })
      .regex(/[a-z]/, { message: "Password must contain at least one lowercase letter" })
      .regex(/[0-9]/, { message: "Password must contain at least one number" })
      .regex(/[^A-Za-z0-9]/, { message: "Password must contain at least one special character" }),
    rePassword: z.string(),
     dateOfBirth: z
    .string()
    .regex(
      /^\d{1,2}-\d{1,2}-\d{4}$/,
      { message: "Date must be in DD-MM-YYYY format" }
    ),
    gender: z.enum(["male", "female"], { message: "Gender is required" }),
  })
  .refine((data) => data.password === data.rePassword, {
    message: "Passwords do not match",
    path: ["rePassword"],
  });

type FormInputs = z.infer<typeof schema>;


export default function MyForm() {
  const [showPassword, setShowPassword] = useState(true);
  const [showRePassword, setShowRePassword] = useState(true);
  const router = useRouter();
  const {mutate , isPending} = useRegister();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormInputs>({
    resolver: zodResolver(schema),
    mode: "onChange", 
    shouldUnregister: false,
  });


  const onSubmit: SubmitHandler<FormInputs> = async (data) => {
     mutate(data,{
      onSuccess:()=>{
        router.push('/')
      }
     });
     reset()
  };

  return (
    <div className="flex flex-col justify-center items-center  m-10">
      <div className="md:w-[50%] max-sm:w-[90%]">
        <div>
          <div className="flex items-center gap-1 mb-3">
             <Image src="/images/meta.png" alt="meta_img" width={30} height={40}></Image>
             <span className="font-bold text-xl text-gray-500">Meta</span>
          </div>
             <h1 className="text-3xl font-bold  mb-2">
              Get started on Facebook
            </h1>
            <p className="font-bold text-xl mb-5 text-gray-600">Create an account to connect with friends, family and communities of people who share your interests.</p>
        </div>
 
    <form onSubmit={handleSubmit(onSubmit)} >
      <div className="mb-5">
        <input {...register("name")} placeholder="Name" className="font-bold text-lg w-full h-11 px-2 border-2 border-gray-500" />
        {errors.name && <p className="text-red-500">{errors.name.message}</p>}
      </div>

      <div className="mb-5">
        <input type="email" {...register("email")} placeholder="Email" className="font-bold text-lg  w-full h-11 px-2 border-2 border-gray-500" />
        {errors.email && <p className="text-red-500">{errors.email.message}</p>}
      </div>

      <div className="mb-5">
        <div className="relative">
          <input
            type={showPassword ? "password" :"text"}
            {...register("password")}
            placeholder="Password"
            className="font-bold text-lg w-full h-11 px-2 pr-10 border-2 border-gray-500"
          />

          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-600"
          >
            {showPassword ? <AiFillEyeInvisible size={22} /> : <AiFillEye size={22} />}
          </button>
        </div>

        {errors.password && (
          <p className="text-red-500 mt-1">{errors.password.message}</p>
        )}
      </div>


      <div className="mb-5">
        <div className="relative">
          <input
            type={showRePassword ? "password" :"text"}
            {...register("rePassword")}
            placeholder="Re Password"
            className="font-bold text-lg w-full h-11 px-2 pr-10 border-2 border-gray-500"
          />

          <button
            type="button"
            onClick={() => setShowRePassword(!showRePassword)}
            className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-600"
          >
            {showRePassword ? <AiFillEyeInvisible size={22} /> : <AiFillEye size={22} />}
          </button>
        </div>

        {errors.rePassword && (
          <p className="text-red-500 mt-1">{errors.rePassword.message}</p>
        )}
      </div>


      <div className="mb-5">
        <input type="text" {...register("dateOfBirth")} placeholder="dateofBirth" className="font-bold text-lg  w-full h-11 px-2 border-2 border-gray-500" />
        {errors.dateOfBirth && <p className="text-red-500">{errors.dateOfBirth?.message}</p>}
      </div>

      <div className="mb-5">
        <select
          {...register("gender", { required: "Gender is required" })}
          className="w-full h-11 px-2 border-2 border-gray-500 rounded"
        >
          <option value="">Select gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
        {errors.gender && (
          <p className="text-red-500 text-sm">{errors.gender.message}</p>
        )}
      </div>

      <div>
         <p className="text-lg font-medium text-center mt-4">
          Already have an account?{' '}
          <Link href="/" className="text-blue-600 font-semibold">
            Login
          </Link>
        </p>
      </div>

    
      <button type="submit" disabled={isPending} className="w-full mt-4 text-xl bg-blue-600 h-12 rounded-4xl cursor-pointer font-bold text-white ">
        {isPending ? "Submitting..." : "Submit"}
      </button>
    </form>

      </div>
 
   </div>
  );
}
