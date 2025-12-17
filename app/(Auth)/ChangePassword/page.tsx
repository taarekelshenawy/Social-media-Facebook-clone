"use client";

import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Image from "next/image";
import { useRouter } from "next/navigation";
import useChangePassword from "@/hooks/useChangePassword";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { useState } from "react";

const schema = z.object({
  password: z
  .string()
  .min(8, { message: "Password must be at least 8 characters" })
  .max(32, { message: "Password must be at most 32 characters" })
  .regex(/[A-Z]/, {
    message: "Password must contain at least one uppercase letter",
  })
  .regex(/[a-z]/, {
    message: "Password must contain at least one lowercase letter",
  })
  .regex(/[0-9]/, { message: "Password must contain at least one number" })
  .regex(/[^A-Za-z0-9]/, {
    message: "Password must contain at least one special character",
  }),
  newPassword: z
  .string()
  .min(8, { message: "Password must be at least 8 characters" })
  .max(32, { message: "Password must be at most 32 characters" })
  .regex(/[A-Z]/, {
    message: "Password must contain at least one uppercase letter",
  })
  .regex(/[a-z]/, {
    message: "Password must contain at least one lowercase letter",
  })
  .regex(/[0-9]/, { message: "Password must contain at least one number" })
  .regex(/[^A-Za-z0-9]/, {
    message: "Password must contain at least one special character",
  }),
})
.refine((data) => data.password !== data.newPassword, {
    message: "New password must be different from current password",
    path: ["newPassword"],
  });;

type FormInputs = z.infer<typeof schema>;

export default function MyForm() {
  const router = useRouter();
  const { mutate, isPending } = useChangePassword();
  const [showPassword, setShowPassword] = useState(true);
  const [showNewPassword, setshowNewPassword] = useState(true);
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
    mutate(data, {
      onSuccess: () => {
        router.push("/");
      },
    });
    reset();
  };

  return (
    <div className="flex flex-col justify-center items-center  m-10">
      <div className="md:w-[50%] max-sm:w-[90%]">
        <div>
          <div className="flex items-center gap-1 mb-3">
            <Image
              src="/images/meta.png"
              alt="meta_img"
              width={30}
              height={40}
            ></Image>
            <span className="font-bold text-xl text-gray-500">Meta</span>
          </div>
          <h1 className="text-3xl font-bold  mb-2">Change Your Password</h1>
          <p className="font-bold text-xl mb-5 text-gray-600">
            Update your password to keep your account secure and continue
            connecting with friends and family.
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>

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
                type={showNewPassword ? "password" :"text"}
                {...register("newPassword")}
                placeholder="New Password"
                className="font-bold text-lg w-full h-11 px-2 pr-10 border-2 border-gray-500"
              />
    
              <button
                type="button"
                onClick={() => setshowNewPassword(!showNewPassword)}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-600"
              >
                {showNewPassword ? <AiFillEyeInvisible size={22} /> : <AiFillEye size={22} />}
              </button>
            </div>
          
            {errors.newPassword && (
              <p className="text-red-500 mt-1">{errors.newPassword.message}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={isPending}
            className="w-full mt-4 text-xl bg-blue-600 h-12 rounded-4xl cursor-pointer font-bold text-white "
          >
            {isPending ? "Submitting..." : "Submit"}
          </button>
        </form>
      </div>
    </div>
  );
}
