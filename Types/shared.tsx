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
        _id:string,
    body:string,
    image:string,
    user:{
       name:string,
       photo:string,
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