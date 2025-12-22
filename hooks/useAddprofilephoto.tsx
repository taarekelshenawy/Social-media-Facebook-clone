import axios, { isAxiosError } from 'axios'
import { useMutation } from '@tanstack/react-query';
import { useContext } from 'react';
import { AuthContext } from '@/context/context';
import { toast } from 'react-toastify';

type ProfileProps = {
  photo?: File | null;
};
const Addprofilephoto =async (data:ProfileProps,token:string)=>{
    const formdata = new FormData();
    if(data.photo){
    formdata.append('photo',data.photo)
    }
    try{
    const response = await axios.put("https://linked-posts.routemisr.com/users/upload-photo",formdata,{
        headers:{
            token:token
        }
    })
    return response.data.data;
    }catch(error){
        if(isAxiosError(error)){
            if(error.response){
                throw new Error(error.response.data.error) || 'network Error'

            }else{
                throw new Error (error.message);

            }
        }

    }
}

export default function useAddprofilephoto() {
        const context = useContext(AuthContext);
        if(!context){
            throw new Error('there is no context')
        }
         const {token}=context;
  return useMutation({
  mutationFn: (data:ProfileProps)=>Addprofilephoto(data,token),
   onError: (error: unknown) => {
  if (typeof error === "string") {
    toast.error(error);
  } else if (error instanceof Error) {
    toast.error(error.message);
  } else {
    toast.error("Unexpected error");
  }
},
  onSuccess: () => {
    toast('success')
  },

})
}
