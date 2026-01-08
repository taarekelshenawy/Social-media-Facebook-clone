"use client";

import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Link from "next/link";
import { useState } from 'react';
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import useLogin from "@/hooks/useLogin";
import { useRouter } from "next/navigation";


const schema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters" })
      .max(32, { message: "Password must be at most 32 characters" })
      .regex(/[A-Z]/, { message: "Password must contain at least one uppercase letter" })
      .regex(/[a-z]/, { message: "Password must contain at least one lowercase letter" })
      .regex(/[0-9]/, { message: "Password must contain at least one number" })
      .regex(/[^A-Za-z0-9]/, { message: "Password must contain at least one special character" }),
});

type FormInputs = z.infer<typeof schema>;

export default function MyForm() {
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
  const router = useRouter()
  const {mutate , isPending} = useLogin();
  const [showPassword, setShowPassword] = useState(true);
  const onSubmit: SubmitHandler<FormInputs> = async (data) => {

    
    mutate(data,{
      onSuccess:()=>{
        router.push('/Addphoto')
      }
     });
    reset(); // Reset form after successful submission
  };

  return (
    <>
    <h1 className="text-3xl mb-8 font-bold text-center">Log in to <span className="text-blue-500">Facebook</span></h1>
    <form onSubmit={handleSubmit(onSubmit)} >
      <div className="mb-5">
        <input type="email" {...register("email")} placeholder="Email" className="w-full h-11 text-lg font-bold px-2 border-2 border-gray-500" />
        {errors.email && <p className="text-red-500">{errors.email.message}</p>}
      </div>

      <div className="mb-5">
        <div className="relative">
          <input
            type={showPassword ? "password" :"text"}
            {...register("password")}
              autoComplete="new-password"
            placeholder="Password"
            className="font-bold text-lg w-full h-11 px-2 pr-10 border-2 border-gray-500"
          />

          <button
           aria-label="show password"
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

      <p className="text-sm text-center mt-4 mb-2 font-semibold">
        Not registered?{' '}
        <Link href="Register" className="text-blue-600 font-bold">
          Create account
        </Link>
      </p>

      <p className="text-sm text-center mb-5 font-semibold">
        Want to change your password?{' '}
        <Link href="ChangePassword" className="text-blue-600 font-bold">
          Change Password
        </Link>
      </p>

      <button type="submit" disabled={isPending} className="w-32 bg-blue-600 h-10 rounded-4xl cursor-pointer font-bold text-white ">
        {isPending ? "Submitting..." : "Submit"}
      </button>
    </form>
   </>
  );
}
