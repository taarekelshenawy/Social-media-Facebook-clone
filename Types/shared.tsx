export type RegisterData ={
    name: string,
    email:string,
    password:string,
    rePassword:string,
    dateOfBirth:string,
    gender:string,
}
export type ChangePasswordData ={
    password:string,
    newPassword:string,
}

export type LoginData ={
    email:string,
    password:string,
}

export type PostsData ={
   posts:{
      createdAt: string
        _id:string,
    body:string,
    image:string,
    user:{
       name:string,
       photo:string,
       _id : string
    }
    comments:{
        _id:string,
        content:string,
        commentCreator:{
            name:string,
            photo:string
        }
    }[]



   }[]
      

   
         
    
   
}
export type PostsUserData ={
    posts:{
        _id:string,
    body:string,
    image:string,
    createdAt:string,
    user:{
       name:string,
       photo:string,
       _id : string
    }
    comments:{
        _id:string,
        content:string,
        commentCreator:{
            name:string,
            photo:string
        }
    }[]


    }[]
   
         
    
   
}

export type userInfoData={
    user:{
         _id:string,
    name:string,
    photo:string | undefined,
    email:string,
    }
   

}

export type PostData = {
    selectedPost:{
        _id:string
    }
  body: string;
  image?: File | null;
};