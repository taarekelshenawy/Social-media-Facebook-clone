"use client";

import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Link from "next/link";
import { useState } from 'react';




const schema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  email: z.string().email({ message: "Invalid email address" }),
});

type FormInputs = z.infer<typeof schema>;


 // For loading state

export default function MyForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormInputs>({
    resolver: zodResolver(schema),
    mode: "onChange", // Validates as the user types
  });
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit: SubmitHandler<FormInputs> = async (data) => {
    setIsLoading(true);
    console.log(data);
    // Handle form submission logic (e.g., send to API route or Server Action)
    // ...
    setIsLoading(false);
    reset(); // Reset form after successful submission
  };

  return (
    <>
    <h1 className="text-3xl mb-8 font-bold text-center ">Log in to <span className="text-blue-500">Facebook</span></h1>
    <form onSubmit={handleSubmit(onSubmit)} >
      <div className="mb-5">
        <input {...register("name")} placeholder="Name" className="w-full h-11 px-2 border-2 border-gray-500" />
        {errors.name && <p className="text-red-500">{errors.name.message}</p>}
      </div>

      <div className="mb-5">
        <input type="email" {...register("email")} placeholder="Email" className="w-full h-11 px-2 border-2 border-gray-500" />
        {errors.email && <p className="text-red-500">{errors.email.message}</p>}
      </div>
      <p className="text-sm text-center mt-4 mb-5 font-bold ">
        Not registered?{' '}
        <Link href="Register" className="text-blue-600 font-semibold">
          Create account
        </Link>
      </p>

      <button type="submit" disabled={isLoading} className="w-32  bg-blue-600 h-10 rounded-4xl cursor-pointer font-bold text-white ">
        {isLoading ? "Submitting..." : "Submit"}
      </button>
    </form>
   </>
  );
}
